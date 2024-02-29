import React, { useCallback, useRef } from 'react'
import { CellComponent, Column } from '../types'

type ColumnData = { key: string; original: Partial<Column<any, any, any>> }

// 深い階層の値を設定するヘルパー関数
const setValueAtPath = (obj: any, path: string, value: any): void => {
  // ドット記法とブラケット記法の両方をサポートするようにパスを分割
  const parts = path.split(/\.|\[|\].?/).filter(Boolean);
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    let part: string | number = parts[i];
    // 配列のインデックスである場合、数値に変換
    if (part.match(/^\d+$/)) part = parseInt(part, 10);
    if (!current[part] || typeof current[part] !== 'object') {
      current[part] = {}; // 存在しない中間パスをオブジェクトとして作成
    }
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
};

const getValueAtPath = (data: any, path: string): any => {
  // ドット記法とブラケット記法の両方をサポートするようにパスを分割
  const parts = path.split(/\.|\[|\].?/).filter(Boolean);
  return parts.reduce((acc, part: string) => {
    let partOfStrOrNum: string | number = part
    // 配列のインデックスである場合、数値に変換してからアクセス
    if (part.match(/^\d+$/)) partOfStrOrNum = parseInt(part, 10);
    return acc && acc[partOfStrOrNum];
  }, data);
};

const KeyComponent: CellComponent<any, ColumnData> = ({
  columnData: { key, original },
  rowData,
  setRowData,
  ...rest
}) => {
  const rowDataRef = useRef(rowData);
  rowDataRef.current = rowData;

  const setKeyData = useCallback(
    (value: any) => {
      // rowDataのコピーを作成
      const newData = { ...rowDataRef.current };
      // 指定されたパスに値を設定
      setValueAtPath(newData, key, value);
      // 更新されたデータで行データを設定
      setRowData(newData);
    },
    [key, setRowData]
  );

  if (!original.component) {
    return <></>;
  }

  const Component = original.component;

  return (
    <Component
      columnData={original.columnData}
      setRowData={setKeyData}
      // ドット記法のキーを使って、深い階層のデータ値を取得
      rowData={getValueAtPath(rowData, key)}
      {...rest}
    />
  );
};

export const keyColumn = <
  T extends Record<string, any>,
  PasteValue = string
>(
  key: string,
  column: Partial<Column<any, any, PasteValue>>
): Partial<Column<T, ColumnData, PasteValue>> => ({
  id: key as string,
  ...column,
  // We pass the key and the original column as columnData to be able to retrieve them in the cell component
  columnData: { key: key as string, original: column },
  component: KeyComponent,
  // Here we simply wrap all functions to only pass the value of the desired key to the column, and not the entire row
  copyValue: ({ rowData, rowIndex }: any) =>
    column.copyValue?.({ rowData: rowData[key], rowIndex }) ?? null,
  deleteValue: ({ rowData, rowIndex }: any) => ({
    ...rowData,
    [key]: column.deleteValue?.({ rowData: rowData[key], rowIndex }) ?? null,
  }),
  pasteValue: ({ rowData, value, rowIndex }: any) => ({
    ...rowData,
    [key]:
      column.pasteValue?.({ rowData: rowData[key], value, rowIndex }) ?? null,
  }),
  disabled:
    typeof column.disabled === 'function'
      ? ({ rowData, rowIndex }: any) => {
          return typeof column.disabled === 'function'
            ? column.disabled({ rowData: rowData[key], rowIndex })
            : column.disabled ?? false
        }
      : column.disabled,
  cellClassName:
    typeof column.cellClassName === 'function'
      ? ({ rowData, rowIndex, columnId }: any) => {
          return typeof column.cellClassName === 'function'
            ? column.cellClassName({ rowData: rowData[key], rowIndex, columnId })
            : column.cellClassName ?? undefined
        }
      : column.cellClassName,
  isCellEmpty: ({ rowData, rowIndex }: any) =>
    column.isCellEmpty?.({ rowData: rowData[key], rowIndex }) ?? false,
} as any)

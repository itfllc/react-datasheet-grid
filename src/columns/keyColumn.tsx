import React, { useCallback, useRef } from 'react'
import { CellComponent, Column } from '../types'
import getValueAtPath from '../utils/getValueAtPath'
import setValueAtPath from '../utils/setValueAtPath'

type ColumnData = { key: string; original: Partial<Column<any, any, any>> }

const KeyComponent: CellComponent<any, ColumnData> = ({
  columnData: { key, original },
  rowData,
  setRowData,
  ...rest
}) => {
  const rowDataRef = useRef(rowData)
  rowDataRef.current = rowData

  const setKeyData = useCallback(
    (value: any) => {
      // rowDataのコピーを作成
      const newData = { ...rowDataRef.current }
      // 指定されたパスに値を設定
      setValueAtPath(newData, key, value)
      // 更新されたデータで行データを設定
      setRowData(newData)
    },
    [key, setRowData]
  )

  if (!original.component) {
    return <></>
  }

  const Component = original.component

  return (
    <Component
      columnData={original.columnData}
      setRowData={setKeyData}
      // ドット記法のキーを使って、深い階層のデータ値を取得
      rowData={getValueAtPath(rowData, key)}
      {...rest}
    />
  )
}

export const keyColumn = <T extends Record<string, any>, PasteValue = string>(
  key: string,
  column: Partial<Column<any, any, PasteValue>>
): Partial<Column<T, ColumnData, PasteValue>> =>
  ({
    id: key as string,
    ...column,
    // We pass the key and the original column as columnData to be able to retrieve them in the cell component
    columnData: { key: key as string, original: column },
    component: KeyComponent,
    // Here we simply wrap all functions to only pass the value of the desired key to the column, and not the entire row
    copyValue: ({ rowData, rowIndex }: any) =>
      column.copyValue?.({ rowData: getValueAtPath(rowData, key), rowIndex }) ??
      null,
    deleteValue: ({ rowData, rowIndex }: any) => {
      setValueAtPath(
        rowData,
        key,
        column.deleteValue?.({ rowData, rowIndex }) ?? null
      )
      return {
        ...rowData,
      }
    },
    pasteValue: ({ rowData, value, rowIndex }: any) => {
      setValueAtPath(
        rowData,
        key,
        column.pasteValue?.({
          rowData: getValueAtPath(rowData, key),
          value,
          rowIndex,
        })
      )
      return {
        ...rowData,
      }
    },
    disabled:
      typeof column.disabled === 'function'
        ? ({ rowData, datas, rowIndex }: any) => {
            return typeof column.disabled === 'function'
              ? column.disabled({
                  rowData: getValueAtPath(rowData, key),
                  datas,
                  rowIndex,
                })
              : column.disabled ?? false
          }
        : column.disabled,
    cellClassName:
      typeof column.cellClassName === 'function'
        ? ({ rowData, rowIndex, columnId }: any) => {
            return typeof column.cellClassName === 'function'
              ? column.cellClassName({
                  rowData: getValueAtPath(rowData, key),
                  rowIndex,
                  columnId,
                })
              : column.cellClassName ?? undefined
          }
        : column.cellClassName,
    isCellEmpty: ({ rowData, rowIndex }: any) =>
      column.isCellEmpty?.({
        rowData: getValueAtPath(rowData, key),
        rowIndex,
      }) ?? false,
  } as any)

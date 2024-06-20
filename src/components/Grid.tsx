import { defaultRangeExtractor, useVirtualizer } from '@tanstack/react-virtual'
import cx from 'classnames'
import React, { ReactNode, RefObject, useEffect } from 'react'
import { useMemoizedIndexCallback } from '../hooks/useMemoizedIndexCallback'
import {
  Cell,
  Column,
  ContextMenuItem,
  DataSheetGridProps,
  Selection,
} from '../types'
import { Cell as CellComponent } from './Cell'
import Resizer from './Resizer'

export const Grid = <T extends any>({
  data,
  columns,
  outerRef,
  innerRef,
  columnWidths,
  hasStickyRightColumn,
  stickyLeftColumnNumber,
  displayHeight,
  headerRowHeight,
  rowHeight,
  rowKey,
  fullWidth,
  selection,
  activeCell,
  rowClassName,
  cellClassName,
  children,
  editing,
  getContextMenuItems,
  setRowData,
  deleteRows,
  duplicateRows,
  insertRowAfter,
  stopEditing,
  onScroll,
  setColumnsWidth,
}: {
  data: T[]
  columns: Column<T, any, any>[]
  outerRef: RefObject<HTMLDivElement>
  innerRef: RefObject<HTMLDivElement>
  columnWidths?: number[]
  hasStickyRightColumn: boolean
  stickyLeftColumnNumber?: number
  displayHeight: number
  headerRowHeight: number
  rowHeight: (index: number) => { height: number }
  rowKey: DataSheetGridProps<T>['rowKey']
  rowClassName: DataSheetGridProps<T>['rowClassName']
  cellClassName: DataSheetGridProps<T>['cellClassName']
  fullWidth: boolean
  selection: Selection | null
  activeCell: Cell | null
  children: ReactNode
  editing: boolean
  getContextMenuItems: () => ContextMenuItem[]
  setRowData: (rowIndex: number, item: T) => void
  deleteRows: (rowMin: number, rowMax?: number) => void
  duplicateRows: (rowMin: number, rowMax?: number) => void
  insertRowAfter: (row: number, count?: number) => void
  stopEditing: (opts?: { nextRow?: boolean }) => void
  onScroll?: React.UIEventHandler<HTMLDivElement>
  setColumnsWidth: React.Dispatch<
    React.SetStateAction<
      {
        id?: string | undefined
        width: number
      }[]
    >
  >
}) => {
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => outerRef.current,
    paddingStart: headerRowHeight,
    estimateSize: (index) => rowHeight(index).height,
    getItemKey: (index: number): React.Key => {
      if (rowKey && index > 0) {
        const row = data[index - 1]
        if (typeof rowKey === 'function') {
          return rowKey({ rowData: row, rowIndex: index })
        } else if (
          typeof rowKey === 'string' &&
          row instanceof Object &&
          rowKey in row
        ) {
          const key = row[rowKey as keyof T]
          if (typeof key === 'string' || typeof key === 'number') {
            return key
          }
        }
      }
      return index
    },
    overscan: 5,
  })

  const colVirtualizer = useVirtualizer({
    count: columns.length,
    getScrollElement: () => outerRef.current,
    estimateSize: (index) => columnWidths?.[index] ?? 100,
    horizontal: true,
    getItemKey: (index: number): React.Key => columns[index].id ?? index,
    overscan: 1,
    rangeExtractor: (range) => {
      const result = defaultRangeExtractor(range)
      
      if (result[0] !== 0) {
        result.unshift(0)
      }

      if (stickyLeftColumnNumber != null) {
        const stickyColumnArray = Array.from({ length: stickyLeftColumnNumber }, (_, i) => i+1)
        stickyColumnArray.forEach((stickyIndex) => {
          if (result[stickyIndex] !== stickyIndex) {
            result.splice(stickyIndex, 0, stickyIndex)
          }
        })
      }

      if (
        hasStickyRightColumn &&
        result[result.length - 1] !== columns.length - 1
      ) {
        result.push(columns.length - 1)
      }
      return result
    },
  })

  useEffect(() => {
    colVirtualizer.measure()
  }, [colVirtualizer, columnWidths])

  const setGivenRowData = useMemoizedIndexCallback(setRowData, 1)
  const deleteGivenRow = useMemoizedIndexCallback(deleteRows, 0)
  const duplicateGivenRow = useMemoizedIndexCallback(duplicateRows, 0)
  const insertAfterGivenRow = useMemoizedIndexCallback(insertRowAfter, 0)

  const selectionColMin = selection?.min.col ?? activeCell?.col
  const selectionColMax = selection?.max.col ?? activeCell?.col
  const selectionMinRow = selection?.min.row ?? activeCell?.row
  const selectionMaxRow = selection?.max.row ?? activeCell?.row

  return (
    <div
      ref={outerRef}
      className="dsg-container"
      onScroll={onScroll}
      style={{ height: displayHeight }}
    >
      <div
        ref={innerRef}
        style={{
          width: fullWidth ? '100%' : colVirtualizer.getTotalSize(),
          height: rowVirtualizer.getTotalSize(),
        }}
      >
        {headerRowHeight > 0 && (
          <div
            className={cx('dsg-row', 'dsg-row-header')}
            style={{
              width: fullWidth ? '100%' : colVirtualizer.getTotalSize(),
              height: headerRowHeight,
            }}
          >
            {colVirtualizer.getVirtualItems().map((col) => (
              <CellComponent
                key={col.key}
                gutter={col.index === 0}
                stickyRight={
                  hasStickyRightColumn && col.index === columns.length - 1
                }
                stickyColumn={stickyLeftColumnNumber != null && col.index <= stickyLeftColumnNumber}
                width={col.size}
                left={col.start}
                className={cx(
                  'dsg-cell-header',
                  selectionColMin !== undefined &&
                    selectionColMax !== undefined &&
                    selectionColMin <= col.index - 1 &&
                    selectionColMax >= col.index - 1 &&
                    'dsg-cell-header-active',
                  columns[col.index].headerClassName
                )}
                colIndex={col.index}
              >
                <div className="dsg-cell-header-container">
                  {columns[col.index].title}
                </div>
                <Resizer
                  column={columns[col.index]}
                  setColumnsWidth={setColumnsWidth}
                />
              </CellComponent>
            ))}
          </div>
        )}
        {rowVirtualizer.getVirtualItems().map((row) => {
          const rowActive = Boolean(
            row.index >= (selectionMinRow ?? Infinity) &&
              row.index <= (selectionMaxRow ?? -Infinity)
          )

          // 各行ごとにエラーを保存
          const errors: {
            [key: number]: string[]
          } = {}
          colVirtualizer.getVirtualItems().forEach((col) => {
            const validators = columns[col.index].validators
            if (validators && validators.length > 0) {
              const errorMessages: string[] = []
              validators.forEach((validator) => {
                const validationResult = validator(
                  data[row.index],
                  data,
                  row.index,
                  col.index
                )
                if (validationResult) {
                  errorMessages.push(validationResult)
                }
              })
              if (errorMessages.length > 0) {
                errors[col.index] = errorMessages
              }
            }
          })

          return (
            <div
              key={row.key}
              className={cx(
                'dsg-row',
                typeof rowClassName === 'string' ? rowClassName : null,
                typeof rowClassName === 'function'
                  ? rowClassName({
                      rowData: data[row.index],
                      rowIndex: row.index,
                    })
                  : null
              )}
              style={{
                height: row.size,
                top: row.start,
                width: fullWidth ? '100%' : colVirtualizer.getTotalSize(),
              }}
            >
              {colVirtualizer.getVirtualItems().map((col) => {
                const colCellClassName = columns[col.index].cellClassName
                const disabled = columns[col.index].disabled
                const Component = columns[col.index].component
                const cellDisabled =
                  disabled === true ||
                  (typeof disabled === 'function' &&
                    disabled({
                      rowData: data[row.index],
                      datas: data,
                      rowIndex: row.index,
                    }))
                const cellIsActive =
                  activeCell?.row === row.index &&
                  activeCell.col === col.index - 1

                //  errors[col.index]がなければundefinedを返す
                let displayValidationError: string = ''
                const cellErrorMessages = errors[col.index] ?? undefined
                const isGutter = col.index === 0
                if (isGutter) {
                  const displayErrors: string[] = []
                  Object.keys(errors).forEach((key) => {
                    displayErrors.push(errors[key as any].join('\n'))
                  })
                  displayValidationError = displayErrors.join('\n')
                } else {
                  displayValidationError = cellErrorMessages?.join('\n')
                }

                return (
                  <CellComponent
                    key={col.key}
                    gutter={isGutter}
                    stickyRight={
                      hasStickyRightColumn && col.index === columns.length - 1
                    }
                    stickyColumn={stickyLeftColumnNumber != null && col.index <= stickyLeftColumnNumber}
                    active={isGutter && rowActive}
                    disabled={cellDisabled}
                    className={cx(
                      typeof colCellClassName === 'function'
                        ? colCellClassName({
                            rowData: data[row.index],
                            rowIndex: row.index,
                            columnId: columns[col.index].id,
                          })
                        : colCellClassName,
                      typeof cellClassName === 'function'
                        ? cellClassName({
                            rowData: data[row.index],
                            rowIndex: row.index,
                            columnId: columns[col.index].id,
                          })
                        : cellClassName,
                      displayValidationError
                        ? isGutter
                          ? 'gutter-error-cell'
                          : 'error-cell'
                        : ''
                    )}
                    width={col.size}
                    left={col.start}
                    dataTooltipContent={displayValidationError}
                    errorPlacement={columns[col.index].errorPlacement}
                    colIndex={col.index}
                  >
                    <Component
                      row={data[row.index]}
                      rowData={data[row.index]}
                      getContextMenuItems={getContextMenuItems}
                      disabled={cellDisabled}
                      active={cellIsActive}
                      columnIndex={col.index - 1}
                      rowIndex={row.index}
                      focus={cellIsActive && editing}
                      deleteRow={deleteGivenRow(row.index)}
                      duplicateRow={duplicateGivenRow(row.index)}
                      stopEditing={stopEditing}
                      insertRowBelow={insertAfterGivenRow(row.index)}
                      setRowData={setGivenRowData(row.index)}
                      columnData={columns[col.index].columnData}
                    />
                  </CellComponent>
                )
              })}
            </div>
          )
        })}
        {children}
      </div>
    </div>
  )
}

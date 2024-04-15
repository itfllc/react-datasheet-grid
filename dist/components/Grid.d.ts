import React, { ReactNode, RefObject } from 'react';
import { Cell, Column, ContextMenuItem, DataSheetGridProps, Selection } from '../types';
export declare const Grid: <T extends unknown>({ data, columns, outerRef, innerRef, columnWidths, hasStickyRightColumn, displayHeight, headerRowHeight, rowHeight, rowKey, fullWidth, selection, activeCell, rowClassName, cellClassName, children, editing, getContextMenuItems, setRowData, deleteRows, duplicateRows, insertRowAfter, stopEditing, onScroll, setColumnsWidth }: {
    data: T[];
    columns: Column<T, any, any>[];
    outerRef: RefObject<HTMLDivElement>;
    innerRef: RefObject<HTMLDivElement>;
    columnWidths?: number[] | undefined;
    hasStickyRightColumn: boolean;
    displayHeight: number;
    headerRowHeight: number;
    rowHeight: (index: number) => {
        height: number;
    };
    rowKey: string | ((opts: {
        rowData: T;
        rowIndex: number;
    }) => string) | undefined;
    rowClassName: string | ((opt: {
        rowData: T;
        rowIndex: number;
    }) => string | undefined) | undefined;
    cellClassName: string | ((opt: {
        rowData: unknown;
        rowIndex: number;
        columnId?: string | undefined;
    }) => string | undefined) | undefined;
    fullWidth: boolean;
    selection: Selection | null;
    activeCell: Cell | null;
    children: ReactNode;
    editing: boolean;
    getContextMenuItems: () => ContextMenuItem[];
    setRowData: (rowIndex: number, item: T) => void;
    deleteRows: (rowMin: number, rowMax?: number) => void;
    duplicateRows: (rowMin: number, rowMax?: number) => void;
    insertRowAfter: (row: number, count?: number) => void;
    stopEditing: (opts?: {
        nextRow?: boolean;
    }) => void;
    onScroll?: React.UIEventHandler<HTMLDivElement> | undefined;
    setColumnsWidth: React.Dispatch<React.SetStateAction<{
        id?: string | undefined;
        width: number;
    }[]>>;
}) => JSX.Element;
//# sourceMappingURL=Grid.d.ts.map
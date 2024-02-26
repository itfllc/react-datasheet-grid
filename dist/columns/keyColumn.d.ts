import { Column } from '../types';
type ColumnData = {
    key: string;
    original: Partial<Column<any, any, any>>;
};
export declare const keyColumn: <T extends Record<string, any>, PasteValue = string>(key: string, column: Partial<Column<any, any, PasteValue>>) => Partial<Column<T, ColumnData, PasteValue>>;
export {};
//# sourceMappingURL=keyColumn.d.ts.map
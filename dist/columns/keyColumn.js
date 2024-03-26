"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyColumn = void 0;
const react_1 = __importStar(require("react"));
const getValueAtPath_1 = __importDefault(require("../utils/getValueAtPath"));
const setValueAtPath_1 = __importDefault(require("../utils/setValueAtPath"));
const KeyComponent = (_a) => {
    var { columnData: { key, original }, rowData, setRowData } = _a, rest = __rest(_a, ["columnData", "rowData", "setRowData"]);
    const rowDataRef = (0, react_1.useRef)(rowData);
    rowDataRef.current = rowData;
    const setKeyData = (0, react_1.useCallback)((value) => {
        // rowDataのコピーを作成
        const newData = Object.assign({}, rowDataRef.current);
        // 指定されたパスに値を設定
        (0, setValueAtPath_1.default)(newData, key, value);
        // 更新されたデータで行データを設定
        setRowData(newData);
    }, [key, setRowData]);
    if (!original.component) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const Component = original.component;
    return (react_1.default.createElement(Component, Object.assign({ columnData: original.columnData, setRowData: setKeyData, 
        // ドット記法のキーを使って、深い階層のデータ値を取得
        rowData: (0, getValueAtPath_1.default)(rowData, key) }, rest)));
};
const keyColumn = (key, column) => (Object.assign(Object.assign({ id: key }, column), { 
    // We pass the key and the original column as columnData to be able to retrieve them in the cell component
    columnData: { key: key, original: column }, component: KeyComponent, 
    // Here we simply wrap all functions to only pass the value of the desired key to the column, and not the entire row
    copyValue: ({ rowData, rowIndex }) => {
        var _a, _b;
        return (_b = (_a = column.copyValue) === null || _a === void 0 ? void 0 : _a.call(column, { rowData: (0, getValueAtPath_1.default)(rowData, key), rowIndex })) !== null && _b !== void 0 ? _b : null;
    }, deleteValue: ({ rowData, rowIndex }) => {
        var _a, _b;
        (0, setValueAtPath_1.default)(rowData, key, (_b = (_a = column.deleteValue) === null || _a === void 0 ? void 0 : _a.call(column, { rowData, rowIndex })) !== null && _b !== void 0 ? _b : null);
        return Object.assign({}, rowData);
    }, pasteValue: ({ rowData, value, rowIndex }) => {
        var _a;
        (0, setValueAtPath_1.default)(rowData, key, (_a = column.pasteValue) === null || _a === void 0 ? void 0 : _a.call(column, {
            rowData: (0, getValueAtPath_1.default)(rowData, key),
            value,
            rowIndex,
        }));
        return Object.assign({}, rowData);
    }, disabled: typeof column.disabled === 'function'
        ? ({ rowData, datas, rowIndex }) => {
            var _a;
            return typeof column.disabled === 'function'
                ? column.disabled({
                    rowData: (0, getValueAtPath_1.default)(rowData, key),
                    datas,
                    rowIndex,
                })
                : (_a = column.disabled) !== null && _a !== void 0 ? _a : false;
        }
        : column.disabled, cellClassName: typeof column.cellClassName === 'function'
        ? ({ rowData, rowIndex, columnId }) => {
            var _a;
            return typeof column.cellClassName === 'function'
                ? column.cellClassName({
                    rowData: (0, getValueAtPath_1.default)(rowData, key),
                    rowIndex,
                    columnId,
                })
                : (_a = column.cellClassName) !== null && _a !== void 0 ? _a : undefined;
        }
        : column.cellClassName, isCellEmpty: ({ rowData, rowIndex }) => {
        var _a, _b;
        return (_b = (_a = column.isCellEmpty) === null || _a === void 0 ? void 0 : _a.call(column, {
            rowData: (0, getValueAtPath_1.default)(rowData, key),
            rowIndex,
        })) !== null && _b !== void 0 ? _b : false;
    } }));
exports.keyColumn = keyColumn;
//# sourceMappingURL=keyColumn.js.map
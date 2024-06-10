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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useColumns = exports.parseFlexValue = void 0;
const react_1 = __importStar(require("react"));
const defaultComponent = () => react_1.default.createElement(react_1.default.Fragment, null);
const defaultIsCellEmpty = () => false;
const identityRow = ({ rowData }) => rowData;
const defaultCopyValue = () => null;
const defaultGutterComponent = ({ rowIndex }) => (react_1.default.createElement(react_1.default.Fragment, null, rowIndex + 1));
const cellAlwaysEmpty = () => true;
const defaultPrePasteValues = (values) => values;
const parseFlexValue = (value) => {
    if (typeof value === 'number') {
        return {
            basis: 0,
            grow: value,
            shrink: 1,
        };
    }
    if (value.match(/^ *\d+(\.\d*)? *$/)) {
        return {
            basis: 0,
            grow: parseFloat(value.trim()),
            shrink: 1,
        };
    }
    if (value.match(/^ *\d+(\.\d*)? *px *$/)) {
        return {
            basis: parseFloat(value.trim()),
            grow: 1,
            shrink: 1,
        };
    }
    if (value.match(/^ *\d+(\.\d*)? \d+(\.\d*)? *$/)) {
        const [grow, shrink] = value.trim().split(' ');
        return {
            basis: 0,
            grow: parseFloat(grow),
            shrink: parseFloat(shrink),
        };
    }
    if (value.match(/^ *\d+(\.\d*)? \d+(\.\d*)? *px *$/)) {
        const [grow, basis] = value.trim().split(' ');
        return {
            basis: parseFloat(basis),
            grow: parseFloat(grow),
            shrink: 1,
        };
    }
    if (value.match(/^ *\d+(\.\d*)? \d+(\.\d*)? \d+(\.\d*)? *px *$/)) {
        const [grow, shrink, basis] = value.trim().split(' ');
        return {
            basis: parseFloat(basis),
            grow: parseFloat(grow),
            shrink: parseFloat(shrink),
        };
    }
    return {
        basis: 0,
        grow: 1,
        shrink: 1,
    };
};
exports.parseFlexValue = parseFlexValue;
const useColumns = (columns, gutterColumn, stickyRightColumn) => {
    const [columnsWidth, setColumnsWidth] = (0, react_1.useState)(columns.map((column) => {
        var _a, _b;
        let width = (_b = (_a = column.minWidth) !== null && _a !== void 0 ? _a : column.width) !== null && _b !== void 0 ? _b : 180;
        if (typeof width === 'string') {
            width = parseInt(width);
        }
        return { id: column.id, width: width };
    }));
    return [(0, react_1.useMemo)(() => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const partialColumns = [
                gutterColumn === false
                    ? {
                        basis: 0,
                        grow: 0,
                        shrink: 0,
                        minWidth: 0,
                        // eslint-disable-next-line react/display-name
                        component: () => react_1.default.createElement(react_1.default.Fragment, null),
                        headerClassName: 'dsg-hidden-cell',
                        cellClassName: 'dsg-hidden-cell',
                        isCellEmpty: cellAlwaysEmpty,
                    }
                    : Object.assign(Object.assign({}, gutterColumn), { basis: (_a = gutterColumn === null || gutterColumn === void 0 ? void 0 : gutterColumn.basis) !== null && _a !== void 0 ? _a : 40, grow: (_b = gutterColumn === null || gutterColumn === void 0 ? void 0 : gutterColumn.grow) !== null && _b !== void 0 ? _b : 0, shrink: (_c = gutterColumn === null || gutterColumn === void 0 ? void 0 : gutterColumn.shrink) !== null && _c !== void 0 ? _c : 0, minWidth: (_d = gutterColumn === null || gutterColumn === void 0 ? void 0 : gutterColumn.minWidth) !== null && _d !== void 0 ? _d : 0, title: (_e = gutterColumn === null || gutterColumn === void 0 ? void 0 : gutterColumn.title) !== null && _e !== void 0 ? _e : (react_1.default.createElement("div", { className: "dsg-corner-indicator" })), component: (_f = gutterColumn === null || gutterColumn === void 0 ? void 0 : gutterColumn.component) !== null && _f !== void 0 ? _f : defaultGutterComponent, isCellEmpty: cellAlwaysEmpty }),
                ...columns,
            ];
            if (stickyRightColumn) {
                partialColumns.push(Object.assign(Object.assign({}, stickyRightColumn), { basis: (_g = stickyRightColumn === null || stickyRightColumn === void 0 ? void 0 : stickyRightColumn.basis) !== null && _g !== void 0 ? _g : 40, grow: (_h = stickyRightColumn === null || stickyRightColumn === void 0 ? void 0 : stickyRightColumn.grow) !== null && _h !== void 0 ? _h : 0, shrink: (_j = stickyRightColumn === null || stickyRightColumn === void 0 ? void 0 : stickyRightColumn.shrink) !== null && _j !== void 0 ? _j : 0, minWidth: (_k = stickyRightColumn.minWidth) !== null && _k !== void 0 ? _k : 0, isCellEmpty: cellAlwaysEmpty }));
            }
            return partialColumns.map((column) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
                let width = (_a = column.width) !== null && _a !== void 0 ? _a : 1;
                const col = columnsWidth === null || columnsWidth === void 0 ? void 0 : columnsWidth.find((x) => x.id === column.id);
                if (col && col.width) {
                    width = `0 0 ${col === null || col === void 0 ? void 0 : col.width}px`;
                }
                const legacyWidth = width !== undefined
                    ? (0, exports.parseFlexValue)(width)
                    : {
                        basis: undefined,
                        grow: undefined,
                        shrink: undefined,
                    };
                return Object.assign(Object.assign({}, column), { width, basis: (_c = (_b = column.basis) !== null && _b !== void 0 ? _b : legacyWidth.basis) !== null && _c !== void 0 ? _c : 0, grow: (_e = (_d = column.grow) !== null && _d !== void 0 ? _d : legacyWidth.grow) !== null && _e !== void 0 ? _e : 1, shrink: (_g = (_f = column.shrink) !== null && _f !== void 0 ? _f : legacyWidth.shrink) !== null && _g !== void 0 ? _g : 1, minWidth: (_h = column.minWidth) !== null && _h !== void 0 ? _h : 100, component: (_j = column.component) !== null && _j !== void 0 ? _j : defaultComponent, disableKeys: (_k = column.disableKeys) !== null && _k !== void 0 ? _k : false, disabled: (_l = column.disabled) !== null && _l !== void 0 ? _l : false, keepFocus: (_m = column.keepFocus) !== null && _m !== void 0 ? _m : false, deleteValue: (_o = column.deleteValue) !== null && _o !== void 0 ? _o : identityRow, copyValue: (_p = column.copyValue) !== null && _p !== void 0 ? _p : defaultCopyValue, pasteValue: (_q = column.pasteValue) !== null && _q !== void 0 ? _q : identityRow, prePasteValues: (_r = column.prePasteValues) !== null && _r !== void 0 ? _r : defaultPrePasteValues, isCellEmpty: (_s = column.isCellEmpty) !== null && _s !== void 0 ? _s : defaultIsCellEmpty });
            });
        }, [gutterColumn, stickyRightColumn, columns, columnsWidth]),
        setColumnsWidth];
};
exports.useColumns = useColumns;
//# sourceMappingURL=useColumns.js.map
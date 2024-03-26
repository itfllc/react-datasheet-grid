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
exports.ContextMenu = exports.createContextMenuComponent = exports.defaultRenderItem = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const useDocumentEventListener_1 = require("../hooks/useDocumentEventListener");
const material_1 = require("@mui/material");
const defaultRenderItem = (item) => {
    if (item.type === 'CUT') {
        return React.createElement(React.Fragment, null, "Cut");
    }
    if (item.type === 'COPY') {
        return React.createElement(React.Fragment, null, "Copy");
    }
    if (item.type === 'PASTE') {
        return React.createElement(React.Fragment, null, "Paste");
    }
    if (item.type === 'DELETE_ROW') {
        return React.createElement(React.Fragment, null, "Delete row");
    }
    if (item.type === 'DELETE_ROWS') {
        return (React.createElement(React.Fragment, null,
            "Delete rows ",
            React.createElement("b", null, item.fromRow),
            " to ",
            React.createElement("b", null, item.toRow)));
    }
    if (item.type === 'INSERT_ROW_BELLOW') {
        return React.createElement(React.Fragment, null, "Insert row below");
    }
    if (item.type === 'DUPLICATE_ROW') {
        return React.createElement(React.Fragment, null, "Duplicate row");
    }
    if (item.type === 'DUPLICATE_ROWS') {
        return (React.createElement(React.Fragment, null,
            "Duplicate rows ",
            React.createElement("b", null, item.fromRow),
            " to ",
            React.createElement("b", null, item.toRow)));
    }
    return item.type;
};
exports.defaultRenderItem = defaultRenderItem;
const createContextMenuComponent = (renderItem = exports.defaultRenderItem) => 
// eslint-disable-next-line react/display-name
({ clientX, clientY, items, close }) => {
    const containerRef = (0, react_1.useRef)(null);
    const onClickOutside = (0, react_1.useCallback)((event) => {
        var _a, _b;
        const clickInside = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target);
        const clickBackdrop = (_b = event.target.className) === null || _b === void 0 ? void 0 : _b.includes('MuiBackdrop-root');
        if (!clickInside || clickBackdrop) {
            close();
        }
    }, [close]);
    (0, useDocumentEventListener_1.useDocumentEventListener)('mousedown', onClickOutside);
    return (React.createElement(material_1.Menu, { open: true, anchorReference: "anchorPosition", anchorPosition: { top: clientY, left: clientX }, ref: containerRef, onClose: close }, items.map((item) => (React.createElement(material_1.MenuItem, { key: item.type, onClick: item.action, dense: true }, renderItem(item))))));
};
exports.createContextMenuComponent = createContextMenuComponent;
exports.ContextMenu = (0, exports.createContextMenuComponent)(exports.defaultRenderItem);
exports.ContextMenu.displayName = 'ContextMenu';
//# sourceMappingURL=ContextMenu.js.map
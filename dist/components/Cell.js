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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Cell = ({ children, gutter, stickyRight, active, disabled, className, width, left, dataTooltipContent, }) => {
    const [showTooltip, setShowTooltip] = (0, react_1.useState)(false);
    return (react_1.default.createElement("div", { onMouseEnter: () => setShowTooltip(true), onMouseLeave: () => setShowTooltip(false), className: (0, classnames_1.default)('dsg-cell', gutter && 'dsg-cell-gutter', disabled && 'dsg-cell-disabled', gutter && active && 'dsg-cell-gutter-active', stickyRight && 'dsg-cell-sticky-right', className), style: {
            width,
            left: stickyRight ? undefined : left,
        } },
        children,
        showTooltip && dataTooltipContent && (react_1.default.createElement("div", { className: "custom-tooltip", style: { left: gutter ? "110%" : "50%", transform: gutter ? "translateY(-50%)" : "translateX(-50%)", top: gutter ? "50%" : "110%" } }, dataTooltipContent))));
};
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map
"use strict";
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
exports.Cell = void 0;
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Tooltip_1 = __importDefault(require("@mui/material/Tooltip/Tooltip"));
const material_1 = require("@mui/material");
const ErrorTooltip = (0, material_1.styled)((_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (react_1.default.createElement(Tooltip_1.default, Object.assign({}, props, { classes: { popper: className } })));
})(({ theme }) => ({
    [`& .${material_1.tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        fontSize: 14,
    },
    [`& .${material_1.tooltipClasses.arrow}`]: {
        color: theme.palette.error.main,
    },
}));
const Cell = ({ children, gutter, stickyRight, active, disabled, className, width, left, dataTooltipContent, errorPlacement, }) => {
    return (react_1.default.createElement(ErrorTooltip, { title: dataTooltipContent, placement: errorPlacement, arrow: true },
        react_1.default.createElement("div", { className: (0, classnames_1.default)('dsg-cell', gutter && 'dsg-cell-gutter', disabled && 'dsg-cell-disabled', gutter && active && 'dsg-cell-gutter-active', stickyRight && 'dsg-cell-sticky-right', className), style: {
                width,
                left: stickyRight ? undefined : left,
            } }, children)));
};
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map
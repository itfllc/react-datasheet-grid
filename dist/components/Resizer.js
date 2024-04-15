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
const react_1 = __importStar(require("react"));
const Resizer = ({ column, setColumnsWidth }) => {
    // Track the current position of mouse
    const x = (0, react_1.useRef)(0);
    const w = (0, react_1.useRef)(0);
    const resizerRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        resizerRef.current.addEventListener('mousedown', mouseDownHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
    }, []);
    const mouseDownHandler = function (e) {
        // Get the current mouse position
        x.current = e.clientX;
        const width = resizerRef.current.parentElement.clientWidth;
        w.current = width;
        // Attach listeners for document's events
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };
    const mouseMoveHandler = function (e) {
        // Determine how far the mouse has been moved
        const dx = e.clientX - x.current;
        // Update the width of column
        setColumnsWidth((cols) => cols.map((x) => {
            if (x.id === column.id) {
                x.width = w.current + dx;
                if (x.width < 5) {
                    x.width = 5;
                }
            }
            return x;
        }));
    };
    // When user releases the mouse, remove the existing event listeners
    const mouseUpHandler = function () {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };
    return react_1.default.createElement("div", { ref: resizerRef, className: "dsg-resizer" });
};
exports.default = Resizer;
//# sourceMappingURL=Resizer.js.map
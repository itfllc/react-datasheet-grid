"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 深い階層の値を設定するヘルパー関数
const setValueAtPath = (obj, path, value) => {
    // ドット記法とブラケット記法の両方をサポートするようにパスを分割
    const parts = path.split(/\.|\[|\].?/).filter(Boolean);
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        let part = parts[i];
        // 配列のインデックスである場合、数値に変換
        if (part.match(/^\d+$/))
            part = parseInt(part, 10);
        if (!current[part] || typeof current[part] !== 'object') {
            current[part] = {}; // 存在しない中間パスをオブジェクトとして作成
        }
        current = current[part];
    }
    current[parts[parts.length - 1]] = value;
};
exports.default = setValueAtPath;
//# sourceMappingURL=setValueAtPath.js.map
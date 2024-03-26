"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getValueAtPath = (data, path) => {
    if (!path) {
        return undefined;
    }
    // ドット記法とブラケット記法の両方をサポートするようにパスを分割
    const parts = path.split(/\.|\[|\].?/).filter(Boolean);
    if (path === 'test.date') {
        // console.log(parts, parts.reduce((acc, part: string) => {
        //     let partOfStrOrNum: string | number = part
        //     // 配列のインデックスである場合、数値に変換してからアクセス
        //     if (part.match(/^\d+$/)) partOfStrOrNum = parseInt(part, 10);
        //     return acc && acc[partOfStrOrNum];
        //   }, data));
    }
    return parts.reduce((acc, part) => {
        let partOfStrOrNum = part;
        // 配列のインデックスである場合、数値に変換してからアクセス
        if (part.match(/^\d+$/))
            partOfStrOrNum = parseInt(part, 10);
        return acc && acc[partOfStrOrNum];
    }, data);
};
exports.default = getValueAtPath;
//# sourceMappingURL=getValueAtPath.js.map
"use strict";
/* es-lint disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllIdentifiers = void 0;
const removeAllIdentifiers = function (url) {
    if (url === undefined || url === null || !url.includes("_"))
        return url !== null && url !== void 0 ? url : '';
    return url.split("_")[1];
};
exports.removeAllIdentifiers = removeAllIdentifiers;
//# sourceMappingURL=util.js.map
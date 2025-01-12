"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypt = void 0;
const labs_sharable_1 = require("labs-sharable");
class Encrypt {
    static cipherString(key, source) {
        return this.
            createCipherString(labs_sharable_1.LabsCipher.encrypt(source, key));
    }
    static decryptString(cipherKey, source) {
        try {
            const signature = this.
                changeCipherStringToModel(source);
            return labs_sharable_1.LabsCipher.decrypt(signature, cipherKey);
        }
        catch (e) {
            throw new labs_sharable_1.CustomError(`${e}`);
        }
    }
    static createCipherString(source) {
        return `${source.content}-ig(${source.iv})`;
    }
    static changeCipherStringToModel(source) {
        const cipher = source.split("-ig");
        if (cipher.length != 2) {
            throw new labs_sharable_1.CustomError("Invalid source string");
        }
        return {
            iv: cipher[1].replace("(", "").replace(")", ""),
            content: cipher[0],
        };
    }
}
exports.Encrypt = Encrypt;
//# sourceMappingURL=encrypt.js.map
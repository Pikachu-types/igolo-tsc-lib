"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const labs_sharable_1 = require("labs-sharable");
function apiRequest(method, url, param) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __awaiter(this, void 0, void 0, function* () {
        const axiosOptions = Object.assign({ headers: param.headers
                ? JSON.parse(JSON.stringify(param.headers))
                : { 'Accept': 'application/json' } }, ((method === 'POST' || method === 'PUT' || method === 'PATCH') && { data: param.body }));
        try {
            const response = yield (0, axios_1.default)(Object.assign({ method,
                url }, axiosOptions));
            return { data: response.data, statusCode: response.status };
        }
        catch (error) {
            // Check if the error is an Axios error
            if (axios_1.default.isAxiosError(error)) {
                const statusCode = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 500;
                const errorMessage = ((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.reason) || error.message;
                throw new labs_sharable_1.CustomError({
                    reason: errorMessage,
                    status: (_g = (_f = (_e = error.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.status) !== null && _g !== void 0 ? _g : 'failed',
                    code: statusCode,
                    type: (_k = (_j = (_h = error.response) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.type) !== null && _k !== void 0 ? _k : 'api_error',
                }, statusCode);
            }
            // If the error is not Axios-specific, handle it as a generic unknown error
            throw labs_sharable_1.CustomError.handleError(error);
        }
    });
}
exports.apiRequest = apiRequest;
//# sourceMappingURL=client.js.map
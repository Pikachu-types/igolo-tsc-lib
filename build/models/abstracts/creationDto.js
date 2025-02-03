"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractCreationDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const labs_sharable_1 = require("labs-sharable");
class AbstractCreationDto {
    /**
    * This class handler to json
    * @return {string} text
    */
    toJsonString() {
        return JSON.stringify(this);
    }
    /**
    * get document in map format
    * @param {string[]} paths add attributes you'd like to omit from the map
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(paths) {
        const res = JSON.parse(this.toJsonString());
        if (paths) {
            for (let i = 0; i < paths.length; i++) {
                delete res[paths[i]];
            }
        }
        return res;
    }
    generateID({ prefix }) {
        return `${prefix !== null && prefix !== void 0 ? prefix : ''}_${(0, labs_sharable_1.generateRandomAlphaNumeric)(10)}`;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AbstractCreationDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], AbstractCreationDto.prototype, "lut", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], AbstractCreationDto.prototype, "iat", void 0);
exports.AbstractCreationDto = AbstractCreationDto;
//# sourceMappingURL=creationDto.js.map
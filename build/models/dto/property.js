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
exports.PropertyDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const shared_1 = require("./shared");
const creationDto_1 = require("../abstracts/creationDto");
class PropertyDto extends creationDto_1.AbstractCreationDto {
    /**
   * Change record to PropertyDto class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {PropertyDto} this class
   */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(PropertyDto, obj, { excludeExtraneousValues: true });
        return result;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PropertyDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PropertyDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PropertyDto.prototype, "owner", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PropertyDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => shared_1.AddressDto),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", shared_1.AddressDto)
], PropertyDto.prototype, "address", void 0);
exports.PropertyDto = PropertyDto;
//# sourceMappingURL=property.js.map
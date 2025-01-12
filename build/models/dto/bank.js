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
exports.ConnectedBankDto = void 0;
const class_transformer_1 = require("class-transformer");
const creationDto_1 = require("../abstracts/creationDto");
class ConnectedBankDto extends creationDto_1.AbstractCreationDto {
    /**
     * Change record to ConnectedBankDto class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {ConnectedBankDto} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(ConnectedBankDto, obj, { excludeExtraneousValues: true });
        return result;
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ConnectedBankDto.prototype, "bank", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ConnectedBankDto.prototype, "authorization", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ConnectedBankDto.prototype, "last4", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ConnectedBankDto.prototype, "accountName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ConnectedBankDto.prototype, "country", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ConnectedBankDto.prototype, "tenant", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ConnectedBankDto.prototype, "currency", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ConnectedBankDto.prototype, "active", void 0);
exports.ConnectedBankDto = ConnectedBankDto;
//# sourceMappingURL=bank.js.map
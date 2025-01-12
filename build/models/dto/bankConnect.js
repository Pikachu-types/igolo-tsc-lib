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
exports.ConnectMyBankDto = void 0;
const class_transformer_1 = require("class-transformer");
const creationDto_1 = require("../abstracts/creationDto");
class ConnectMyBankDto extends creationDto_1.AbstractCreationDto {
    /**
   * Change record to ConnectMyBankDto class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {ConnectMyBankDto} this class
   */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(ConnectMyBankDto, obj, { excludeExtraneousValues: true });
        return result;
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ConnectMyBankDto.prototype, "reference", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ConnectMyBankDto.prototype, "transactionID", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ConnectMyBankDto.prototype, "accessCode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ConnectMyBankDto.prototype, "tenant", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], ConnectMyBankDto.prototype, "docReference", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ConnectMyBankDto.prototype, "status", void 0);
exports.ConnectMyBankDto = ConnectMyBankDto;
//# sourceMappingURL=bankConnect.js.map
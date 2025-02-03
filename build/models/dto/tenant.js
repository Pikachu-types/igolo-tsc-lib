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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const shared_1 = require("./shared");
const creationDto_1 = require("../abstracts/creationDto");
class TenantDto extends creationDto_1.AbstractCreationDto {
    /**
   * Change record to TenantDto class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {TenantDto} this class
   */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(TenantDto, obj, { excludeExtraneousValues: true });
        return result;
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, class_validator_1.validate)(this);
        });
    }
    getFullName() {
        return this.naming.fullname();
    }
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TenantDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TenantDto.prototype, "paystack_code", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TenantDto.prototype, "eid", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => shared_1.SecurityDto),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", shared_1.SecurityDto)
], TenantDto.prototype, "security", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => shared_1.NamingDto),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", shared_1.NamingDto)
], TenantDto.prototype, "naming", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], TenantDto.prototype, "fcm", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'fullName' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TenantDto.prototype, "getFullName", null);
exports.TenantDto = TenantDto;
//# sourceMappingURL=tenant.js.map
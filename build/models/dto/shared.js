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
exports.AddressDto = exports.SecurityDto = exports.NamingDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const labs_sharable_1 = require("labs-sharable");
class NamingDto {
    fullname() {
        if (this.middle) {
            return `${this.first} ${this.middle} ${this.last}`.trim();
        }
        else {
            return `${this.first} ${this.last}`.trim();
        }
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], NamingDto.prototype, "first", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], NamingDto.prototype, "last", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], NamingDto.prototype, "middle", void 0);
exports.NamingDto = NamingDto;
class SecurityDto {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], SecurityDto.prototype, "emailverified", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], SecurityDto.prototype, "phoneverified", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SecurityDto.prototype, "authProvider", void 0);
exports.SecurityDto = SecurityDto;
class AddressDto {
    toString() {
        return `${this.street}, ${this.city}, ${this.state}${this.postCode != null ? `, ${this.postCode}` : ' '}${labs_sharable_1.StringHelper.capitalizeWords(this.country)}`;
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AddressDto.prototype, "city", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AddressDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AddressDto.prototype, "postCode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AddressDto.prototype, "street", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AddressDto.prototype, "state", void 0);
exports.AddressDto = AddressDto;
//# sourceMappingURL=shared.js.map
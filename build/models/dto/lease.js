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
exports.LeaseDto = exports.LeaseChargeDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const creationDto_1 = require("../abstracts/creationDto");
class LeaseChargeDto extends creationDto_1.AbstractCreationDto {
    /**
     * Change record to LeaseChargeDto class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {LeaseChargeDto} this class
    */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(LeaseChargeDto, obj, { excludeExtraneousValues: true });
        return result;
    }
    static calculatePercentage(amount, percentage) {
        return (amount * percentage) / 100;
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseChargeDto.prototype, "tenant", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseChargeDto.prototype, "landlord", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseChargeDto.prototype, "lease", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseChargeDto.prototype, "reference", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseChargeDto.prototype, "nextDue", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseChargeDto.prototype, "collectionDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseChargeDto.prototype, "currency", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], LeaseChargeDto.prototype, "bank", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseChargeDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], LeaseChargeDto.prototype, "amount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], LeaseChargeDto.prototype, "paidAt", void 0);
exports.LeaseChargeDto = LeaseChargeDto;
class LeaseDto extends creationDto_1.AbstractCreationDto {
    /**
   * Change record to LeaseDto class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {LeaseDto} this class
   */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(LeaseDto, obj, { excludeExtraneousValues: true });
        return result;
    }
    static calculateNextCollectionDate(due, frequency) {
        const nextCollection = new Date(); // Start from today
        switch (frequency) {
            case "daily":
                nextCollection.setDate(nextCollection.getDate() + 1);
                break;
            case "weekly":
                nextCollection.setDate(nextCollection.getDate() + ((7 - nextCollection.getDay()) || 7));
                break;
            case "monthly":
                nextCollection.setMonth(nextCollection.getMonth() + 1);
                nextCollection.setDate(due.getDate()); // Maintain due day
                break;
            case "quarterly":
                nextCollection.setMonth(nextCollection.getMonth() + 3);
                nextCollection.setDate(due.getDate()); // Maintain due day
                break;
            case "biannually":
                nextCollection.setMonth(nextCollection.getMonth() + 6);
                nextCollection.setDate(due.getDate()); // Maintain due day
                break;
            case "yearly":
                nextCollection.setFullYear(nextCollection.getFullYear() + 1);
                nextCollection.setMonth(due.getMonth(), due.getDate()); // Maintain due month and day
                break;
            case "biennial":
                nextCollection.setFullYear(nextCollection.getFullYear() + 2);
                nextCollection.setMonth(due.getMonth(), due.getDate()); // Maintain due month and day
                break;
        }
        return nextCollection.toISOString().split("T")[0]; // Return in YYYY-MM-DD format
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseDto.prototype, "nin", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseDto.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseDto.prototype, "landlord", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], LeaseDto.prototype, "agreement", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseDto.prototype, "tenant", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseDto.prototype, "representative", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], LeaseDto.prototype, "chargePending", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], LeaseDto.prototype, "bankConnected", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], LeaseDto.prototype, "isActive", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseDto.prototype, "generatedBy", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], LeaseDto.prototype, "leaseEndDate", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], LeaseDto.prototype, "leaseStartDate", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], LeaseDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseDto.prototype, "collectionDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseDto.prototype, "file", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LeaseDto.prototype, "signatureFlow", void 0);
exports.LeaseDto = LeaseDto;
//# sourceMappingURL=lease.js.map
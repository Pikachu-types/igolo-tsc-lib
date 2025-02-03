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
exports.InboxDto = void 0;
const class_transformer_1 = require("class-transformer");
const creationDto_1 = require("../abstracts/creationDto");
const labs_sharable_1 = require("labs-sharable");
class InboxDto extends creationDto_1.AbstractCreationDto {
    /**
     * Change record to InboxDto class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {InboxDto} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(InboxDto, obj, { excludeExtraneousValues: true });
        return result;
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], InboxDto.prototype, "to", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], InboxDto.prototype, "readAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], InboxDto.prototype, "message", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], InboxDto.prototype, "actor", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], InboxDto.prototype, "restriction", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], InboxDto.prototype, "metadata", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], InboxDto.prototype, "type", void 0);
exports.InboxDto = InboxDto;
//# sourceMappingURL=inbox.js.map
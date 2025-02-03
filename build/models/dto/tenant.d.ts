import { NamingDto, SecurityDto } from "./shared";
import { AbstractCreationDto } from "../abstracts/creationDto";
export declare class TenantDto extends AbstractCreationDto {
    email: string;
    paystack_code?: string;
    eid: string;
    security: SecurityDto;
    naming: NamingDto;
    fcm?: {
        device: "android" | "ios";
        token: string;
    };
    /**
   * Change record to TenantDto class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {TenantDto} this class
   */
    static fromJson(obj: Record<string, unknown>): TenantDto;
    validate(): Promise<import("class-validator").ValidationError[]>;
    getFullName(): string;
}

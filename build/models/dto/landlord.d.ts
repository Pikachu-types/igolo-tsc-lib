import { NamingDto, SecurityDto } from "./shared";
import { AbstractCreationDto } from "../abstracts/creationDto";
export declare class LandlordDto extends AbstractCreationDto {
    email: string;
    phone?: string;
    eid: string;
    profile: {
        businessName: string;
        accountName: string;
        bank: string;
        bankCode: string;
    };
    security: SecurityDto;
    naming: NamingDto;
    fcm?: {
        device: "android" | "ios";
        token: string;
    };
    /**
   * Change record to LandlordDto class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {LandlordDto} this class
   */
    static fromJson(obj: Record<string, unknown>): LandlordDto;
    validate(): Promise<import("class-validator").ValidationError[]>;
    getFullName(): string;
}

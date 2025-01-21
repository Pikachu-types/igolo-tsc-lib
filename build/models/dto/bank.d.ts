import { AbstractCreationDto } from "../abstracts/creationDto";
export declare class ConnectedBankDto extends AbstractCreationDto {
    bank: string;
    authorization: string;
    last4: string;
    accountName: string;
    country: string;
    tenant: string;
    currency: string;
    active: boolean;
    primary: boolean;
    /**
     * Change record to ConnectedBankDto class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {ConnectedBankDto} this class
     */
    static fromJson(obj: Record<string, unknown>): ConnectedBankDto;
}

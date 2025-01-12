import { AbstractCreationDto } from "../abstracts/creationDto";
import { ProcessStatus } from "../enum";
export declare class ConnectMyBankDto extends AbstractCreationDto {
    reference: string;
    transactionID: string;
    accessCode: string;
    tenant: string;
    docReference?: unknown;
    status: ProcessStatus;
    /**
   * Change record to ConnectMyBankDto class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {ConnectMyBankDto} this class
   */
    static fromJson(obj: Record<string, unknown>): ConnectMyBankDto;
}

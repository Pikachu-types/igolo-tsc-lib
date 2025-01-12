import { Expose, plainToInstance } from "class-transformer";
import { AbstractCreationDto } from "../abstracts/creationDto";
import { ProcessStatus } from "../enum";

export class ConnectMyBankDto extends AbstractCreationDto {

  @Expose() reference: string;
  @Expose() transactionID: string;
  @Expose() accessCode: string;
  @Expose() tenant: string;
  @Expose() docReference?: unknown;
  @Expose() status: ProcessStatus;

  /**
 * Change record to ConnectMyBankDto class
 *
 * @param {Record<string, unknown>} obj  json object from db
 * @return {ConnectMyBankDto} this class
 */
  public static fromJson(obj: Record<string, unknown>)
    : ConnectMyBankDto {
    const result: ConnectMyBankDto = plainToInstance(ConnectMyBankDto, obj,
      { excludeExtraneousValues: true });
    return result;
  }

}



import { Expose, plainToInstance } from "class-transformer";
import { AbstractCreationDto } from "../abstracts/creationDto";

export class ConnectedBankDto extends AbstractCreationDto {

  @Expose() bank: string;
  @Expose() authorization: string;
  @Expose() last4: string;
  @Expose() accountName: string;
  @Expose() country: string;
  @Expose() tenant: string;
  @Expose() currency: string;
  @Expose() active: boolean;

  /**
   * Change record to ConnectedBankDto class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {ConnectedBankDto} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : ConnectedBankDto {
    const result: ConnectedBankDto = plainToInstance(ConnectedBankDto, obj,
      { excludeExtraneousValues: true });
    return result;
  }

}



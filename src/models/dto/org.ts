import { Expose, plainToInstance, Type } from "class-transformer";
import { AbstractCreationDto } from "../abstracts/creationDto";
import { AddressDto } from "./shared";

export type TMember = {
  id: string;
  iat: number;
  role: "owner" | "manager" | "viewer"
}

export class OrganisationDto extends AbstractCreationDto {

  @Expose() name: string;
  @Expose() test?: boolean;
  @Expose() paystack_code?: string;
  @Expose() members: Record<string, TMember>;
  @Expose() banking: {
    accountName: string;
    accountNumber: string;
    bank: string;
    bankCode: string;
  };
  
  @Type(() => AddressDto)
  @Expose()
  address: AddressDto;

  /**
   * Change record to OrganisationDto class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {OrganisationDto} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : OrganisationDto {
    const result: OrganisationDto = plainToInstance(OrganisationDto, obj,
      { excludeExtraneousValues: true });
    return result;
  }
}



import { Expose, plainToInstance, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, validate } from "class-validator";
import { NamingDto, SecurityDto } from "./shared";
import { AbstractCreationDto } from "../abstracts/creationDto";

export class LandlordDto extends AbstractCreationDto {

  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;
  
  @Expose()
  phone?: string;

  @IsNotEmpty()
  @Expose()
  eid: string;
  
  @Expose()
  profile: {
    businessName: string;
    accountName: string;
    bank: string;
    bankCode: string;
  };

  @Type(() => SecurityDto)
  @Expose()
  security: SecurityDto;

  @Type(() => NamingDto)
  @Expose()
  naming: NamingDto;
  
  @Expose()
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
  public static fromJson(obj: Record<string, unknown>)
    : LandlordDto {
    const result: LandlordDto = plainToInstance(LandlordDto, obj,
      { excludeExtraneousValues: true });
    return result;
  }

  public async validate() {
    return await validate(this);
  }

  @Expose({ name: 'fullName' })
  getFullName() {
    return this.naming.fullname();
  }
}



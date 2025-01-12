import { Expose, plainToInstance, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, validate } from "class-validator";
import { NamingDto, SecurityDto } from "./shared";
import { AbstractCreationDto } from "../abstracts/creationDto";

export class TenantDto extends AbstractCreationDto {

  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;
  
  @Expose()
  paystack_code?: string;

  @IsNotEmpty()
  @Expose()
  eid: string;

  @Type(() => SecurityDto)
  @Expose()
  security: SecurityDto;

  @Type(() => NamingDto)
  @Expose()
  naming: NamingDto;

  /**
 * Change record to TenantDto class
 *
 * @param {Record<string, unknown>} obj  json object from db
 * @return {TenantDto} this class
 */
  public static fromJson(obj: Record<string, unknown>)
    : TenantDto {
    const result: TenantDto = plainToInstance(TenantDto, obj,
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



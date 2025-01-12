import { Expose, plainToInstance, Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";
import { AddressDto } from "./shared";
import { AbstractCreationDto } from "../abstracts/creationDto";

export class PropertyDto extends AbstractCreationDto {
  @IsNotEmpty()
  @Expose()
  currency: string;

  @IsNotEmpty()
  @Expose()
  name: string;

  @IsNotEmpty()
  @Expose()
  owner: string;

  @IsNotEmpty()
  @Expose()
  type: string;

  @Type(() => AddressDto)
  @Expose()
  address: AddressDto;


  /**
 * Change record to PropertyDto class
 *
 * @param {Record<string, unknown>} obj  json object from db
 * @return {PropertyDto} this class
 */
  public static fromJson(obj: Record<string, unknown>)
    : PropertyDto {
    const result: PropertyDto = plainToInstance(PropertyDto, obj,
      { excludeExtraneousValues: true });
    return result;
  }

}
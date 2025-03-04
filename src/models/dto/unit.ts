import { Expose, plainToInstance, Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { AbstractCreationDto } from "../abstracts/creationDto";
import { OccupancyStatus, PaymentFrequency } from "../enum";

export class UnitDto extends AbstractCreationDto {
  @IsNotEmpty()
  @Expose()
  type: string;

  @IsNotEmpty()
  @Expose()
  propertyID: string;

  @IsNotEmpty()
  @Expose()
  rentAmount: number;

  @IsNotEmpty()
  @Expose()
  name: string;

  @Expose() lease?: string;
  @Expose() tenant?: string;
  @Expose() paymentFrequency: PaymentFrequency;
  @Expose() occupancyStatus: OccupancyStatus;


  /**
 * Change record to UnitDto class
 *
 * @param {Record<string, unknown>} obj  json object from db
 * @return {UnitDto} this class
 */
  public static fromJson(obj: Record<string, unknown>)
    : UnitDto {
    const result: UnitDto = plainToInstance(UnitDto, obj,
      { excludeExtraneousValues: true });
    return result;
  }

}
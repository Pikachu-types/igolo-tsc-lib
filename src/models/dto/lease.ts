import { Expose, plainToInstance, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional } from "class-validator";
import { AbstractCreationDto } from "../abstracts/creationDto";
import { ProcessStatus } from "../enum";

export class LeaseDto extends AbstractCreationDto {
  @IsNotEmpty()
  @Expose()
  nin: string;

  @IsNotEmpty()
  @Expose()
  name: string;

  @IsNotEmpty()
  @Expose()
  unit: string;

  @IsNotEmpty()
  @Expose()
  landlord: string;
  
  @Expose()
  agreement?: {
    identifier: string;
    signature: {
      iat: number;
      signature?: string;
      nin: string;
      name: string;
      identification: string;
    }[],
    file: {
      link: string;
      mime: string;
    }
  };
  
  @Expose()
  tenant?: string;

  @IsNotEmpty()
  @Expose()
  status: ProcessStatus;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Expose()
  leaseEndDate?: Date | null;

  @IsDate()
  @Type(() => Date)
  @Expose()
  leaseStartDate: Date;

  @IsDate()
  @Type(() => Date)
  @Expose()
  dueDate: Date;
  
  @Expose() file?: string;

  @Expose() signatureFlow?: string;


  /**
 * Change record to LeaseDto class
 *
 * @param {Record<string, unknown>} obj  json object from db
 * @return {LeaseDto} this class
 */
  public static fromJson(obj: Record<string, unknown>)
    : LeaseDto {
    const result: LeaseDto = plainToInstance(LeaseDto, obj,
      { excludeExtraneousValues: true });
    return result;
  }

}
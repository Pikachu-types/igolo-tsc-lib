import { Expose, plainToInstance, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional } from "class-validator";
import { AbstractCreationDto } from "../abstracts/creationDto";
import { PaymentFrequency, ProcessStatus } from "../enum";

export class LeaseChargeDto extends AbstractCreationDto {
  @Expose() tenant: string;
  @Expose() landlord: string;
  @Expose() lease: string;
  @Expose() reference: string;
  @Expose() nextDue: string;
  @Expose() currency: string;
  @Expose() bank: {
    name: string;
    last4: string;
  };
  @Expose() status: "paid" | "failed" | "stale";
  @Expose() amount: number;

  /**
   * Change record to LeaseChargeDto class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {LeaseChargeDto} this class
  */
  public static fromJson(obj: Record<string, unknown>)
    : LeaseChargeDto {
    const result: LeaseChargeDto = plainToInstance(LeaseChargeDto, obj,
      { excludeExtraneousValues: true });
    return result;
  }

  public static calculatePercentage(amount: number, percentage: number): number {
    return (amount * percentage) / 100;
  }
}

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

  @Expose() representative: string;

  @Expose() chargePending?: boolean;

  @Expose() bankConnected?: boolean;

  @Expose() isActive?: boolean;

  @Expose() generatedBy: string;

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

  @IsDate()
  @Type(() => Date)
  @Expose()
  collectionDate?: Date;
  
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

  public static calculateNextCollectionDate(due: Date, frequency: PaymentFrequency): string {
    const nextCollection = new Date(); // Start from today

    switch (frequency) {
      case "daily":
        nextCollection.setDate(nextCollection.getDate() + 1);
        break;

      case "weekly":
        nextCollection.setDate(nextCollection.getDate() + ((7 - nextCollection.getDay()) || 7));
        break;

      case "monthly":
        nextCollection.setMonth(nextCollection.getMonth() + 1);
        nextCollection.setDate(due.getDate()); // Maintain due day
        break;

      case "yearly":
        nextCollection.setFullYear(nextCollection.getFullYear() + 1);
        nextCollection.setMonth(due.getMonth(), due.getDate()); // Maintain due month and day
        break;
    }

    return nextCollection.toISOString().split("T")[0]; // Return in YYYY-MM-DD format
  }

}
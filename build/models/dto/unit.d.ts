import { AbstractCreationDto } from "../abstracts/creationDto";
import { OccupancyStatus, PaymentFrequency } from "../enum";
export declare class UnitDto extends AbstractCreationDto {
    type: string;
    propertyID: string;
    rentAmount: string;
    name: string;
    lease?: string;
    tenant?: string;
    paymentFrequency: PaymentFrequency;
    occupancyStatus: OccupancyStatus;
    /**
   * Change record to UnitDto class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {UnitDto} this class
   */
    static fromJson(obj: Record<string, unknown>): UnitDto;
}

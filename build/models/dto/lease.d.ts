import { AbstractCreationDto } from "../abstracts/creationDto";
import { PaymentFrequency, ProcessStatus } from "../enum";
export declare class LeaseChargeDto extends AbstractCreationDto {
    tenant: string;
    landlord: string;
    lease: string;
    reference: string;
    nextDue: string;
    currency: string;
    bank: {
        name: string;
        last4: string;
    };
    status: "paid" | "failed" | "stale";
    amount: number;
    /**
     * Change record to LeaseChargeDto class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {LeaseChargeDto} this class
    */
    static fromJson(obj: Record<string, unknown>): LeaseChargeDto;
    static calculatePercentage(amount: number, percentage: number): number;
}
export declare class LeaseDto extends AbstractCreationDto {
    nin: string;
    name: string;
    unit: string;
    landlord: string;
    agreement?: {
        identifier: string;
        signature: {
            iat: number;
            signature?: string;
            nin: string;
            name: string;
            identification: string;
        }[];
        file: {
            link: string;
            mime: string;
        };
    };
    tenant?: string;
    representative: string;
    chargePending?: boolean;
    bankConnected?: boolean;
    isActive?: boolean;
    generatedBy: string;
    status: ProcessStatus;
    leaseEndDate?: Date | null;
    leaseStartDate: Date;
    dueDate: Date;
    collectionDate?: Date;
    file?: string;
    signatureFlow?: string;
    /**
   * Change record to LeaseDto class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {LeaseDto} this class
   */
    static fromJson(obj: Record<string, unknown>): LeaseDto;
    static calculateNextCollectionDate(due: Date, frequency: PaymentFrequency): string;
}

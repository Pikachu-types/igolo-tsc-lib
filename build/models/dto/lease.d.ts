import { AbstractCreationDto } from "../abstracts/creationDto";
import { PaymentFrequency, ProcessStatus } from "../enum";
import { AddressDto } from "..";
export interface ChargeReceipt {
    payMethod: string;
    id: string;
    reference: string;
    paid: number;
    paidAt: number;
    taxBehavior: "inclusive" | "exclusive";
    date: number;
    due?: number;
    tenant: {
        name: string;
        nin: string;
        email: string;
        tenantID: string;
    };
    landlord: {
        name: string;
        address: AddressDto;
        email?: string;
        id: string;
        vat?: string;
    };
    fees: {
        vat: number;
    };
    lease: {
        /**
         * Next Due date
         */
        maturity: string;
        /**
         * Rent period
         */
        period: string;
        address: AddressDto;
        currency: string;
        rent: {
            sum: number;
            frequency: PaymentFrequency;
        };
        property: {
            unit: string;
            unitID: string;
            propertyID: string;
        };
    };
}
export declare class LeaseChargeDto extends AbstractCreationDto {
    tenant: string;
    landlord: string;
    lease: string;
    reference: string;
    nextDue: string;
    collectionDate: string;
    currency: string;
    bank: {
        name: string;
        last4: string;
    };
    status: "paid" | "failed" | "stale";
    amount: number;
    paidAt?: number | undefined | null;
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
    collectionDate?: string;
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

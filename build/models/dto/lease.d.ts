import { AbstractCreationDto } from "../abstracts/creationDto";
import { ProcessStatus } from "../enum";
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
    status: ProcessStatus;
    leaseEndDate?: Date | null;
    leaseStartDate: Date;
    dueDate: Date;
    file?: string;
    signatureFlow?: string;
    /**
   * Change record to LeaseDto class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {LeaseDto} this class
   */
    static fromJson(obj: Record<string, unknown>): LeaseDto;
}

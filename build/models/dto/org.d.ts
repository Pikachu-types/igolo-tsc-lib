import { AbstractCreationDto } from "../abstracts/creationDto";
import { AddressDto } from "./shared";
export type TMember = {
    id: string;
    iat: number;
    role: "owner" | "manager" | "viewer";
};
export declare class OrganisationDto extends AbstractCreationDto {
    name: string;
    members: Record<string, TMember>;
    banking: {
        accountName: string;
        accountNumber: string;
        bank: string;
        bankCode: string;
    };
    address: AddressDto;
    /**
     * Change record to OrganisationDto class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {OrganisationDto} this class
     */
    static fromJson(obj: Record<string, unknown>): OrganisationDto;
}

import { AddressDto } from "./shared";
import { AbstractCreationDto } from "../abstracts/creationDto";
export declare class PropertyDto extends AbstractCreationDto {
    currency: string;
    name: string;
    owner: string;
    type: string;
    address: AddressDto;
    /**
   * Change record to PropertyDto class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {PropertyDto} this class
   */
    static fromJson(obj: Record<string, unknown>): PropertyDto;
}

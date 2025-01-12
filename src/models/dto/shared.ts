import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
import { StringHelper } from "labs-sharable";

export class NamingDto {
  @IsNotEmpty()
  @Expose()
  first: string;

  @IsNotEmpty()
  @Expose()
  last: string;

  @IsNotEmpty()
  @Expose()
  middle: string;

  public fullname(): string {
    if (this.middle) {
      return `${this.first} ${this.middle} ${this.last}`.trim();
    } else {
      return `${this.first} ${this.last}`.trim();
    }
  }
}

export class SecurityDto {
  @Expose()
  emailverified: boolean;

  @Expose()
  phoneverified: boolean;

  @Expose()
  authProvider: string
}


export class AddressDto {
  @Expose() city: string;
  @Expose() country: string;
  @IsOptional()
  @Expose()
  postCode?: string;
  @Expose() street: string;
  @Expose() state: string;

  public toString() {
    return `${this.street}, ${this.city}, ${this.state}${this.postCode != null ? `, ${this.postCode}` : ' '}${StringHelper.capitalizeWords(this.country)}`;
  }
}





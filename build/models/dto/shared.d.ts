export declare class NamingDto {
    first: string;
    last: string;
    middle: string;
    fullname(): string;
}
export declare class SecurityDto {
    emailverified: boolean;
    phoneverified: boolean;
    authProvider: string;
}
export declare class AddressDto {
    city: string;
    country: string;
    postCode?: string;
    street: string;
    state: string;
    toString(): string;
}

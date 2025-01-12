export declare class AbstractCreationDto {
    id: string;
    lut?: Date | null;
    iat: Date;
    /**
    * This class handler to json
    * @return {string} text
    */
    toJsonString(): string;
    /**
    * get document in map format
    * @param {string[]} paths add attributes you'd like to omit from the map
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(paths?: string[]): Record<string, unknown>;
}

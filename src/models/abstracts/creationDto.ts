import { Expose, Type } from "class-transformer";
import { IsOptional, IsDate, IsNotEmpty } from "class-validator";
import { generateRandomAlphaNumeric } from "labs-sharable";

export class AbstractCreationDto {
  @IsNotEmpty()
  @Expose()
  id: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Expose()
  lut?: Date | null | number;

  @IsDate()
  @Type(() => Date)
  @Expose()
  iat: Date | number;

  /**
  * This class handler to json
  * @return {string} text
  */
  public toJsonString(): string {
    return JSON.stringify(this);
  }

  /**
  * get document in map format
  * @param {string[]} paths add attributes you'd like to omit from the map
  * @return { Record<string, unknown>} returns doc map .
  */
  public toMap(paths?: string[])
    : Record<string, unknown> {
    const res = JSON.parse(this.toJsonString());
    if (paths) {
      for (let i = 0; i < paths.length; i++) {
        delete res[paths[i]];
      }
    }
    return res;
  }

  public generateID({ prefix, length }: { prefix?: string, length?: number }) {
    return `${prefix ?? ''}_${generateRandomAlphaNumeric(length ?? 10)}`;
  }
}
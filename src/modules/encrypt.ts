import { CipherType, CustomError, LabsCipher } from "labs-sharable";

export class Encrypt {
  public static cipherString(key: string,
    source: string): string {
    return this.
      createCipherString(LabsCipher.encrypt(source, key));
  }

  public static decryptString(cipherKey: string, source: string) {
    try {
      const signature = this.
        changeCipherStringToModel(source);
      return LabsCipher.decrypt(signature, cipherKey);
    } catch (e) {
      throw new CustomError(`${e}`);
    }
  }

  private static createCipherString(source: CipherType): string {
    return `${source.content}-ig(${source.iv})`;
  }

  private static changeCipherStringToModel(source: string): CipherType {
    const cipher = source.split("-ig");
    if (cipher.length != 2) {
      throw new CustomError("Invalid source string");
    }
    return {
      iv: cipher[1].replace("(", "").replace(")", ""),
      content: cipher[0],
    };
  }
}
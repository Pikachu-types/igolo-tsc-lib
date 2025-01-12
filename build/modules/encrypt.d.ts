export declare class Encrypt {
    static cipherString(key: string, source: string): string;
    static decryptString(cipherKey: string, source: string): string;
    private static createCipherString;
    private static changeCipherStringToModel;
}

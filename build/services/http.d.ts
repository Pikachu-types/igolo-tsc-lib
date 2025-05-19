/// <reference types="node" />
/**
 * Generalized Posting Service helper type
 */
export type PostRequest = {
    url: string;
    body: Record<string, unknown> | undefined;
};
/**
 * HTTP client class
 */
export declare class Http {
    /**
   * post request to webhooks endpoints
   * @param {PostRequest} request data map of post
   * @return {Promise<void>} returns response.
   */
    static post(request: PostRequest): Promise<void>;
}
/**
 * Download any fle with axios
 * @param {string} url download url
 * @returns
 */
export declare function download(url: string): Promise<Buffer>;

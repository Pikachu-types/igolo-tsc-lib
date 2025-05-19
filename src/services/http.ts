import axios, { isAxiosError } from "axios";
import { CustomError } from "labs-sharable";

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
export class Http {
    /**
   * post request to webhooks endpoints
   * @param {PostRequest} request data map of post
   * @return {Promise<void>} returns response.
   */
    public static async post(request: PostRequest)
        : Promise<void> {
        try {
            const { data, status } = await axios.post(
                request.url,
                request.body,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                },
            );

            // console.log(JSON.stringify(data, null, 4));

            if (status != 200) {
                throw new CustomError(`Http post error: ${JSON.stringify(data) }`, status);
            }
        } catch (error) {
            if (isAxiosError(error)) {
                console.log("error message: ", error.message);
                const response = error.response;
                if (response) {
                    throw new CustomError({
                        body: response.data,
                        reason: "Axios unknown error caught",
                        status: 'failed'
                    }, response.status);
                } else {
                    throw new CustomError(error.message, error.status ?? 500);
                }
            } else {
                throw new CustomError("An unexpected error occurred", 500);
            }
        }
    }

}

/**
 * Download any fle with axios
 * @param {string} url download url
 * @returns 
 */
export async function download(url: string): Promise<Buffer> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const fileData = Buffer.from(response.data, 'binary');
    return fileData;
}

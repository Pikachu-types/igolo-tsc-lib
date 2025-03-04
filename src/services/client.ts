import axios, { AxiosResponse, isAxiosError } from "axios";
import { CustomError } from "labs-sharable";

type HTTP_METHOD = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

export async function apiRequest<T>(
  method: HTTP_METHOD,
  url: string,
  param: Request
): Promise<{ data: T, statusCode: number }> {
  const axiosOptions = {
    headers: param.headers
      ? JSON.parse(JSON.stringify(param.headers))
      : { 'Accept': 'application/json' },
    ...((method === 'POST' || method === 'PUT' || method === 'PATCH') && { data: param.body }),
  };
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      ...axiosOptions,
    });
    return { data: response.data, statusCode: response.status };
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status ?? 500;
      const errorMessage = error.response?.data?.reason || error.message;
      throw new CustomError({
        reason: errorMessage,
        status: error.response?.data?.status ?? 'failed',
        code: statusCode,
        type: error.response?.data?.type ?? 'api_error',
      }, statusCode);
    }
    // If the error is not Axios-specific, handle it as a generic unknown error
    throw CustomError.handleError(error);
  }
}

type Request = {
  body?: Record<string, unknown>,
  headers?: Record<string, unknown>,
}
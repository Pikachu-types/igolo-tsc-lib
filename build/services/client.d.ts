type HTTP_METHOD = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
export declare function apiRequest<T>(method: HTTP_METHOD, url: string, param: Request): Promise<{
    data: T;
    statusCode: number;
}>;
type Request = {
    body?: Record<string, unknown>;
    headers?: Record<string, unknown>;
};
export {};

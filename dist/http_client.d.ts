import { IHttpClient, IResponse } from '@process-engine-js/http_contracts';
export declare class HttpClient implements IHttpClient {
    config: any;
    private _buildRequestOptions(method, url);
    get<T>(url: string): Promise<IResponse<T>>;
    post<T>(url: string, data: T): Promise<IResponse<T>>;
    put<T>(url: string, data: T): Promise<IResponse<T>>;
    delete<T>(url: string): Promise<void>;
}

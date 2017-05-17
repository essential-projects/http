import { IHttpClient, IResponse, IRequestOptions } from '@process-engine-js/http_contracts';
export declare class HttpClient implements IHttpClient {
    config: any;
    protected buildRequestOptions(method: string, url: string, options?: IRequestOptions): IRequestOptions;
    get<T>(url: string, options?: IRequestOptions): Promise<IResponse<T>>;
    post<T>(url: string, data: T, options?: IRequestOptions): Promise<IResponse<T>>;
    put<T>(url: string, data: T, options?: IRequestOptions): Promise<IResponse<T>>;
    delete<T>(url: string, options?: IRequestOptions): Promise<IResponse<T>>;
}

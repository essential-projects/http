import {IHttpClient, IResponse, IRequestOptions} from '@process-engine-js/http_contracts';
import * as popsicle from 'popsicle';

export class HttpClient implements IHttpClient {

  public config: any = undefined;

  protected buildRequestOptions(method: string, url: string, options?: IRequestOptions): IRequestOptions {

    const baseUrl = this.config.url ? `${this.config.url}/` : '';

    const requestOptions = {
      method: method,
      url: `${baseUrl}${url}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (options) {
      Object.assign(requestOptions, options);
    }

    return requestOptions;
  }

  public async get<T>(url: string, options?: IRequestOptions): Promise<IResponse<T>> {

    const requestOptions = this.buildRequestOptions('GET', url, options);

    const result = await popsicle.request(requestOptions);

    if (result.status < 200 || result.status >= 300) {
      throw new Error(result.body);
    }

    const response = {
      result: result.body,
      status: result.status
    };

    return response;
  }

  public async post<T>(url: string, data: T, options?: IRequestOptions): Promise<IResponse<T>> {

    const requestOptions = this.buildRequestOptions('POST', url, options);

    const result = await popsicle.request(requestOptions);

    if (result.status < 200 || result.status >= 300) {
      throw new Error(result.body);
    }

    const response = {
      result: result.body,
      status: result.status
    };

    return response;

  }

  public async put<T>(url: string, data: T, options?: IRequestOptions): Promise<IResponse<T>> {

    const requestOptions = this.buildRequestOptions('PUT', url, options);

    const result = await popsicle.request(requestOptions);

    if (result.status < 200 || result.status >= 300) {
      throw new Error(result.body);
    }

    const response = {
      result: result.body,
      status: result.status
    };

    return response;
  }

  public async delete<T>(url: string, options?: IRequestOptions): Promise<IResponse<T>> {

    const requestOptions = this.buildRequestOptions('DELETE', url, options);

    const result = await popsicle.request(requestOptions);

    if (result.status !== 204 && result.status !== 200) {
      throw new Error(result.body);
    }

    const response = {
      result: result.body,
      status: result.status
    };

    return response;
  }

}
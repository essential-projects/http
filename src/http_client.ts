import {IHttpClient, IResponse, IRequestOptions} from '@process-engine-js/http_contracts';
import * as popsicle from 'popsicle';

export class HttpClient implements IHttpClient {

  public config: any = undefined;

  protected buildRequestOptions(method: string, url: string, options?: IRequestOptions): IRequestOptions {

    const baseUrl = this.config && this.config.url ? `${this.config.url}/` : '';

    const requestOptions: any = {
      method: method,
      url: `${baseUrl}${url}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (options) {
      Object.assign(requestOptions, options);
    }

    if (requestOptions.query) {
      this._deleteEmptyOptions(requestOptions.query);
    }

    return requestOptions;
  }

  private _deleteEmptyOptions(options: any) {

    const propertyKeys = Object.keys(options);

    propertyKeys.forEach((attributeKey) => {

      const value = options[attributeKey];
      if (value === undefined || value === null) {
        delete options[attributeKey];
      }
      if (Array.isArray(value) && value.length === 0) {
        delete options[attributeKey];
      }
    });
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
  public async post<D, T>(url: string, data: D, options?: IRequestOptions): Promise<IResponse<T>> {

    const requestOptions: any = this.buildRequestOptions('POST', url, options);

    requestOptions.body = data;

    const result = await popsicle.request(requestOptions);

    if (result.status < 200 || result.status >= 300) {
      throw new Error(result.body);
    }

    const response: IResponse<T> = {
      result: result.body,
      status: result.status
    };

    return response;

  }

  public async put<T>(url: string, data: T, options?: IRequestOptions): Promise<IResponse<T>> {

    const requestOptions: any = this.buildRequestOptions('PUT', url, options);

    requestOptions.body = data;

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

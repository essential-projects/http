import {IHttpClient, IResponse} from '@process-engine-js/http_contracts';
import * as popsicle from 'popsicle';

export class HttpClient implements IHttpClient {

  public config: any = undefined;

  private _buildRequestOptions(method: string, url: string): popsicle.RequestOptions {

    const baseUrl = this.config.url ? `${this.config.url}/` : '';

    return {
      method: method,
      url: `${baseUrl}${url}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }

  public async get<T>(url: string): Promise<IResponse<T>> {

    const requestOptions = this._buildRequestOptions('GET', url);

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

  public async post<T>(url: string, data: T): Promise<IResponse<T>> {

    const requestOptions = this._buildRequestOptions('POST', url);

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

  public async put<T>(url: string, data: T): Promise<IResponse<T>> {

    const requestOptions = this._buildRequestOptions('PUT', url);

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

  public async delete<T>(url: string): Promise<IResponse<T>> {

    const requestOptions = this._buildRequestOptions('DELETE', url);

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
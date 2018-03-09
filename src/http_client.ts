import {IHttpClient, IRequestOptions, IResponse} from '@essential-projects/http_contracts';
import * as popsicle from 'popsicle';

export class HttpClient implements IHttpClient {

  public config: any = undefined;

  private httpSuccessResponseCode: number = 200;
  private httpSuccessNoContentResponseCode: number = 204;
  private httpRedirectResponseCode: number = 300;

  protected buildRequestOptions(method: string, url: string, options?: IRequestOptions): IRequestOptions {

    const baseUrl: string = this.config && this.config.url ? `${this.config.url}/` : '';

    const requestOptions: any = {
      method: method,
      url: `${baseUrl}${url}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (options) {
      Object.assign(requestOptions, options);
    }

    if (requestOptions.query) {
      this._deleteEmptyOptions(requestOptions.query);
    }

    return requestOptions;
  }

  private _deleteEmptyOptions(options: any): void {

    const propertyKeys: Array<string> = Object.keys(options);

    propertyKeys.forEach((attributeKey: string) => {

      const value: any = options[attributeKey];
      if (value === undefined || value === null) {
        delete options[attributeKey];
      }
      if (Array.isArray(value) && value.length === 0) {
        delete options[attributeKey];
      }
    });
  }

  public async get<T>(url: string, options?: IRequestOptions): Promise<IResponse<T>> {

    const requestOptions: IRequestOptions = this.buildRequestOptions('GET', url, options);

    const result: any = await popsicle.request(requestOptions);

    if (result.status < this.httpSuccessResponseCode || result.status >= this.httpRedirectResponseCode) {
      throw new Error(result.body);
    }

    const response: IResponse<T> = {
      result: this.parsePopsicleResponse(result.body),
      status: result.status,
    };

    return response;
  }
  public async post<D, T>(url: string, data: D, options?: IRequestOptions): Promise<IResponse<T>> {

    const requestOptions: any = this.buildRequestOptions('POST', url, options);

    requestOptions.body = data;

    const result: any = await popsicle.request(requestOptions);

    if (result.status < this.httpSuccessResponseCode || result.status >= this.httpRedirectResponseCode) {
      throw new Error(result.body);
    }

    const response: IResponse<T> = {
      result: this.parsePopsicleResponse(result.body),
      status: result.status,
    };

    return response;

  }

  public async put<T>(url: string, data: T, options?: IRequestOptions): Promise<IResponse<T>> {

    const requestOptions: any = this.buildRequestOptions('PUT', url, options);

    requestOptions.body = data;

    const result: any = await popsicle.request(requestOptions);

    if (result.status < this.httpSuccessResponseCode || result.status >= this.httpRedirectResponseCode) {
      throw new Error(result.body);
    }

    const response: IResponse<T> = {
      result: this.parsePopsicleResponse(result.body),
      status: result.status,
    };

    return response;
  }

  public async delete<T>(url: string, options?: IRequestOptions): Promise<IResponse<T>> {

    const requestOptions: IRequestOptions = this.buildRequestOptions('DELETE', url, options);

    const result: any = await popsicle.request(requestOptions);

    if (result.status !== this.httpSuccessNoContentResponseCode && result.status !== this.httpSuccessResponseCode) {
      throw new Error(result.body);
    }

    const response: IResponse<T> = {
      result: this.parsePopsicleResponse(result.body),
      status: result.status,
    };

    return response;
  }

  private parsePopsicleResponse(result: any): any {
    // NOTE: For whatever reason, every response.body received by popsicle is a string,
    // even in a response header "Content-Type application/json" is set.
    // To get around this, we have to cast the result manually.
    if (typeof result !== 'string') {
      return result;
    }

    return JSON.parse(result);
  }
}

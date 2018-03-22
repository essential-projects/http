import * as EssentialProjectErrors from '@essential-projects/errors_ts';
import {IHttpClient, IRequestOptions, IResponse} from '@essential-projects/http_contracts';
import * as popsicle from 'popsicle';

export class HttpClient implements IHttpClient {

  public config: any = undefined;

  private httpSuccessResponseCode: number = 200;
  private httpSuccessNoContentResponseCode: number = 204;
  private httpRedirectResponseCode: number = 300;

  public async get<T>(url: string, options?: IRequestOptions): Promise<IResponse<T>> {

    const requestOptions: IRequestOptions = this.buildRequestOptions('GET', url, options);

    const response: any = await popsicle.request(requestOptions);

    const parsedResponse: IResponse<T> = this._evaluateResponse<T>(response);

    return parsedResponse;
  }

  public async post<D, T>(url: string, data: D, options?: IRequestOptions): Promise<IResponse<T>> {

    const requestOptions: any = this.buildRequestOptions('POST', url, options);

    requestOptions.body = data;

    const response: any = await popsicle.request(requestOptions);

    const parsedResponse: IResponse<T> = this._evaluateResponse<T>(response);

    return parsedResponse;
  }

  public async put<T>(url: string, data: T, options?: IRequestOptions): Promise<IResponse<T>> {

    const requestOptions: any = this.buildRequestOptions('PUT', url, options);

    requestOptions.body = data;

    const response: any = await popsicle.request(requestOptions);

    const parsedResponse: IResponse<T> = this._evaluateResponse<T>(response);

    return parsedResponse;
  }

  public async delete<T>(url: string, options?: IRequestOptions): Promise<IResponse<T>> {

    const requestOptions: IRequestOptions = this.buildRequestOptions('DELETE', url, options);

    const response: any = await popsicle.request(requestOptions);

    const parsedResponse: IResponse<T> = this._evaluateResponse<T>(response);

    return parsedResponse;
  }

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

  private _evaluateResponse<T>(response: any): IResponse<T> {

    if (this._responseIsAnError(response)) {
      this._createAndThrowEssentialProjectsError(response);
    }

    const parsedResponse: IResponse<T> = {
      result: this._parseResponseBody(response.body),
      status: response.status,
    };

    return parsedResponse;
  }

  private _responseIsAnError(response: any): boolean {
    return response.status < this.httpSuccessResponseCode || response.status >= this.httpRedirectResponseCode;
  }

  private _createAndThrowEssentialProjectsError(response: any): void {
    const responseStatusCode: number = response.status;
    const errorName: string = EssentialProjectErrors.ErrorCodes[responseStatusCode];

    if (!this._isEssentialProjectsError(errorName)) {
      throw new Error(response.body);
    }

    throw new EssentialProjectErrors[errorName](response.body);
  }

  private _isEssentialProjectsError(errorName: string): boolean {
    return errorName in EssentialProjectErrors;
  }

  private _parseResponseBody(result: any): any {
    // NOTE: For whatever reason, every response.body received by popsicle is a string,
    // even in a response header "Content-Type application/json" is set, or if the response body does not exist.
    // To get around this, we have to cast the result manually.
    try {
      return JSON.parse(result);
    } catch (error) {
      return result;
    }
  }
}

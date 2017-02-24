"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const popsicle = require("popsicle");
class HttpClient {
    constructor() {
        this.config = undefined;
    }
    _buildRequestOptions(method, url) {
        const baseUrl = this.config.url ? `${this.config.url}/` : '';
        return {
            method: method,
            url: `${baseUrl}${url}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = this._buildRequestOptions('GET', url);
            const result = yield popsicle.request(requestOptions);
            if (result.status < 200 || result.status >= 300) {
                throw new Error(result.body);
            }
            const response = {
                result: result.body,
                status: result.status
            };
            return response;
        });
    }
    post(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = this._buildRequestOptions('POST', url);
            const result = yield popsicle.request(requestOptions);
            if (result.status < 200 || result.status >= 300) {
                throw new Error(result.body);
            }
            const response = {
                result: result.body,
                status: result.status
            };
            return response;
        });
    }
    put(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = this._buildRequestOptions('PUT', url);
            const result = yield popsicle.request(requestOptions);
            if (result.status < 200 || result.status >= 300) {
                throw new Error(result.body);
            }
            const response = {
                result: result.body,
                status: result.status
            };
            return response;
        });
    }
    delete(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = this._buildRequestOptions('DELETE', url);
            const result = yield popsicle.request(requestOptions);
            if (result.status !== 200) {
                throw new Error(result.body);
            }
        });
    }
}
exports.HttpClient = HttpClient;

//# sourceMappingURL=http_client.js.map

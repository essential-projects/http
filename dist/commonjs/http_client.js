"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var popsicle = require("popsicle");
var HttpClient = (function () {
    function HttpClient() {
        this.config = undefined;
    }
    HttpClient.prototype.buildRequestOptions = function (method, url, options) {
        var baseUrl = this.config.url ? this.config.url + "/" : '';
        var requestOptions = {
            method: method,
            url: "" + baseUrl + url,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (options) {
            Object.assign(requestOptions, options);
        }
        this._deleteEmptyOptions(requestOptions.query);
        return requestOptions;
    };
    HttpClient.prototype._deleteEmptyOptions = function (options) {
        var propertyKeys = Object.keys(options);
        propertyKeys.forEach(function (attributeKey) {
            var value = options[attributeKey];
            if (value === undefined || value === null) {
                delete options[attributeKey];
            }
            if (Array.isArray(value) && value.length === 0) {
                delete options[attributeKey];
            }
        });
    };
    HttpClient.prototype.get = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions, result, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestOptions = this.buildRequestOptions('GET', url, options);
                        return [4 /*yield*/, popsicle.request(requestOptions)];
                    case 1:
                        result = _a.sent();
                        if (result.status < 200 || result.status >= 300) {
                            throw new Error(result.body);
                        }
                        response = {
                            result: result.body,
                            status: result.status
                        };
                        return [2 /*return*/, response];
                }
            });
        });
    };
    HttpClient.prototype.post = function (url, data, options) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions, result, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestOptions = this.buildRequestOptions('POST', url, options);
                        requestOptions.body = data;
                        return [4 /*yield*/, popsicle.request(requestOptions)];
                    case 1:
                        result = _a.sent();
                        if (result.status < 200 || result.status >= 300) {
                            throw new Error(result.body);
                        }
                        response = {
                            result: result.body,
                            status: result.status
                        };
                        return [2 /*return*/, response];
                }
            });
        });
    };
    HttpClient.prototype.put = function (url, data, options) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions, result, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestOptions = this.buildRequestOptions('PUT', url, options);
                        requestOptions.body = data;
                        return [4 /*yield*/, popsicle.request(requestOptions)];
                    case 1:
                        result = _a.sent();
                        if (result.status < 200 || result.status >= 300) {
                            throw new Error(result.body);
                        }
                        response = {
                            result: result.body,
                            status: result.status
                        };
                        return [2 /*return*/, response];
                }
            });
        });
    };
    HttpClient.prototype.delete = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions, result, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestOptions = this.buildRequestOptions('DELETE', url, options);
                        return [4 /*yield*/, popsicle.request(requestOptions)];
                    case 1:
                        result = _a.sent();
                        if (result.status !== 204 && result.status !== 200) {
                            throw new Error(result.body);
                        }
                        response = {
                            result: result.body,
                            status: result.status
                        };
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;

//# sourceMappingURL=http_client.js.map

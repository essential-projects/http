"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const utils_1 = require("@process-engine-js/utils");
class BaseRouter {
    constructor() {
        this._router = undefined;
        this.config = undefined;
    }
    Object.defineProperty(BaseRouter.prototype, "router", {
        get: function () {
            if (!this._router) {
                this._router = Express.Router();
            }
            return this._router;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRouter.prototype, "baseRoute", {
        get: function () {
            var baseRoute = this.config.baseRoute;
            if (!baseRoute) {
                return '';
            }
            return baseRoute;
        },
        enumerable: true,
        configurable: true
    });
    BaseRouter.prototype.initialize = function () {
        return utils_1.executeAsExtensionHookAsync(this.initializeRouter, this);
    }
    initializeRouter() { }
}
exports.BaseRouter = BaseRouter;

//# sourceMappingURL=base_router.js.map

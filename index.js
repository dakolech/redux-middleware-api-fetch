var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
define("api.middleware", ["require", "exports"], function (require, exports) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.API_CALL = 'API_CALL';
    var absoluteURLPattern = /^((?:https:\/\/)|(?:http:\/\/)|(?:www))/;
    function generateUrl(url, baseUrl) {
        return url.match(absoluteURLPattern) ? url : baseUrl + url;
    }
    exports.api = {
        get: function (path, config, headers) {
            if (headers === void 0) { headers = {}; }
            return {
                type: exports.API_CALL,
                payload: {
                    path: path,
                    config: config,
                    method: 'GET',
                    headers: headers,
                },
            };
        },
        post: function (path, body, config, headers) {
            if (headers === void 0) { headers = {}; }
            return {
                type: exports.API_CALL,
                payload: {
                    path: path,
                    config: config,
                    method: 'POST',
                    body: body,
                    headers: headers,
                },
            };
        },
        put: function (path, body, config, headers) {
            if (headers === void 0) { headers = {}; }
            return {
                type: exports.API_CALL,
                payload: {
                    path: path,
                    config: config,
                    method: 'PUT',
                    body: body,
                    headers: headers,
                },
            };
        },
        patch: function (path, body, config, headers) {
            if (headers === void 0) { headers = {}; }
            return {
                type: exports.API_CALL,
                payload: {
                    path: path,
                    config: config,
                    method: 'PATCH',
                    body: body,
                    headers: headers,
                },
            };
        },
        delete: function (path, config, headers) {
            if (headers === void 0) { headers = {}; }
            return {
                type: exports.API_CALL,
                payload: {
                    path: path,
                    config: config,
                    method: 'DELETE',
                    headers: headers,
                },
            };
        },
    };
    function getStateHeaders(headers, state) {
        return Object.keys(headers).reduce(function (acc, curr) {
            if (Array.isArray(acc[curr])) {
                var stateValue = state;
                var index = 0;
                while (index < acc[curr].length) {
                    if (stateValue == null) {
                        return __assign({}, acc, (_a = {}, _a[curr] = '', _a));
                    }
                    stateValue = stateValue[acc[curr][index]];
                    index += 1;
                }
                return __assign({}, acc, (_b = {}, _b[curr] = String(stateValue) || '', _b));
            }
            return acc;
            var _a, _b;
        }, headers);
    }
    exports.apiMiddlewareCreator = function (apiConfig) {
        var defaultHeaders = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        return function (_a) {
            var getState = _a.getState;
            return function (next) {
                return function (action) { return __awaiter(_this, void 0, void 0, function () {
                    var state, headers, baseUrl, response, json, error, _1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (action.type !== exports.API_CALL) {
                                    return [2 /*return*/, next(action)];
                                }
                                next(__assign({}, action, { type: action.payload.config.type || action.type }));
                                state = getState();
                                headers = __assign({}, defaultHeaders, getStateHeaders(apiConfig.headers, state), getStateHeaders(action.payload.headers, state));
                                baseUrl = generateUrl(action.payload.path, apiConfig.baseUrl || '');
                                return [4 /*yield*/, fetch(baseUrl, {
                                        method: action.payload.method,
                                        headers: headers,
                                        body: JSON.stringify(['POST', 'PATCH', 'PUT'].includes(action.payload.method) ? action.payload.body : undefined)
                                    })];
                            case 1:
                                response = _a.sent();
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4 /*yield*/, response.json()];
                            case 3:
                                json = _a.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                _1 = _a.sent();
                                error = response.status + " " + response.statusText;
                                return [3 /*break*/, 5];
                            case 5:
                                if (response.ok) {
                                    return [2 /*return*/, next({
                                            payload: json,
                                            type: action.payload.config.success,
                                        })];
                                }
                                else {
                                    return [2 /*return*/, next({
                                            payload: error || json,
                                            type: action.payload.config.failure,
                                        })];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
            };
        };
    };
});
//# sourceMappingURL=index.js.map
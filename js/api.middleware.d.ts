import { Action } from 'redux';
export declare const API_CALL = "API_CALL";
export interface Config {
    success: string;
    failure: string;
    type?: string;
}
export interface ApiCallAction extends Action {
    payload: {
        method: string;
        path: string;
        config: Config;
        body?: any;
        headers: any;
    };
}
export interface Api {
    get: (path: string, config: Config, headers?: any) => ApiCallAction;
    post: (path: string, body: any, config: Config, headers?: any) => ApiCallAction;
    put: (path: string, body: any, config: Config, headers?: any) => ApiCallAction;
    patch: (path: string, body: any, config: Config, headers?: any) => ApiCallAction;
    delete: (path: string, config: Config, headers?: any) => ApiCallAction;
}
export declare const api: Api;
export declare const apiMiddlewareCreator: any;

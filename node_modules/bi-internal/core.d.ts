import { IDisposable } from "./defs/Observable";
import {BaseService} from "./defs/BaseService";

/**
 * IAppConfig
 */

interface IAppConfig {
    loading: boolean;
    error: string;
    requestUrls: any;
    projectTitle: string;
    locale: string;
    language: 'en' | 'ru';
    region: string;
    features: string[];
    plugins: string[];
    dataset: any;
    map: any;
}

export interface IUrl {
    loading?: boolean;
    error?: string;
    path: string[];
    segment?: string;
    segmentId?: string;
    route?: string;
    routeId?: string;
    locations?: string[];
    metrics?: string[];
    preset?: number;
    period?: {
        start?: string;
        end?: string;
        type?: number;
    };
    geo?: {
        lat: number;
        lng: number;
        zoom: number;
    };
    autoscale?: boolean;
    ao?: string;
    loc?: boolean;
    mf?: {
        e?: boolean;
        ls?: string[];
        m?: string;
    };
    dboard?: string;
    dash?: string;
    slide?: string;
    map?: {
        vizelType?: string;
    };
    fts?: string;
    [id: string]: any;
}

export declare class AppConfig extends BaseService<IAppConfig> {
    constructor();

    setAppConfig(rawAppConfig: any): void;

    hasFeature(featureName: string): boolean;

    fixRequestUrl(url: string): string;

    static getInstance: () => AppConfig;

    static getModel(): IAppConfig;

    static fixRequestUrl(url: string): string;

    static hasFeature(featureName: string): boolean;

    static getProjectTitle(): string;

    static getLocale(): string;

    static getLanguage(): 'en' | 'ru';

    static getPlugins(): string[];
}

/**
 * UrlState
 */


declare class UrlState extends BaseService<IUrl>  {
    private _entryPoint;
    private _urlStructure;
    private _urlSerializable;
    constructor();
    protected _createInitialModel(): IUrl;
    setEntryPoint(entryPoint: any): void;
    setUrlStructure(urlStructure: any): void;
    protected _smartUpdate(newModel: IUrl, prevModel: IUrl): IUrl;
    protected _isModelChanged(nextModel: IUrl, currentModel: IUrl): boolean;
    buildUrl(additionalState: any): string;
    private _serializeUrl;
    getModel(): IUrl;
    protected _setModel(model: IUrl): void;
    private _changeHangler;
    navigate(additionalQuery: any, option?: any): any;
    updateModel(partialModel: Partial<IUrl>, isReplace?: boolean): void;
    setModel(model: IUrl, replaceUrl?: boolean): void;
    protected _dispose(): void;
    deserializeUrl(fragment: string): IUrl;
    private _deserializeSearch;
    private static _instance;
    static getInstance(): UrlState;
    static getModel(): IUrl;
    static subscribe(event: string, listener: any): IDisposable;
    static subscribeUpdatesAndNotify(listener: (model: IUrl) => void): IDisposable;
    static subscribeUpdates(listener: (model: IUrl) => void): IDisposable;
    static unsubscribe(listener: (...args: any[]) => any): boolean;
    static navigate(additionalQuery: any, option?: any): any;
}

/**
 * urlState
 */

export declare const urlState: UrlState;

/**
 *  Makes string from error of any type:
 *    JS exceptions, http responses, text
 *
 * @param err
 * @returns {string}
 */
export declare function extractErrorMessage(err: any): string;


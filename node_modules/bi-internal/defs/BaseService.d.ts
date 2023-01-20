import {IDisposable, Observable} from "./Observable";

declare type IDepsModels = {
    [id: string]: any;
};
export interface IBaseModel {
    loading?: boolean | number;
    error?: string | null;
}

export declare class BaseService<M extends IBaseModel> extends Observable {
    protected _model: M;
    protected _subscriptions: IDisposable[];
    private _depsWatcher;
    private _hDependenciesNames;
    private _hDepsModels;
    private _initializedInstance;
    constructor(initialModel?: M);
    protected _createInitialModel(): M;
    protected _addDependency(depId: string, dep: BaseService<any>, doImmediateNotify?: boolean): void;
    protected _addDependencies(deps: {
        [id: string]: BaseService<any>;
    }, doImmediateNotify?: boolean): void;
    protected _removeDependency(depId: string, doImmediateNotify?: boolean): void;
    protected _onDepsUpdated(newModels: IDepsModels, prevModels: IDepsModels): boolean;
    protected _onDepsReadyAndUpdated(newModels: any, prevModels: any): void;
    protected _getDependencyModel<T>(depId: string): T;
    protected _updateWithLoading(): void;
    protected _updateWithError(error: string): void;
    protected _updateWithData(partialModel: Partial<M>): void;
    protected _smartUpdate(newModel: M, prevModel: M): M;
    protected _isModelChanged(nextModel: M, currentModel: M): boolean;
    protected _isUpdatesFrozen: boolean;
    protected _freezeUpdates(fn: () => any): any;
    private _notifyUpdate;
    protected _setModel(model: M): void;
    protected _updateModel(partialModel: Partial<M>): void;
    isReady(): boolean;
    whenReady(): Promise<M>;
    subscribeAndNotify(event: string, listener: (model: M) => void): IDisposable;
    subscribeUpdates(listener: (model: M) => void): IDisposable;
    subscribeUpdatesAndNotify(listener: (model: M) => void): IDisposable;
    getModel(): M;
    protected _releaseChild(name: string): void;
    protected _dispose(): void;
    static dependency(target: BaseService<any>, key: string, descriptor?: TypedPropertyDescriptor<any>): any;
}
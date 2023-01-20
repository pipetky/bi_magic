export interface IDisposable {
    dispose(): void;
}
export interface IRetainable {
    retain(): this;
    release(): boolean;
    lock<T>(fn: () => T): Promise<T>;
}
export declare abstract class Retainable implements IRetainable {
    private __refCount;
    retain(): this;
    release(): boolean;
    releaseNextTick(): this;
    lock<T>(fn: () => T | Promise<T>): Promise<T>;
    protected abstract _dispose(): void;
}
export interface IObservable extends IRetainable {
    subscribe(event: string, listener: any): IDisposable;
}

export declare class Observable extends Retainable implements IObservable {
    private _listeners;
    constructor();
    protected _notify(eventDescription: string | ((event: string) => boolean), ...args: any[]): void;
    subscribe(event: string, listener: any): IDisposable;
    unsubscribe(listener: (...args: any[]) => any): boolean;
    once(event: string, listener: any): IDisposable;
    happens(event: string): Promise<any>;
    protected _dispose(): void;
}
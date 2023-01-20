import {IEntity, ISubspace, IUnit, IValue} from "./defs/bi";


export interface IIdOwner {
    id: string | number;
}

export interface IPkFontMetrics {
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    fontStretch?: string;
    fontSize?: number | string;
    lineHeight?: number | string;
    fontFamily?: string;
}

export function oneEntity<T extends IEntity>(es: T[]): T

/**
 * Get Entity by id
 * @param {T[]} es entities array
 * @param {string | number} id entity id to search
 * @returns {T} entity or null
 */
export function $eid<T extends IIdOwner>(es: T[], id: string | number): T | null;

/**
 * Get entity index in array, -1 if not exists
 * @param {T[]} es
 * @param {string | number} id
 * @returns {number}
 */
export function $eidx<T extends IIdOwner>(es: T[], id: string | number): number

export function isNull(object: any): object is null;

declare module bi {
    export function createSimpleSubspace(xs: IEntity[], ys: IEntity[], zs: IEntity[]): ISubspace;

    export function createSimpleSubspaceXYZ(xs: IEntity[], ys: IEntity[], zs: IEntity[]): ISubspace;

    export function createSimpleSubspaceZYX(xs: IEntity[], ys: IEntity[], zs: IEntity[]): ISubspace;
}

export function getTextWidth(text: string, fontMetrics?: IPkFontMetrics): number;

export function search(value: string, pattern: string): boolean;

export function isRed(metricValue: number, colorValue: number, normValue: number, normInvert: boolean): boolean;

export function formatNum(value: IValue, precision?: number): string;

export function makeValue(v: IValue, unit?: IUnit, digits?: number): string;

export function makeValueWithoutSuffix(v: IValue, unit?: IUnit, digits?: number): string;
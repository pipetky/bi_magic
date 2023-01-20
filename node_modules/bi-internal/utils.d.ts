export * from './utils/utils'
export * from './utils/list';
export * from './utils/c-utils'

import {mouseWatcher} from './utils/MouseWathcer';

declare module 'wellknown' {
    export function parse(wktString: string): any;
}

/**
 * @param {any} lpeCode - ЛПЕ выражение
 * @param {any} ctx - контекст ЛПЕ выражения
 */
export function lpeRun(lpeCode: any, ctx: any): any

/**
 * @param {number} value
 * @param  {string} format
 * @description https://www.npmjs.com/package/format-number-with-string
 */
export declare function formatNumberWithString(value: number, format: string): string

export {mouseWatcher}


import React = require("../defs/react");

export interface IOpenModalVMOpt {
    cancelWrapper?: boolean;   // default = true,  закрытие модального окна по клику на wrapper
    hiddenWrapper?: boolean;   // default = false,  наличие wrapper'a
    style?: { [id: string]: string | number };
    className?: string;
}

/**
 * @param {React.ReactElement} el - реакт компонент
 * @param {IOpenModalVMOpt}  options - доп опции
 * @description Функция открывает окно, в котором встиавлен реакт эл-т, у которого в props добавляются функции:
 *  onModalCancel: (args: any) => void
 *  onModalResult: (args: any) => void
 * , Функции срабатываают на  openModal.then((args)=> аргументы из onModalResult ).catch((args)=> аргументы из onModalCancel)
 */
export function openModal(el: React.ReactElement, options?: IOpenModalVMOpt): Promise<any> 

import React = require("../defs/react");
import {IVizelProps} from '../defs/types';
import { tables } from "../defs/bi";

interface IModalContainerRProps {
}

export class ModalContainer extends React.Component<IModalContainerRProps> {


    public constructor(props: IModalContainerRProps)

    public resize(): void;

    public onVizelPropertiesChanged(properties: any, vizel: any): void;

    public push(pVizel: IVizelProps, pTitle?: string | string[]): void;


    public pushVizelConfig(rawVizelConfig: tables.IRawVizelConfig, title?: string | string[]): Promise<any>

    public pop(): void;

    public hide(): void;
}

export declare const modalContainer: ModalContainer;
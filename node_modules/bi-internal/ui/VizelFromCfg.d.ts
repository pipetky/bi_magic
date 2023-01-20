import React = require("../defs/react");
import {IVizelProperties, tables} from '../defs/bi'
import {repo} from '../core'

export interface IVizelFromCfgProps {
    schema_name: string;
    view_class?: string;
    title?: string;
    description?: string;
    cfg?: any;
    rawCfg: tables.IRawVizelConfig;
    onVizelPropertiesChanged?: (properties: IVizelProperties, vizel: any) => void;
    properties?: IVizelProperties;
    datasetId?: number;
    dashId?: number | string;
    dashboardId?: number | string;
    dashboardTitle?: string;
    datasetTitle?: string;
    loadingIndicatorFunc?: () => void;
    renderError?: (error: string) => any;
    renderLoading?: (loading: boolean) => any;
    editMode?: string;
    onEditDashlet?: () => void;
    onChangeDashlets?: (updated: repo.ds.IRawDashlet[], deleted?: number[]) => any;
    dashlet?: any;
}

/**
 * @description Позволяет вставлять bi-визели используя rawCfg
 */
export class VizelFromCfg extends React.Component<IVizelFromCfgProps> {
    public constructor(props)

    /**
     * @description позволяет сообщать визелю об изменении ширины/длинны контейнера
     */
    public resize(width, height): void;

    /**
     * @description отрисовка кнопки сохранить как
     */
    public save(saveAbility, titleContext, $anchor): void;

    public addListener(listener): void;

    public setProperties(o): void
}

export default VizelFromCfg;
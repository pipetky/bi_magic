import {IDataSource} from "../services";
import {
    IAggregate,
    IColorPair, IDashConfig,
    IEntity,
    ILocation,
    IMetric,
    IMLPSubspace, INormsResponse,
    IPeriod,
    ISubspace,
    IValue,
    IVizelConfigAxis
} from "./bi";
import IStopPoint = tables.IStopPoint;
import {IDisposable} from "./Observable";


type IRawColor = string | number | number[] | null | undefined;

declare type IRange = [number, number];

interface IStoplightsProvider {
    getStoplight(v: number, vizelType?: string): IStoplight;

    getStoplights(vizelType?: string): IStoplights;
}

export interface IStoplight {
    limit?: [number, number];
    name?: string;
    color: string | null;
    bgColor: string | null;
    colorPair: IColorPair;

    hasValue(v: IValue): boolean;

    getColor(e: IEntity, v?: IValue): string;

    getBgColor(e: IEntity, v?: IValue): string;

    getColorPair(e: IEntity, v?: IValue): IColorPair;
}

export interface IColorResolver {
    getColor(e: IEntity, v?: IValue, index?: number): string | null;

    getBgColor(e: IEntity, v?: IValue, index?: number): string | null;

    getColorPair(e: IEntity, v?: IValue, index?: number): IColorPair;     // TODO: implement every colorResolver to have method
}

export interface IStoplights extends IColorResolver {
    getStoplight(v: IValue): IStoplight;

    forEach(fn: (s: IStoplight) => void): void;

    forEachPoint(fn: (s: IStopPoint) => void): void;

    map<U>(callbackfn: (value: IStoplight, index: number, array: IStoplight[]) => U, thisArg?: any): U[];
}


export interface IVizelConfigDisplay extends IStoplightsProvider {
    xAxisTickTitleRotationAngle?: number;
    color?: string;                         // for text/list vizel
    bgColor?: string;
    backgroundShape?: string;
    cmpTitle?: string;
    gradient?: string;
    readonly group: any;
    title?: string;
    format?: string;
    filter?: string;
    filterBy?: string | any[];
    widths?: any[];
    excludeY?: string[];
    excludeX?: string[];
    plotOptions?: any;                                                                                // additional options for chart

    hasRange(): boolean;

    getRange(): IRange;

    disableRange(): void;

    getLimit(): number;

    getSort(): string;          // 'asc', 'desc', null
    getSortBy(): string;        // id of IEntity to sort

    setSort(v: string): void;

    getVAxisWidth(): number;

    getGradient(): string;

    getStackGroupIndex(e: IEntity): number;
}

export declare module tables {
    export interface ILocationConfig {
        tags?: string[];
        color?: string;
        bgColor?: string;
        title?: string;
    }

    export interface ILocationsItem {                                             // table: locations
        id: number;                                                                 // v3.0
        config: ILocationConfig;
        is_hidden: number;
        is_point: number;
        latitude: number;
        longitude: number;
        tree_level: number;
        loc_id?: number;                       // deprecated
        parent_id: number;
        srt: number;
        src_id: string;
        title: string;
        created: string;
        updated: string;
        tags: any;
    }

    export interface IMetricsItem {
        is_norm: number;
        // table: params
        alt_id?: string;
        config: any;
        dim_id?: number;                       // v3.0: unit_id
        unit_id: number;
        id: string | number;
        is_hidden: number;
        is_text_val: number;
        tree_level: number;
        parent_id: string | number;
        title: string;
        srt?: number;
        tags: any;
    }

    export interface IPresetsItem {                                               // table: presets
        can_be_pie: number;
        created: string;
        metrics: number[];
        preset_id?: number;                                                         // deprecated in v3.0
        title: string;
        updated: string;
        id: number;
    }

    export interface IPeriodsItem {                                               // table: periods
        id: string;
        config: any;
        period_id?: string;
        period_type: number | string;                                               // may be string when updating from trigger
        qty: number | string;
        start: string;                                                              // deprecated
        start_time?: string;
        title: string;
        tags?: any;
    }

    export interface IDashletsItem {        // table: dashboard_views
        config: IDashConfig;
        dashboard_id: number;
        description?: string;
        idx: number;
        layout: string;
        length: string;
        parent_id: number;
        title: string;
        updated: string;
        view_class: string;
        view_id?: number;                    // deprecated
        id: number;
    }

    export interface IDashboardTopic {
        config: any;
        created: string;
        icon_id: number;
        id: number;
        parent_id: number | null;
        srt: number;
        title: string;
        tree_level: number;
        updated: string;
    }

    export interface IDataSource {
        parameters?: string[];
        metrics?: string[];
        locations?: string[];
        periods?: string[] | { start?: string; end?: string; type?: number; qty?: number };
        periodType?: string;
        zAxis?: string;   // 'locations', 'parameters', 'periods', 'metrics'
        yAxis?: string;
        xAxis?: string;
        style?: IDataSourceStyle;
        dataset?: string;
        koob?: string;
        dimensions?: string[];
        measures?: string[];
        filters?: any;
    }

    export interface IDashboardsItem {            // table: dashboards
        config: any;
        device: string;
        editable: number;
        icon_id: number;
        id: number;
        srt: number;
        title: string;
        topic_id: number;
        updated: string;
    }

    export interface IConfigItem {                // table: config
        cfg_key: string;
        cfg_val: string;
    }

    export interface IPeriodsItem {                                               // table: periods
        id: string;
        config: any;
        period_id?: string;
        period_type: number | string;                                               // may be string when updating from trigger
        qty: number | string;
        start: string;                                                              // deprecated
        start_time?: string;
        title: string;
        tags?: any;
    }

    interface IConfigFrame {
        x: number;
        y: number;
        w: number;
        h: number;
    }

    export interface IDataEntry {                 // table: data
        key?: string;               // deprecated
        loc_id: string | number;
        metric_id?: string | number;
        period_id: string;
        value?: IValue;             // deprecated
        val?: IValue;
    }

    export interface INormDataEntry extends IDataEntry {
        norm_id: string | number;

        // Hacky property
        // will be set while postprocessing norm data
        // and is using into NormManager
        // TODO: rethink process of populating norm response with corresponding metrics
        normMetric?: IMetric;
    }

    export interface IStopLight {
        name?: string;
        limit: [number, number];               // [number, number] | {min?: number, max?:number} | number
        color?: IRawColor;
        bgColor?: IRawColor;
        leftClosed?: boolean;                   // maybe move to range?
        rightClosed?: boolean;
    }

    export interface IStopPoint {
        name?: string;
        value: IValue;
        color?: IRawColor;
        bgColor?: string | number | number[];
        width?: number;
        style?: 'dotted' | 'dashed';
        zIndex?: number;
    }

    export interface IVizelConfigDisplayStoplight {
        lights?: IStopLight[];
        points?: IStopPoint[];
    }

    export interface IRawVizelConfig {
        view_class?: string;        // additional field, used to skip DashConfig in bookmarks
        vizelType?: string;         // additional field, used to skip DashConfig in bookmarks
        title?: string;
        description?: string;
        legend?: { [id: string]: ILegendItem };
        display?: IVizelConfigDisplay;
        dataSource?: IDataSource;
        options?: string[];
        chartStyle?: string;        // deprecated
        context?: any;              // used in external vizel
        isHidden?: boolean;
        overall?: (string | { title: string, formula: string })[];
        style?: IDataSourceStyle;

        normsMainColor?: string;
        badValueColor?: string;
        goodValueColor?: string;
        cardId?: string;
        externalUrl?: any;
        titleContext?: string[];
        url?: string;
        disabled?: any;
        visible?: any;

        header?: {
            style?: any;
        };

        onClick?: string | any;
        onClickDataPoint?: string | any;
    }

    export interface IDataSourceStyle {
        dimensions?: { [id: string]: ILegendItem };
        metrics?: { [id: string]: ILegendItem };
        locations?: { [id: string]: ILegendItem };
        periods?: { [id: string]: ILegendItem };

        // ... any other axis
        [axisId: string]: { [id: string]: ILegendItem };
    }

    export interface ILegendItem {
        color?: IRawColor;
        lineColor?: IRawColor;
        lineWidth?: number;
        bgColor?: IRawColor;
        title?: string;
        options?: string[];
        widgetType?: string;
        vizelType?: string;
        strokeStyle?: string;
        stack?: string;
        onClickDataPoint?: string;
        display?: tables.IVizelConfigDisplay;
        format?: string;
        srt?: number;
        stoplight?: IVizelConfigDisplayStoplight;
        formula?: string | number;
        tooltip?: string;
        markerSize?: number;
        colorFormula?: string;
        borderRadius?: number;
        marker?: any;
        itemStyle?: any;
        label?: any;
        emphasis?: any;
        markPoint?: any;
        markLine?: any;
        markArea?: any;
        areaStyle?: any;
        minWidth?: number;
        minHeight?: number;
    }

    export interface IVizelConfigDisplay {
        gradient?: string;
        group?: any;
        limit?: number;
        range?: [number, number];
        sort?: string;
        sortBy?: string;
        filterBy?: string | any[];
        filterValue?: IValue;
        stackGroups?: (string | number)[][];
        stoplight?: IVizelConfigDisplayStoplight;
        vAxis?: IVizelConfigAxis;
        xAxis?: IVizelConfigAxis;
        colorFormula?: string;
    }

    export interface IUnitsItem {            // table: units
        axis_title: string;
        config: any;
        created: string;
        divider_id: any;
        id: number;
        scale: number;
        scale_op: string;
        tiny_title: string;
        title: string;
        unit: any;
        updated: string;
        value_prefix: string;
        value_suffix: string;
    }

    export interface ILocationArea {
        id: number;
        sid?: number;            // deprecated in 3.0
        loc_id: number;
        name: string;
        WKT?: string;            // deprecated in 3.0
        wkt: string;
    }

    export interface ILocationCardField {
        config?: any;
        card_id: number;
        id: number;
        srt: number;
        text_id: string;
        title: string;
        metric_id: number;
    }

    export interface ILocationCard {
        css_file: string;
        id: number;
        level: number; // TODO: array
        loc_id: number; // TODO: array
        parent_id: number; // TODO: array
        title: string;
    }

    export interface IBookmark {
        config: any;
        context: any;
        created: string;
        dataset_guid: number;
        dataset_id: number;
        description: string;
        full_url: string;
        id: number;
        srt: number;
        tiny_url: string;
        title: string;
        topic_id: number;
        updated: string;
        user_id: number;
    }
}

export declare module data_engine {
    export type IMLPSubscribeCallback = (m: IMetric, l: ILocation, p: IPeriod, v: number) => void;
    export type ISubscribeCallback = (z: IEntity, y: IEntity, x: IEntity, v: number) => void;

    export interface IRawRequest {
        data?: boolean;
        norms?: boolean;
        aggregate?: boolean;
    }

    export interface IRawResponse {
        data?: tables.IDataEntry[];
        norms?: tables.INormDataEntry[];
        aggregate?: IAggregate;
    }

    export interface IRawDataProvider {
        // TODO: remove methods
        getRawData(mlpSubspace: IMLPSubspace, closest?: boolean): Promise<tables.IDataEntry[]>;

        getRawNorms(mlpSubspace: IMLPSubspace): Promise<tables.INormDataEntry[]>;

        getRawColors(mlpSubspace: IMLPSubspace): Promise<any>;

        getAggregate(mlpSubspace: IMLPSubspace): Promise<any>;

        load(request: IRawRequest, mlpSubspace: IMLPSubspace, closest?: boolean): Promise<IRawResponse>;

        rawSubscribe(mlpSubspace: IMLPSubspace, callback: IMLPSubscribeCallback): IDisposable;
    }

    export interface ICubeProvider {
        getCube(subspace: ISubspace, closest?: boolean): Promise<IValue[][][]>;
    }

    export interface IMatrixProvider {
        getMatrixYX(subspace: ISubspace, closest?: boolean): Promise<IValue[][]>;

        // getMatrixZX(subspace:ISubspace, closest?:boolean):Promise<number[][]>;
        // getMatrixZY(subspace:ISubspace, closest?:boolean):Promise<number[][]>;
    }

    export interface IVectorProvider {
        getVectorX(subspace: ISubspace, closest?: boolean): Promise<IValue[]>;

        getVectorY(subspace: ISubspace, closest?: boolean): Promise<IValue[]>;

        // getVectorZ_Promise(subspace:ISubspace, closest?:boolean):Promise<number[]>;
    }

    export interface IValueProvider {
        getValue(subspace: ISubspace, closest?: boolean): Promise<IValue>;
    }

    export interface INormsProvider {
        getNorms(subspace: ISubspace): Promise<INormsResponse>;
    }

    export interface IColorsProvider {
        // getColors
    }

    export interface IDataProvider extends IRawDataProvider, ICubeProvider, IMatrixProvider, IVectorProvider, IValueProvider, INormsProvider, IColorsProvider {
        subscribe(subspace: ISubspace, callback: ISubscribeCallback): IDisposable;
    }

}

export declare module responses {
    interface IDatasetDescription {
        config: any;
        datafile: string;
        description: string;
        groups: number[];
        guid?: string;
        icon: string;
        id: string | number;
        image: string;
        lastPeriod: tables.IPeriodsItem[];
        parent_id: string;
        schema_name: string;
        serial: string;
        sqlite_file?: string;
        title: string;
        ui_cfg: { [id: string]: string };
        srt: number;
        is_visible?: number;
        is_ready?: number;
    }

    export interface ITables {
        config: tables.IConfigItem[];

        dashboard_views?: tables.IDashletsItem[];                                                       // deprecated in 3.0
        dashes?: tables.IDashletsItem[];                                                                // deprecated in 3.0
        dashlets: tables.IDashletsItem[];

        dashboard_topics: tables.IDashboardTopic[];

        dashboards: tables.IDashboardsItem[];
        dimensions?: tables.IUnitsItem[];                                                               // deprecated in 3.0
        units: tables.IUnitsItem[];
        location_card_fields: tables.ILocationCardField[];
        location_cards: tables.ILocationCard[];
        locations: tables.ILocationsItem[];

        params: tables.IMetricsItem[];              // deprecated in 3.0
        metrics: tables.IMetricsItem[];

        period_types: any[];
        periods: tables.IPeriodsItem[];
        preset_lists: any[];

        presets: tables.IPresetsItem[];              // deprecated in 3.0
        metric_sets: tables.IPresetsItem[];

        spatial: tables.ILocationArea[];                              // deprecated in 3.0
        location_areas: tables.ILocationArea[];

        data?: tables.IDataEntry[];                 // optional table: data
    }

}
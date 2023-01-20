import {IObservable} from "./Observable";
import {IUrl} from "../core";
import {data_engine, IColorResolver, IRange, IStoplightsProvider, responses, tables} from "./tables";
import IConfigFrame = tables.IConfigFrame;
import IRawVizelConfig = tables.IRawVizelConfig;
import IVizelConfigDisplayStoplight = tables.IVizelConfigDisplayStoplight;

type IValue = number | string
type ISpatial = ILocationArea;

export interface IEntity {
    readonly unit?: any;
    readonly axisId?: string;
    readonly children?: IEntity[];
    color?: string;
    readonly config?: any;
    readonly id: number | string;
    readonly title: string;
    readonly parent?: IEntity;
    readonly description?: string;
}

interface ITreeNode<T> {
    children: T[];
    parent: T;
    root: T;

    getChildren(): T[];

    getDescendants(): T[];

    getParent(): T;
}

interface ITag extends ITreeNode<ITag> {
    id: number | string;
    title: string;
    axisId: string;

    addChild(tag: ITag): ITag;

    getChildById(id: string): ITag;
}

interface ITaggedEntity {
    rawTags: string[];

    addTag(tag: ITag): this;

    getTags(): ITag[];

    getTag(id: string | number): ITag;

    getTagByGroupId(tagGroupId: string): ITag;
}

interface IPeriodsItem {
    id: string;
    config: any;
    period_id?: string;
    period_type: number | string;
    qty: number | string;
    start: string;
    start_time?: string;
    title: string;
    tags?: any;
}

interface ILocationArea {
    id: string;
    sid?: number;            // deprecated in 3.0
    loc_id: number;
    name: string;
    WKT?: string;            // deprecated in 3.0
    wkt: string;

    // additional
    geoJSON: any;
    lid: string;              // location id
}

interface ILocationCardField {
    config?: any;
    card_id: number;
    id: string;
    srt: number;
    text_id: string;
    title: string;
    metric_id: number;

    // added
    metric: IMetric;
    cardId: string;
}

interface ILocationCard {
    css_file: string;
    level: number;
    loc_id: number;
    parent_id: number;
    title: string;
    config: any;

    // additional
    fields: ILocationCardField[];
    id: string;
}

export interface IDatasetModel extends IObservable {
    id: number;
    guid: string;
    // deprecated
    schemaName: string;
    schema_name: string;
    title: string;
    description: string;
    //
    units: IUnit[];
    metrics: IMetric[];
    rootMetrics: IMetric[];
    presets: IPreset[];
    locationCards: ILocationCard[];
    locationAreas: ILocationArea[];
    locations: ILocation[];
    rootLocations: ILocation[];
    periods: IPeriod[];

    defaultMetrics: IMetric[];
    defaultLocations: ILocation[];
    defaultPeriods: IPeriod[];

    metricsHelper: IMetricsHelper;
    locationsHelper: ILocationsHelper;
    periodsHelper: IPeriodsHelper;
    dashletsHelper: IDashletsHelper;

    getDataProvider(): data_engine.IDataProvider;

    getConfigHelper(): IConfigHelper;

    getEnterUrl(): IUrl;

    createVizelConfig(d: tables.IRawVizelConfig): IVizelConfig;

    createVizelController(vizelConfig: IVizelConfig, defaultAction: string): IVizelController;

    getDatasetTitleTemplate(route: string): string;

    getBiQuery(): any;

    getConfigParameter(key: string, defaultValue?: string): string;  // makes lookup in table config and in lang

    update(datasetDescription: responses.IDatasetDescription, storage: responses.ITables): void;

    getSerial(): any;  // moment.js

    M: (id: string) => IMetric;
    L: (id: string | number) => ILocation;
    P: (id: string) => IPeriod;

    getPeriodInfoByRange(startId: string, endId: string, type?: number): IPeriodInfo;

    getRBF(l: ILocation): { railroad: string, branch: string, facility: string };

    getR(l: ILocation): string;

    getB(l: ILocation): string;

    getF(l: ILocation): string;

    getHomeLocation(): ILocation;

    getRootRailroad(): ILocation;

    getRootBranch(): ILocation;

    getRailroadLocation(r: string): ILocation;

    getBranchLocation(b: string): ILocation;

    getRailroadBranchLocation(r: string, b: string): ILocation;

    getBranchRailroadLocation(b: string, r: string): ILocation;
}


export interface IKoobDimension {
    id: string;
    source_ident?: string;
    cube_name?: string;
    name?: string;
    title: string;
    type: string | 'STRING';
    values?: any[];
    members?: any;
    config?: any;
    min?: number;
    max?: number;
    sql: string;
    key?: string;
}

export interface IKoobMeasure {
    id: string;                                                                                       // id для measure, например, x
    formula: string;                                                                                  // формула, например, sum(x) или count(z):x
    source_ident?: string;
    cube_name?: string;
    name?: string;
    title: string;
    format?: string;
    members?: any;
    type: string | 'SUM';                                                                             // SUM, COUNT, AVG, FN
    min?: number;
    max?: number;
    sql: string;
    key?: string;
}

interface IMetricsHelper {

}

interface IPeriodsHelper {
    addPeriods(ps: tables.IPeriodsItem[]): void;

    getDefaultPeriodType(): number;

    getPeriodsByTypeId(periodTypeId: number): IPeriod[];

    getAvailablePeriodTypes(): number[];

    isFirst(p: IPeriod): boolean;

    isLast(p: IPeriod): boolean;

    getPeriodsByDatesAndType(from, to, periodType: number): IPeriod[];
}

interface ILocationsHelper {
    tagAxes: { [axisId: string]: IAxis<any> };
}
export interface IDashletsHelper {
    dashboards: IDashboard[];
    dashboardTopics: tables.IDashboardTopic[];

    getDashboard(id: string): IDashboard;

    getDash(id: string): IDashlet;

    getDashes(): IDashlet[];
}

export interface IConfigHelper {
    hasValue(key: string): boolean;

    getValue(key: string, defaultValue?: string): string;

    getStringValue(key: string, defaultValue?: string): string;

    getIntValue(key: string, defaultValue?: number): number;

    getFloatValue(key: string, defaultValue?: number): number;

    getBoolValue(key: string, defaultValue?: any): boolean;

    getEnumValue(key: string, values: string[], defaultValue?: string): string;

    getStringArray(key: string, defaultValue?: string[]): string[];

    getIntArray(key: string, defaultValue?: number[]): number[];

    getEnterUrl(datasetKey: string): IUrl;
}

export interface ITitleResolver {
    getTitle(e: IEntity, v?: number, index?: number): string;
}

interface IOptionsProvider {
    getOption(optionId: string, defaultValue?: boolean): boolean | undefined;     // undefined if default not set
    hasOption(optionId: string): boolean;                                         // true or false
    getOptionCount(optionId: string): number;

    setOption(optionId: string, value: boolean): void;                            // deprecated
    // TODO: return new options object
    addOption(optionId: string): boolean;

    removeOption(optionId: string): boolean;                                      // true, if found option
}


/**
 type IVizelConfig
 */

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

export interface IVizelConfig extends IColorResolver, ITitleResolver, IOptionsProvider, IStoplightsProvider {

    _raw: any;

    dataset: IDatasetModel;

    getDataset(): IDatasetModel;

    getProperty(key): any;

    setProperty(key: string, value: any): void;

    getLegendItem(e: IEntity, idx?: number): tables.ILegendItem;

    serialize(): tables.IRawVizelConfig;

    clone(): IVizelConfig;

    getDisplay(vizelType?: string): IVizelConfigDisplay;

    getRange(): IRange;

    disableRange(): void;

    getUrl(): string;

    dataSource?: tables.IDataSource;

    getVizelType(): string;

    setVizelType(vizelType: string): void;

    setTitle(title: string): void;

    getSubspacePtr(): ISubspacePtr;

    controller: IVizelController;
    // drilldown?: (event:any, z:IEntity, y:IEntity, x:IEntity)=>void;

    // TODO: move to methods: setters/getters
    title?: string;
    description?: string;
    legend?: { [id: string]: tables.ILegendItem; };
    badValueColor?: string;
    goodValueColor?: string;
    normsMainColor?: string;
    onClickDataPoint?: string | any;
    onClick?: string | any;                   // TODO: describe IUrl type
    cardId?: string;
    externalUrl?: IUrl;
    dashboardId?: string;
    dashId?: string;
    normStrategy?: string;
    context?: any;

    titleContext?: string[];
    colorResolver?: IColorResolver;
    titleResolver?: ITitleResolver;

    // deprecated
    chartStyle: string;
    showLegend: boolean;

    getRaw(): tables.IRawVizelConfig;
}

/**
 type IMetric
 */

interface IMetric extends IEntity, ITaggedEntity {
    id: string;
    parent_id: string;
    unit_id: number;
    srt: number;
    tree_level: number;
    title: string;
    is_text_val: number; // 0|1
    config: any;
    is_hidden: number;
    // additional
    parent: IMetric;
    unit: IUnit;
    children: IMetric[];
    is_formula?: boolean;

    getTagIdByGroupId(tagGroupName: string): string;
}

/**
 type ILocation
 */

interface ILocation extends IEntity, ITaggedEntity {
    config: any;
    is_hidden: number;
    is_point: number;
    latitude: number;
    longitude: number;
    tree_level: number;
    loc_id: number;
    parent_id: string;
    title: string;
    srt?: number;
    src_id: string;
    branch?: string;
    railroad: string;

    // additional
    spatials: ISpatial[];
    children: ILocation[];
    parent: ILocation;
    card: ILocationCard;
    id: string;

    // TODO: move to global namespace
    getAltTitle(titleType: string): string;

    getTagIdByGroupId(tagGroupName: string): string;

    is_formula?: boolean;
    is_aggregator?: boolean;

    // additional
    tagRailroad: string;
    tagBranch: string;
    tagFacility: string;
}

/**
 type IPeriod
 */

interface IPeriod extends IEntity, ITaggedEntity {
    id: string;
    title: string;
    color: string;

    config: any;
    period_id: string;
    period_type: number;
    start: string;

    startDate: any;           // moment.js
    middleDate: any;           // moment.js
    endDate: any;                // moment.js
    orderBy: Date;
    date: Date;
    children: IPeriod[];
    parent: IPeriod;

    root: IPeriod;
    axisId: string;

    year: number;
    quarter: number;                                                                                  // 1..4
    month: number;                                                                                    // 1..12
    week: number;                                                                                     // 1..
    day: number;                                                                                     // 1..

    getTagByGroupId(tagGroupName: string): any;

    getTags(): any[];

    addTag(tag: any): this;

    getParent(): IPeriod;

    update(p: IPeriodsItem);

    valueOf(): number;
}

/**
 type ISubspace
 */

export interface ISubspace {
    koob?: string;
    filters?: any;
    axesOrder: any;

    ms: IMetric[];
    ls: ILocation[];
    ps: IPeriod[];
    //
    xs: IEntity[];
    ys: IEntity[];
    zs: IEntity[];
    aas?: IEntity[];
    abs?: IEntity[];

    dimensions?: any[];
    measures?: any[];

    getZ(idx: number): IEntity;

    getY(idx: number): IEntity;

    getX(idx: number): IEntity;

    getMLP(z: IEntity, y: IEntity, x: IEntity): any;

    reduce(nx: number, ny: number, nz: number): ISubspace;

    isEmpty(): boolean;

    splitByZ?(): ISubspace[];

    splitByY?(): ISubspace[];

    splitByX?(): ISubspace[];

    getZYXIndexesByMLPIds(mid: string, lid: string, pid: string): [number, number, number];

    projectData(mlpCube: any): IValue[][][];

    getArity(): number;

    getRawConfig(): any;

    toString(): string;
}

interface IUnit extends IEntity {
    id: number;
    config: any;
    unit_id: number;
    title: string;
    axis_title: string;
    tiny_title: string;
    value_prefix: string;
    value_suffix: string;

    isInteger(): boolean;
}

interface IPreset {
    id: string;
    preset_id: number;
    title: string;
    can_be_pie: number;

    // additional
    parameters: IMetric[];
    metrics: IMetric[];

    getDimensions(): IUnit[];
}

export interface IAxesOrder extends Array<string> {
    xs?: string;
    ys?: string;
    zs?: string;
    aas?: string;
    abs?: string;
    // etc...
}

interface IMapFill {
    enabled: boolean;
    locations?: ILocation[];
    metric?: IMetric;
}

interface IGeo {
    lat?: number;
    lng?: number;
    zoom?: number;
}

export interface IDashlet extends IEntity {
    id: string;
    title: string;
    layout: string;           // V|H|''
    children: IDashlet[];

    getDataset(): IDatasetModel;

    getDashboard(): IDashboard;

    getFrame(): tables.IConfigFrame;

    getDescription(): string;

    getStateColor(): any;

    getRawVizelConfig(): tables.IRawVizelConfig;

    isContainer(): boolean;

    isRoot(): boolean;

    // TODO: remove
    legend: any;
}

export interface IDashboard extends IEntity {
    id: string;
    title: string;
    topic_id: number;
    stateColor: any;

    getRootDashes(): IDashlet[];

    getDashes(): IDashlet[];
}

interface IPeriodInfo {
    type: number;
    startId: string;
    endId: string;
    start: IPeriod;
    end: IPeriod;
    startDate: any; //moment.js
    endDate: any; //moment.js
    periods: IPeriod[];
}

export interface IVizelConfigAxis {
    title?: string;
    width?: number;
}

export interface IColorPair {
    color: string | null;
    bgColor: string | null;
}

export interface IAggregate {
    avgval: number;
    maxval: number;
    minval: number;
}

export interface IMLPSubspace {
    ms: IMetric[];
    ls: ILocation[];
    ps: IPeriod[];
}

export interface INormsResponse extends IColorResolver {
    getZones(): INormZone[];

    getColor(e: IEntity, v: IValue): string;

    getBgColor(e: IEntity, v: IValue): string;

    getColorPair(e: IEntity, v: IValue): IColorPair;

    getTitle(e: IEntity, v: IValue): string;
}

export interface INormZone extends IColorPair {
    readonly id: string;
    readonly normTitle: string;
    readonly title: string;                                                                           // zone title
    readonly color: string;
    readonly bgColor: string;
    readonly hasInf: boolean;
    readonly hasSup: boolean;
    readonly infTitle: string;
    readonly supTitle: string;
    readonly infColor: string;                                                                        // border color
    readonly supColor: string;

    // metric: IMetric;

    hasValue(v: IValue, e?: IEntity): boolean;

    getInfData(): number[];

    getSupData(): number[];

    fake?: boolean;
}

interface IVizelController {
    handleExpandFullScreen?: () => any;
    handleChartClick?: (event, subspace) => any;
    handleClose?: (z: IEntity) => any;
    handleVCPClick?: (event, vcpv: IVCPV, context?: any) => any;
    handleXClick?: (event, e: IEntity, context?: any) => any;
    setChartClickAction?: (action: any) => any;

    setAxes?(subspace: ISubspace): Promise<any>;
}
interface IAxis<E extends IEntity> {
    axisId: string;
    entities: E[];
}


interface IMLP {
    m: IMetric;
    l: ILocation;
    p: IPeriod;
}

interface IVCP extends IMLP {
    x: IEntity;
    y?: IEntity;
    z?: IEntity;
    aa?: IEntity;
    ab?: IEntity;
    ac?: IEntity;
}

interface IVCPV extends IVCP {
    v: IValue;
}

export interface IDashConfig extends IRawVizelConfig {
    topBar?: object;
    frame?: IConfigFrame;
    stateColor?: string;
}

interface ISubspacePtr {
    koob?: string;
    dataSource: tables.IDataSource;
    metricsDrilldown: number;
    locationsDrilldown: number;

    isTagged(): boolean;

    getAxisEntityIds(axisName: string): string | string[];

    getAxesOrder(): string[];

    getMIds(): string[];

    getLIds(): string[];

    getPIds(): string[] | { start?: string; end?: string; type?: number; qty?: number };

    getPType(): string;
}
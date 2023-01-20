import {
    IAxesOrder, IDashboard, IDashlet,
    IDatasetModel, IGeo,
    IKoobDimension,
    IKoobMeasure,
    ILocation,
    IMapFill,
    IMetric,
    IPeriod, IPeriodInfo,
    IPreset
} from "./defs/bi";
import {BaseService} from "./defs/BaseService";
import {IUrl} from "./core";
import {IDisposable} from "./defs/Observable";

export interface IDatasetServiceModel {
    loading: boolean;
    error: string;
    dataset: IDatasetModel;
}

export interface IDataSource {
    koob: string;
    measures: string[];
    dimensions: string[];
    filters: { [key: string]: string[] }
}

export interface IKoobModel {
    loading?: boolean;
    error?: string;
    dimensions: { id: string, formula?: string }[];
    measures: { formula: string }[];
    values: any[];
    sort?: string[];
    subtotals?: string[];
}

export interface IDsState {
    loading?: boolean;
    error?: string;
    //
    autoscale: boolean;
    chartType: string;
    dash: IDashlet;
    dboard: IDashboard;
    geo: IGeo;
    locations: ILocation[];
    formulaLocations: ILocation[];
    axesOrder: IAxesOrder;
    mapfill: IMapFill;
    metrics: IMetric[];
    periodInfo: IPeriodInfo;
    periods: IPeriod[];
    preset: IPreset;
    route: string;
    mapMetricsPanelVisible: boolean;
    datasetTitle: string;
    datasetDescriptionHTML: string;
    dataset: IDatasetModel;
}

export declare class DatasetService extends BaseService<IDatasetServiceModel> {
    private readonly _datasetId: string | number;

    public constructor(datasetId: string | number)

    public static create(id: string | number): DatasetService;

    public static createInstance(id: string | number): DatasetService;
}

export declare class DataService extends BaseService<any> {
    public constructor(dataSource: IDataSource, appContext: any)
}

export declare class CurrentDsStateService extends BaseService<IDsState> {
    public static getModel(): IDsState;

    public static subscribeUpdatesAndNotify(listener: (model: IDsState) => void): IDisposable;

    public static unsubscribe(listener: (...args: any[]) => any): boolean;

}

export declare class DsStateService extends BaseService<IDsState> {
    public static createInstance(id: string | number): DsStateService

    public getMaxParametersNumber(): number;

    public getMaxLocationsNumber(): number;

    public _getPreset(dataset: IDatasetModel, url: IUrl): IPreset;

    public _getMetrics(dataset: IDatasetModel, url: IUrl): IMetric[];

    public getDataset(): IDatasetModel

    public setFormulaLocations(locations: ILocation[], skipCheck?: boolean): void;

    public setMetrics(metrics: IMetric[], skipCheck?: boolean): void;

    public setAxesOrder(axesOrder: IAxesOrder): void

    public setPeriods(start: IPeriod, end: IPeriod, pt: number)

    public setGeo(newGeo: IGeo): void;

    public setPreset(preset: IPreset): void

    public setDboard(db): void

    public setDash(dash): void

    public setChartType(chartType: string): void

    public setMapfill(mapfill: IMapFill): void

    public setAutoscale(value): void

    public setMapMetricsPanelVisible(mapMetricsPanelVisible: boolean): void

    public removeFormulaLocation(location: ILocation): void

    public _removeFormulaLocation(location: ILocation): void

    public removeMetric(metric: IMetric): void;

    public toggleFormulaLocation(location: ILocation): void;

    public toggleParameter(metric: IMetric): void;

    public isActive(): boolean

    public goToPlots(extra?: any): void


}

export declare class KoobService extends BaseService<IKoobModel> {
    public readonly id: number | string;
    public readonly _detailedEntities: { [entityId: string]: string[] | null };
    public static _koobServices: { [id: string]: KoobService };

    public static createInstance(id: string | number): KoobService;

    public loadEntityDetails(entityId: string): Promise<void>;
}

export declare class KoobDataService extends BaseService<IKoobModel> {
    public constructor(koobId: string,
                       dimensions: { id: string, formula?: string }[],
                       measures: { formula: string }[],
                       filters: any,
                       loadBy?: number,
                       sort?: any,
                       subtotals?: string[]);

    public loadItem(n: number): void;

    public setSort(sort: string | null): void;

    public setFilter(filters: any): void;

    // axios cancel
    public abort(): void;
}


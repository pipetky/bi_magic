import React from "react";
import './Calendar.scss';
import { CalendarProps } from "./Calendar.types";
interface ICalendarState {
    selectedYear: number;
    selectedMonth: number;
}
declare class Calendar extends React.Component<CalendarProps, ICalendarState> {
    state: ICalendarState;
    constructor(props: CalendarProps);
    private _select;
    private _decYear;
    private _incYear;
    private _decMonth;
    private _incMonth;
    private _onApply;
    private _isSelectable;
    render(): JSX.Element;
}
export default Calendar;

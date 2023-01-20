interface IconColoredCheckboxProps {
    className?: string;
    value?: boolean;
    color?: string;
    bgColor?: string;
    style?: any;
    onPress?: () => any;
}
export declare const IconColoredCheckbox: ({ className, value, color, bgColor, style, onPress }: IconColoredCheckboxProps) => JSX.Element;
export declare function getMouseCoordsFromEvent(evt: any): {
    x: number;
    y: number;
};
export declare const measureElement: (element: any) => {
    height: number;
    width: number;
};
export {};

import React = require("../defs/react");


interface IVirtualListProps {
    className?: string;
    items: {length: number};                                                                          // array-like
    renderItem: (item: any, idx: number) => any;
    defaultsize?: number;
}

export class VirtualList extends React.Component<IVirtualListProps> {
    public constructor(props: IVirtualListProps)
}


export default VirtualList;

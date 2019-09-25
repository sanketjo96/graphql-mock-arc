import * as React from 'react';
import { WijmoTable } from './WijmoTable';

export interface WijmoTableContainerProps {

}

export interface WijmoTableContainerState {

}

export const cols: Array<any> = [
    {
        header: "",
        binding: "name",
        width: 350,
        isReadOnly: true
    },
    {
        header: "RM CLUSTER",
        binding: "rmcluster",
        isReadOnly: true
    },
    {
        header: "CM CLUSTER",
        binding: "cmcluster",
        isReadOnly: true
    },
    {
        header: "ZONE",
        binding: "zone",
        isReadOnly: true
    },
    {
        header: "AVG WK SALES",
        binding: "avgweeksale",
        allowResizing: true
    },
    {
        header: "AVERAGE DEPTH",
        binding: "avgdepth",
        allowResizing: true
    },
    {
        header: "BET QTY",
        binding: "bateqty",
        allowResizing: true
    }
];



class WijmoTableContainer extends React.Component<WijmoTableContainerProps, WijmoTableContainerState> {
    render() {
        return (
            <WijmoTable cols={cols} />
        );
    }
}

export default WijmoTableContainer;
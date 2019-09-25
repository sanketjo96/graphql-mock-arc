import * as React from 'react';
import { IColConfig } from '../data/data';
import ListView from './Table';

export interface TableContainerProps {

}

export interface TableContainerState {

}

export const colsconfig: Array<IColConfig> = [
    {
        header: "NAME",
        field: "name",
        expand: true,
        frozen: true,
        width: '250px',
        class: 'fixed-col'
    },
    {
        header: "RM CLUSTER",
        field: "rmcluster",
        width: '250px',
        frozen: true
    },
    {
        header: "CM CLUSTER",
        field: "cmcluster",
        width: '250px',
    },
    {
        header: "ZONE",
        field: "zone"
    },
    {
        header: "AVG WK SALES",
        field: "avgweeksale",
        edit: true,
        resize: true
    },
    {
        header: "AVERAGE DEPTH",
        field: "avgdepth",
        edit: true,
        resize: true
    },
    {
        header: "BET QTY",
        field: "bateqty",
        edit: true,
        resize: true
    }
];



class TableContainer extends React.Component<TableContainerProps, TableContainerState> {
    render() {
        return (
            <div className={'test'}>
                <ListView config={colsconfig} />
            </div>

        );
    }
}

export default TableContainer;
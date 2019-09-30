import * as React from 'react';
import WijmoTable from './WijmoTable';
import { hierarchyVariable } from '../graphql/variables';
import { useProductHierarchy } from '../hooks/hooks';
import { FlexGrid } from '@grapecity/wijmo.grid';
import * as wjcCore from "@grapecity/wijmo";
import ColToggler from './ColToggler';
import './Wijmo.css';

export const cols: Array<any> = [
    {
        header: "  ",
        binding: "name",
        width: 350,
        cssClass: 'frozen',
        isReadOnly: true
    },
    {
        header: "RM Cluster",
        binding: "rmcluster",
        cssClass: 'frozen',
        width: 150,
        isReadOnly: true
    },
    {
        header: "Average Depth",
        binding: "averageDepth",
        isReadOnly: false,
        width: 100,
        allowResizing: true
    },
    {
        header: "Mix Quantity",
        binding: "mixQuantity",
        isReadOnly: true,
        allowResizing: true
    },
    {
        header: "Mix Value",
        binding: "mixValue",
        isReadOnly: true,
        allowResizing: true
    },
    {
        header: "Sales Qty",
        binding: "salesQty",
        allowResizing: true
    },
    {
        header: "sku Efficiency",
        binding: "skuEfficiency",
        allowResizing: true
    },
    {
        header: "Total Products",
        binding: "totalProducts",
        allowResizing: true
    },
    {
        header: "Total Quantity",
        binding: "totalQuantity",
        allowResizing: true
    },
    {
        header: "Total Stores",
        binding: "totalStores",
        allowResizing: true
    },
    {
        header: "Total Value",
        binding: "totalValue",
        allowResizing: true
    }
];

const WijmoTableContainer = () => {
    let columnPicker: any;
    const [data, loading] = useProductHierarchy({
        variables: hierarchyVariable
    });

    if (!data.length) return <div>Loading</div>;

    const initializedPicker = (picker: any) => {
        columnPicker = picker;
    }

    const initialGrid = (flexgrid: FlexGrid) => {
        if (flexgrid && columnPicker) {
            columnPicker.itemsSource = flexgrid.columns.filter((col: any) => col.binding !== 'name');
            columnPicker.checkedMemberPath = 'visible';
            columnPicker.displayMemberPath = 'header';
            columnPicker.lostFocus.addHandler(() => {
                wjcCore.hidePopup(columnPicker.hostElement);
            });
        }
    }

    const toggle = (e: any) => {
        wjcCore.showPopup(columnPicker.hostElement, e.target, false, true, false);
        columnPicker.focus();
        e.preventDefault();
    }

    return (
        <div className="container-fluid">
            <ColToggler
                initListBox={initializedPicker}
                toggle={toggle}
            >
            </ColToggler>

            <WijmoTable
                cols={cols}
                data={data}
                initialGrid={initialGrid}
            />
        </div>
    );
}
export default WijmoTableContainer;
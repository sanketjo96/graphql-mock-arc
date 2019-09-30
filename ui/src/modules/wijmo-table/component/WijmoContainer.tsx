import * as React from 'react';
import WijmoTable from './WijmoTable';
import { hierarchyVariable } from '../graphql/variables';
import { useProductHierarchy } from '../hooks/hooks';

export const cols: Array<any> = [
    {
        header: "  ",
        binding: "name",
        width: 350,
        isReadOnly: true
    },
    {
        header: "RM Cluster",
        binding: "rmcluster",
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
    const [data, loading] = useProductHierarchy({
        variables: hierarchyVariable
    });

    if (!data.length) return <div>Loading</div>;

    return (
        <WijmoTable
            cols={cols}
            data={data}
        />
    );
}
export default WijmoTableContainer;
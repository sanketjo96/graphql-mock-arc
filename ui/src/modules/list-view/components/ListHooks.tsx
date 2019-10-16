import * as React from 'react';
import { ListSubheader, Typography } from '@material-ui/core';
import ListRow from './Row';
import { useQuery } from '@apollo/react-hooks';
import { GET_COLLECTION } from '../../wijmo-table/graphql/collection';
import { products } from '../../wijmo-table/graphql/variables';
const uuidv4 = require('uuid/v4');

export interface RowProps {
    data: Array<any>
    index: number,
    style: any
};
export const cols: Array<any> = [
    {
        header: "Category",
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

export const Item: React.SFC<RowProps> = ({ data, index, style }) => {
    const item = data[index];

    products.where.product.AND[0].attributes_some.strVal = item.category.name;
    products.where.product.AND[1].attributes_some.strVal = item.children1.name;
    products.where.product.AND[2].attributes_some.strVal = item.children2.name;
    const { loading, error, data: collection } = useQuery(GET_COLLECTION, {
        variables: products
    });

    //console.log(collection);
    if (collection) {
        item.products = collection.buyingSessionProductsConnection.edges;
    } else {
        item.products = new Array(item.totalProducts).fill(true);
    }

    return (
        <div key={index} style={style}>
            <ListSubheader disableGutters style={{ backgroundColor: 'white' }}>
                <div>
                    <ListRow type="head"></ListRow>
                    <ListRow item={item.category} type="category"></ListRow>
                    <ListRow item={item.children1} type="category"></ListRow>
                    <ListRow item={item.children2} type="category"></ListRow>
                </div>
            </ListSubheader>
            {
                (collection && collection.buyingSessionProductsConnection)
                    ? (
                        item.products.map((edge: any) => {
                            // console.log(edge.node.product)
                            return <ListRow key={uuidv4()} item={edge.node.product}></ListRow>
                        })

                    )
                    : (
                        item.products.map(() => {
                            return <ListRow key={uuidv4()}></ListRow>
                        })
                    )
            }
        </div>
    );
}
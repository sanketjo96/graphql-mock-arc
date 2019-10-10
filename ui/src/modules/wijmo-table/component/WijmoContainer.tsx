/* eslint-disable react-hooks/rules-of-hooks */

import * as React from 'react';
import WijmoTable from './WijmoTable';
import './Wijmo.css';
import { products } from '../graphql/variables';
import { GET_COLLECTION } from '../graphql/collection';
import { useLazyQuery } from '@apollo/react-hooks';
import { useObserver } from 'mobx-react-lite';
import { TreeGridStore, TreeStore } from '../store/store';
import { toJS } from 'mobx';

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
    return useObserver(() => {
        const store: TreeGridStore = TreeStore;
        const [getProducts, { loading, data: productsData }] = useLazyQuery(GET_COLLECTION);

        console.log(store.selectedItem);
        console.log(store.stickyRows);
        console.log(store.skipChunk);
        console.log(toJS(store.gridData));
        React.useEffect(() => {
            if (store.stickyRows.length) {
                products.skip = store.skipChunk;
                for (let i = 0; i < store.stickyRows.length; i++) {
                    products.where.product.AND[i].attributes_some.strVal = store.stickyRows[i].name;
                }

                getProducts({
                    variables: products
                });
            }

        }, [store.selectedItem, store.skipChunk]);


        React.useEffect(() => {
            if (productsData
                && productsData.buyingSessionProductsConnection.edges
                && productsData.buyingSessionProductsConnection.edges.length
            ) {
                store.hasNextPage = productsData.buyingSessionProductsConnection.pageInfo.hasNextPage;
                store.setGridData(productsData.buyingSessionProductsConnection.edges.map((edge: any) => {
                    return edge.node.product;
                }));
            }
        }, [productsData])


        if(loading) {
            store.isProgressing = true;
        } else {
            store.isProgressing = false;
        }

        return (
            <div>
                <div className="list-view-grid">
                    {
                        (store.gridData.length)
                        ? (
                                <WijmoTable
                                    freezeRows={store.stickyRows.length}
                                    cols={cols}
                                    data={store.gridData}
                                />
                        ) : ''
                    }
                </div>
            </div>
        );
    });
}
export default WijmoTableContainer;
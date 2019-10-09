/* eslint-disable react-hooks/rules-of-hooks */

import * as React from 'react';
import WijmoTable from './WijmoTable';
import { FlexGrid } from '@grapecity/wijmo.grid';
import * as wjcCore from "@grapecity/wijmo";
import ColToggler from './ColToggler';
import './Wijmo.css';
import LinearIndeterminate from '../../../components/Progress';
import KPIsNavigator from '../../KPINav/components/KPINav';
import { products } from '../graphql/variables';
import { GET_COLLECTION } from '../graphql/collection';
import { useLazyQuery } from '@apollo/react-hooks';
import { useObserver } from 'mobx-react-lite';
import { TreeGridStore, TreeStore } from '../store/store';

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

        React.useEffect(() => {
            for (let i = 0; i < store.stickRows.length; i++) {
                products.where.product.AND[i].attributes_some.strVal = store.stickRows[i].name;
            }

            products.skip = store.skipChunk;

            getProducts({
                variables: products
            });

        }, [store.stickRows, store.skipChunk]);

        React.useEffect(() => {
            if (productsData
                && productsData.buyingSessionProductsConnection.edges
                && productsData.buyingSessionProductsConnection.edges.length
            ) {
                store.hasNextPage = productsData.buyingSessionProductsConnection.pageInfo.hasNextPage;
                store.setGridData(productsData.buyingSessionProductsConnection.edges.map((edge: any) => {
                    return edge.node.product;
                }));
                store.clearProgress();
            }
        }, [productsData]);

        const initializedPicker = (picker: any) => {
            store.columnPicker = picker;
        }

        const initialGrid = (flexgrid: FlexGrid) => {
            store.grid = flexgrid;
            if (store.grid && store.columnPicker) {
                store.columnPicker.itemsSource = store.grid.columns.filter((col: any) => col.binding !== 'name');
                store.columnPicker.checkedMemberPath = 'visible';
                store.columnPicker.displayMemberPath = 'header';
                store.columnPicker.lostFocus.addHandler(() => {
                    wjcCore.hidePopup(store.columnPicker.hostElement);
                });
            }
        }

        const toggle = (e: any) => {
            wjcCore.showPopup(store.columnPicker.hostElement, e.target, false, true, false);
            store.columnPicker.focus();
            e.preventDefault();
        }


        if (loading) {
            store.setProgress();
        }

        return (
            <div className="container-fluid">
                <LinearIndeterminate></LinearIndeterminate>
                <div className="list-view-parent">
                    <div className="list-view-grid">
                        {
                            store.gridData.length
                            ? (
                                <div>
                                    <ColToggler
                                        initListBox={initializedPicker}
                                        toggle={toggle}
                                    >
                                    </ColToggler>
                                    <WijmoTable
                                        freezeRows={store.stickRows.length}
                                        cols={cols}
                                        data={store.gridData}
                                        initialGrid={initialGrid}
                                    />
                                </div>

                            ) : ''
                        }
                    </div>
                    <div className="list-view-nav">
                        <KPIsNavigator></KPIsNavigator>
                    </div>
                </div>

            </div>
        );
    });
}
export default WijmoTableContainer;
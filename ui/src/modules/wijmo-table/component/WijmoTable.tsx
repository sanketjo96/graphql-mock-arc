import * as React from 'react';
import * as wjcCore from "@grapecity/wijmo";
import { FlexGrid, FormatItemEventArgs } from '@grapecity/wijmo.grid';
import { FlexGrid as WijmoGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';

import RecipeReviewCard from '../../../components/ProductCard';
import { products, updateProduct } from '../graphql/variables';
import { useApolloClient } from '@apollo/react-hooks';
import { GET_COLLECTION } from '../graphql/collection';
import { UPDATE_PRODUCT } from '../graphql/updateProduct';
import { renderReactIntoGridCell } from './wijmoHelper';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.styles/themes/wijmo.theme.material.css';
import {toast } from 'react-toastify';

const uuidv4 = require('uuid/v4');

export interface WijmoTableProps {
    data: Array<any>
    cols: Array<any>
    initialGrid: Function
}

const getPathToRow = (grid: FlexGrid, currentRow: any, rowIndex: number, childLevel: number): Array<string> => {
    const pathToClickedRow = [];
    while (currentRow && currentRow.level >= 0) {
        if (currentRow.level < childLevel) {
            pathToClickedRow.unshift(currentRow.dataItem.name);
            childLevel = currentRow.level;
        }
        currentRow = grid.rows[--rowIndex];
    }
    return pathToClickedRow;
}

const WijmoTable: React.SFC<WijmoTableProps> = (props) => {
    const nodeDicts = new Map<String, HTMLElement>();
    const client = useApolloClient();

    /**
     * Tiggres on grid initiualization
     * @param flexgrid 
     */
    const initialGrid = (flexgrid: FlexGrid) => {
        let divs = document.getElementsByTagName('div');
        divs[divs.length - 1].remove();
        flexgrid.collapseGroupsToLevel(1);
        props.initialGrid(flexgrid);
    }

    /**
     * Triggers on every row expand
     * @param flexgrid - Grid referance
     * @param e - Ref to cliked row event
     */
    const onGroupCollapsedChanged = async (flexgrid: FlexGrid, e: FormatItemEventArgs) => {
        const rowObj = flexgrid.rows[e.row];
        const item = rowObj.dataItem;

        // Can't lazy load while updating rows
        if (flexgrid.rows.isUpdating) {
            rowObj.isCollapsed = true;
            return;
        }

        // Did we just expand a node with a dummy child?
        if (
            !rowObj.isCollapsed
            && item.children.length
            && item.children[0].leaf
        ) {

            let rowIndex = e.row;
            let currentRow = flexgrid.rows[rowIndex];
            let childLevel = currentRow.level + 1;
            let pathToClickedRow = getPathToRow(flexgrid, currentRow, rowIndex, childLevel);
        
            // Fetch the product data
            products.where.product.AND[0].attributes_some.strVal = pathToClickedRow[0];
            products.where.product.AND[1].attributes_some.strVal = pathToClickedRow[1];
            products.where.product.AND[2].attributes_some.strVal = pathToClickedRow[2];
            const data = await client.query({
                query: GET_COLLECTION,
                variables: products
            });

            // Attach the fetched product to appropriate parent.
            if (data) {
                item.children.length = 0;
                const newProduct = [{
                    type: 'product',
                    ...data.data.buyingSessionProductsConnection.edges[0].node.product
                }]
                item.children = newProduct;
                flexgrid.collectionView.refresh();
            }
        }
    }

    /**
     * Triggers on cell editting
     * @param grid 
     * @param e 
     */
    const cellEditEnding = async (grid: FlexGrid, e: FormatItemEventArgs) => {
        const oldVal = grid.getCellData(e.row, e.col, false);
        const newVal = grid.activeEditor.value;
        try {
            const data = await client.mutate({
                mutation: UPDATE_PRODUCT,
                variables: updateProduct
            });
            if (data) {
                grid.setCellData(e.row, e.col, newVal);
                toast.success("Updates are successful!!")
            }
        } catch (e) {
            grid.setCellData(e.row, e.col, oldVal);
            toast.success("Updates are Failed!!")
        }
    }

    /**
     * Triggers on almost every change in grid
     * @param grid 
     * @param e 
     */
    const formatItem = (grid: FlexGrid, e: FormatItemEventArgs) => {
        const { row, col } = e;
        const binding = grid.columns[e.col].binding;
        const item = grid.rows[e.row].dataItem;
        
        // Add product card if we are expanding
        // this is the leaf row/node
        if (
            item
            && item.type
            && binding === 'name'
            && item.type.__typename === 'ProductType'
        ) {
            grid.rows[e.row].height = 420;
            grid.rows[e.row].isReadOnly = false;
            wjcCore.addClass(e.cell, 'product-cell');
            renderReactIntoGridCell(
                e.cell,
                `${binding}-${row}-${col}`,
                <RecipeReviewCard item={item} />,
                nodeDicts
            )
        }
    }

    let dynamicColumns = props.cols.map((col: any, i: number) => {
        return <FlexGridColumn
            key={uuidv4()}
            cssClass={col.cssClass}
            isReadOnly={!!col.isReadOnly}
            allowDragging={false}
            allowResizing={!!col.allowResizing}
            width={col.width && col.width}
            minWidth={col.minWidth}
            maxWidth={col.maxWidth && col.maxWidth}
            header={col.header}
            binding={col.binding}
        />;
    });

    return (
        <WijmoGrid
            selectionMode='Row'
            stickyHeaders={true}
            frozenColumns={2}
            itemsSource={props.data}
            headersVisibility="Column"
            columns={props.cols}
            groupCollapsedChanged={onGroupCollapsedChanged}
            initialized={initialGrid}
            childItemsPath="children"
            formatItem={formatItem}
            cellEditEnding={cellEditEnding}
        >
            {dynamicColumns}
        </WijmoGrid>
    );
}

export default WijmoTable;

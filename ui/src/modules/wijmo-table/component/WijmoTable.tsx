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
import './Wijmo.css';
import ColToggler from './ColToggler';

const CHILDDEPTH = 3;
const uuidv4 = require('uuid/v4');

export interface WijmoTableProps {
    data: Array<any>
    cols: Array<any>
}

const WijmoTable: React.SFC<WijmoTableProps> = (props) => {
    const nodeDicts = new Map<String, HTMLElement>();
    const client = useApolloClient();
    let columnPicker: any;

    const initialGrid = (flexgrid: FlexGrid) => {
        let divs = document.getElementsByTagName('div');
        divs[divs.length - 1].remove();
        flexgrid.collapseGroupsToLevel(0);
        if (flexgrid && columnPicker) {
            columnPicker.itemsSource = flexgrid.columns.filter((col: any) => col.binding !== 'name');
            columnPicker.checkedMemberPath = 'visible';
            columnPicker.displayMemberPath = 'header';
            columnPicker.lostFocus.addHandler(() => {
                wjcCore.hidePopup(columnPicker.hostElement);
            });
        }
    }

    const initializedPicker = (picker: any) => {
        columnPicker = picker;
    }

    const toggle = (e: any) => {
        wjcCore.showPopup(columnPicker.hostElement, e.target, false, true, false);
        columnPicker.focus();
        e.preventDefault();
    }


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
            let childLevel = CHILDDEPTH;
            const pathToClickedRow = [];
            while (currentRow && currentRow.level >= 0) {
                if (currentRow.level < childLevel) {
                    pathToClickedRow.unshift(currentRow.dataItem.name);
                    childLevel = currentRow.level;
                }
                currentRow = flexgrid.rows[--rowIndex];
            }

            products.where.product.AND[0].attributes_some.strVal = pathToClickedRow[0];
            products.where.product.AND[1].attributes_some.strVal = pathToClickedRow[1];
            products.where.product.AND[2].attributes_some.strVal = pathToClickedRow[2];
            const data = await client.query({
                query: GET_COLLECTION,
                variables: products
            });

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

    const cellEditEnding = async (grid: FlexGrid, e: FormatItemEventArgs) => {
        const oldVal = grid.getCellData(e.row, e.col, false);
        const newVal = grid.activeEditor.value;
        try {
            const data = await client.mutate({
                mutation: UPDATE_PRODUCT,
                variables: updateProduct
            });
            if (data) {
                grid.setCellData(e.row, e.col, newVal)
            }
        } catch (e) {
            grid.setCellData(e.row, e.col, oldVal)
        }
    }

    const formatItem = (grid: FlexGrid, e: FormatItemEventArgs) => {
        const { row, col } = e;
        const binding = grid.columns[e.col].binding;
        const item = grid.rows[e.row].dataItem;
        if (
            item
            && binding === 'name'
            && item.type
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
        <div className="container-fluid">
            <ColToggler
                initListBox={initializedPicker}
                toggle={toggle}
            >
            </ColToggler>
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
        </div>
    );
}

export default WijmoTable;

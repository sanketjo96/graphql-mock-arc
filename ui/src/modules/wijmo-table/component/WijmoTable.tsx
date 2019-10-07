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
import { toast } from 'react-toastify';
import { TreeGridStore, TreeStore } from '../store/store';

const uuidv4 = require('uuid/v4');

export interface WijmoTableProps {
    data: Array<any>
    cols: Array<any>
    initialGrid: Function,
    freezeRows: number
}

const WijmoTable: React.SFC<WijmoTableProps> = (props) => {
    const nodeDicts = new Map<String, HTMLElement>();
    const store: TreeGridStore = TreeStore;
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
     * Triggers on cell editting
     * @param grid 
     * @param e 
     */
    const cellEditEnding = async (grid: FlexGrid, e: FormatItemEventArgs) => {
        const oldVal = grid.getCellData(e.row, e.col, false);
        const newVal = grid.activeEditor.value;
        if (!newVal) return;

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

    const scrollPositionChanged = (grid: FlexGrid, e: FormatItemEventArgs) => {
        // if we're close to the bottom, add 20 items
        if (!store.isProgressing) {
            console.log(`${grid.viewRange.bottomRow} - ${grid.rows.length}`);
            if (grid.viewRange.bottomRow >= grid.rows.length - 1) {
                // store.appendToGridData();
                store.setNextTreeNode();
            }
        }
    }

    const next = () => {
        store.setNextTreeNode();
    }

    const previous = () => {
        store.setPreviousTreeNode();
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
        <React.Fragment>
            <button onClick={previous}>Previous</button>
            <button onClick={next}>Next</button>
            <WijmoGrid
                selectionMode='Row'
                stickyHeaders={true}
                frozenRows={props.freezeRows}
                frozenColumns={2}
                itemsSource={props.data}
                headersVisibility="Column"
                initialized={initialGrid}
                cellEditEnding={cellEditEnding}
                scrollPositionChanged={scrollPositionChanged}
            >
                {dynamicColumns}
            </WijmoGrid>
        </React.Fragment>

    );
}

export default WijmoTable;

import * as React from 'react';
import { FlexGrid, FormatItemEventArgs } from '@grapecity/wijmo.grid';
import { FlexGrid as WijmoGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.styles/themes/wijmo.theme.material.css';
import { TreeGridStore, TreeStore, IPageMeta } from '../store/store';
import { renderReactIntoGridCell } from './wijmoHelper';
import RecipeReviewCard from '../../../components/ProductCard';

const uuidv4 = require('uuid/v4');

export interface WijmoTableProps {
    data: Array<any>
    cols: Array<any>
    freezeRows: number
}

const nodeDicts = new Map<String, HTMLElement>();
const WijmoTable: React.SFC<WijmoTableProps> = (props) => {
    const store: TreeGridStore = TreeStore;

    /**
     * Tiggres on grid initiualization
     * @param flexgrid 
     */
    const initialGrid = (flexgrid: FlexGrid) => {
        let divs = document.getElementsByTagName('div');
        store.grid = flexgrid;
        divs[divs.length - 1].remove();
        flexgrid.collapseGroupsToLevel(1);
    }

    const scrollPositionChanged = (grid: FlexGrid, e: FormatItemEventArgs) => {
           // if we're close to the bottom, add 20 items
           if (
               store.hasNextPage
               && grid.viewRange.bottomRow >= grid.rows.length - 1
            ) {
            store.hasNextPage = false;
            store.setSkipChunk();
        }
    }

    const formatItem = (grid: any, e: any) => {
        const { row, col } = e;
        const binding = grid.columns[e.col].binding;
        const item = grid.rows[e.row].dataItem;
        if (e.row > 2 && item && binding === 'name') {
            grid.rows[e.row].height = 250;
            grid.rows[e.row].isReadOnly = false;
            const key = `${binding}-${row}-${col}`;
            renderReactIntoGridCell(
                e.cell,
                key,
                <RecipeReviewCard item={item} />,
                nodeDicts
            )
        }
    }
    
    const next = () => {
        if (store.nodeIndex < store.dfs.length) {
            store.setNextTreeNode();
        }
    }

    const previous = () => {
        if (store.nodeIndex <= 3) {
            store.isPreviousPageAvailable = false;
        }
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

    const blinkcss = !store.hasNextPage ? 'blink_me' : '';
    return (
        <div>
            {<a href="#" onClick={previous} className={`previous round`}>&#8249;</a>}
            {<a href="#" onClick={next} className={`next round ${blinkcss}`}>&#8250;</a>}
            <WijmoGrid
                selectionMode='Row'
                stickyHeaders={true}
                formatItem={formatItem}
                frozenRows={props.freezeRows}
                frozenColumns={2}
                itemsSource={props.data}
                headersVisibility="Column"
                initialized={initialGrid}
                scrollPositionChanged={scrollPositionChanged}
            >
                {dynamicColumns}
            </WijmoGrid>
        </div>

    );
}

export default WijmoTable;

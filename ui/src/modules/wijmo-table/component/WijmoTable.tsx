import * as React from 'react';
import { FlexGrid, FormatItemEventArgs } from '@grapecity/wijmo.grid';
import { FlexGrid as WijmoGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import * as wjcCore from '@grapecity/wijmo';

import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.styles/themes/wijmo.theme.material.css';
import { TreeGridStore, TreeStore, IPageMeta } from '../store/store';

const uuidv4 = require('uuid/v4');

export interface WijmoTableProps {
    data: Array<any>
    cols: Array<any>
    initialGrid: Function,
    freezeRows: number
}

const WijmoTable: React.SFC<WijmoTableProps> = (props) => {
    const store: TreeGridStore = TreeStore;


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

    const scrollPositionChanged = (grid: FlexGrid, e: FormatItemEventArgs) => {
        // grid.scrollIntoView(0, -1);
        // if we're close to the bottom, add 20 items
        if (!store.isProgressing) {
            // console.log(`${grid.viewRange.bottomRow} - ${grid.rows.length}`);
            if (grid.viewRange.bottomRow >= grid.rows.length - 1) {
                store.setNextTreeNode();
                setTimeout(() => {
                    grid.scrollPosition = new wjcCore.Point(grid.scrollPosition.x, 0);
                }, 500)
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
                scrollPositionChanged={scrollPositionChanged}
            >
                {dynamicColumns}
            </WijmoGrid>
        </React.Fragment>

    );
}

export default WijmoTable;

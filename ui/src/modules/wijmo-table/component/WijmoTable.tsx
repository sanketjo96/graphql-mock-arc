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
            }
        }
    }

    const next = () => {
        store.isPreviousPageAvailable = true;
        store.setNextTreeNode();
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

    return (
        <div>
            {
                store.isPreviousPageAvailable
                    ? <section id="section03" onClick={previous} className="demo">
                        <a href="#section04">
                            <span></span>
                        </a>
                    </section>
                    : ''
            }
            <section id="section04" onClick={next} className="demo">
                <a href="#section05">
                    <span></span>
                </a>
            </section>
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
        </div>

    );
}

export default WijmoTable;

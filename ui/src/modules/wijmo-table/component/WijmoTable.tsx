import * as React from 'react';
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.styles/themes/wijmo.theme.material.css';
import './Wijmo.css';

import { categories } from '../data/categories';
import { lazyData } from '../data/lazy';
import ColToggler from './ColToggler';
import { renderReactIntoGridCell } from './wijmoHelper';
import RecipeReviewCard from '../../../components/ProductCard';
import { FlexGrid, FormatItemEventArgs } from '@grapecity/wijmo.grid';
import { CollectionView } from '@grapecity/wijmo';
const uuidv4 = require('uuid/v4');

export interface WijmoTableTableProps {
    cols: Array<any>
}

export interface WijmoTableTableState {
    data: CollectionView
}

export class WijmoTable extends React.Component<WijmoTableTableProps, WijmoTableTableState> {
    private grid: any;
    private columnPicker: any;
    private nodeDicts = new Map<String, HTMLElement>();

    constructor(props: WijmoTableTableProps) {
        super(props);
        this.state = {
            data: new wjcCore.CollectionView(categories.tableData)
        };
    }

    componentDidMount() {
        this.grid.collapseGroupsToLevel(0);
        if (this.grid && this.columnPicker) {
            this.columnPicker.itemsSource = this.grid.columns;
            this.columnPicker.checkedMemberPath = 'visible';
            this.columnPicker.displayMemberPath = 'header';
            this.columnPicker.lostFocus.addHandler(() => {
                wjcCore.hidePopup(this.columnPicker.hostElement);
            });
        }
    }

    initialGrid = (grid: FlexGrid) => {
        this.grid = grid;

        this.grid.formatItem.addHandler((grid: any, e: any) => {
            const { row, col } = e;
            const binding = grid.columns[e.col].binding;
            const item = grid.rows[e.row].dataItem;
            if (
                item
                && binding === 'name'
                && item.name
                && item.name.data

            ) {
                grid.rows[e.row].height = 350;
                grid.rows[e.row].isReadOnly = false;
                renderReactIntoGridCell(
                    e.cell,
                    `${binding}-${row}-${col}`,
                    <RecipeReviewCard item={item.name} />,
                    this.nodeDicts
                )
            }
        });
    }

    toggle = (e: any) => {
        wjcCore.showPopup(this.columnPicker.hostElement, e.target, false, true, false);
        this.columnPicker.focus();
        e.preventDefault();
    }

    onGroupCollapsedChanged = (grid: FlexGrid, e: FormatItemEventArgs) => {
        const rowObj = grid.rows[e.row];
        const item = rowObj.dataItem;
        const { row } = e;

        // let rc = this.grid.cells.getCellBoundingRect(row, 0, true);
        // this.grid.scrollPosition = new wjcCore.Point(this.grid.scrollPosition.x, -rc.top);

        // did we just expand a node with a dummy child?
        if (!rowObj.isCollapsed && item.children.length === 1 && item.children[0].lazyData) {
            // can't lazy load while updating rows
            if (grid.rows.isUpdating) {
                rowObj.isCollapsed = true;
                return;
            }

            // DATA FETCHING
            setTimeout(() => {
                // replace the dummy child with actual nodes
                const nextType = item.children[0].type;
                item.children.length = 0;
                item.children = lazyData[nextType];

                // refresh the view
                grid.collectionView.refresh();
                // collapse the new item's child items
                for (let i = rowObj.index + 1; i < grid.rows.length; i++) {
                    let childRow = grid.rows[i];
                    if (childRow.level <= rowObj.level) {
                        break;
                    }
                    childRow.isCollapsed = true;
                }
            }, 500)
        }
    }

    initializedPicker = (picker: any) => {
        this.columnPicker = picker;
    }

    cellEditEnding = (grid: FlexGrid, e: FormatItemEventArgs) => {
        // get old and new values
        const flex = grid;
        const oldVal = flex.getCellData(e.row, e.col, false);
        const newVal = flex.activeEditor.value;
        e.cancel = true;

        setTimeout(() => {
            flex.setCellData(e.row, e.col, newVal)
        }, 1000);
    }

    render() {
        let dynamicColumns = this.props.cols.map((col: any, i: number) => {
            return <wjcGrid.FlexGridColumn
                key={uuidv4()}
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
                    initListBox={this.initializedPicker}
                    toggle={this.toggle}
                >
                </ColToggler>
                <wjcGrid.FlexGrid
                    selectionMode='Row'
                    stickyHeaders={true}
                    frozenColumns={2}
                    itemsSource={this.state.data}
                    headersVisibility="Column"
                    groupCollapsedChanged={this.onGroupCollapsedChanged}
                    initialized={this.initialGrid}
                    childItemsPath="children"
                    cellEditEnding={this.cellEditEnding}
                >
                    {dynamicColumns}
                </wjcGrid.FlexGrid>
            </div>
        )
    }
}


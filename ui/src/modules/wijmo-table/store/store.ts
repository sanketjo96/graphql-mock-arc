import { observable, action } from 'mobx';
import { FlexGrid, FormatItemEventArgs } from '@grapecity/wijmo.grid';
import { products, updateProduct } from '../graphql/variables';
import { GET_COLLECTION } from '../graphql/collection';
import { UPDATE_PRODUCT } from '../graphql/updateProduct';
export * from 'mobx-react';
const CHILDDEPTH = 3;

class TreeGridStore {
    grid: any;
    client: any;
    @observable data: any = [];
    isAnyProductRowSet: boolean = false;
    productQuery: any;
    pathToClickedRow = [];
    latestExpandedLeafItem: any;

    @action initialGrid = (flexgrid: FlexGrid) => {
        this.grid = flexgrid;
        this.grid.collapseGroupsToLevel(0);
    }

    @action setData = (data: any) => {
        data.some(function iter(row: any) {
            if (!row.children) {
                row.children = [{
                    leaf: true
                }];
                return true;
            }
            Array.isArray(row.children) && row.children.forEach(iter);
            return false;
        });
        this.data = Object.assign([], data);
    }

    @action appendProducts = (product: any) => {
        // this.latestExpandedLeafItem.children.length = 0;
        // this.latestExpandedLeafItem.children = [{ ...product }];
        // this.grid.collectionView.refresh();
    }

    @action onGroupCollapsedChanged = async (grid: FlexGrid, e: FormatItemEventArgs) => {
        this.grid = grid;
        const rowObj = grid.rows[e.row];
        const item = rowObj.dataItem;
        // can't lazy load while updating rows
        if (grid.rows.isUpdating) {
            rowObj.isCollapsed = true;
            return;
        }

        // did we just expand a node with a dummy child?
        if (
            !rowObj.isCollapsed
            && item.children.length
            && item.children[0].leaf
        ) {

            let rowIndex = e.row;
            let currentRow = grid.rows[rowIndex];
            let childLevel = CHILDDEPTH;
            const pathToClickedRow = [];
            while (currentRow && currentRow.level >= 0) {
                if (currentRow.level < childLevel) {
                    pathToClickedRow.unshift(currentRow.dataItem.name);
                    childLevel = currentRow.level;
                }
                currentRow = grid.rows[--rowIndex];
            }

            products.where.product.AND[0].attributes_some.strVal = pathToClickedRow[0];
            products.where.product.AND[1].attributes_some.strVal = pathToClickedRow[1];
            products.where.product.AND[2].attributes_some.strVal = pathToClickedRow[2];

            /*
            this.isAnyProductRowSet = true;
            this.latestExpandedLeafItem = item;
            this.productQuery({
                variables: products
            });*/

            const data = await this.client.query({
                query: GET_COLLECTION,
                variables: products
            });

            if (data) {
                item.children.length = 0;
                item.children = [data.data.buyingSessionProductsConnection.edges[0].node.product];
                this.grid.collectionView.refresh();
            }
        }
    }

    @action cellEditEnding = async (grid: FlexGrid, e: FormatItemEventArgs) => {
        // get old and new values
        const flex = grid;
        const oldVal = flex.getCellData(e.row, e.col, false);
        const newVal = flex.activeEditor.value;

        try {
            const data = await this.client.mutation({
                mutation: UPDATE_PRODUCT,
                variables: updateProduct
            });
            if (data) {
                flex.setCellData(e.row, e.col, newVal)
            }
        } catch(e) {
            flex.setCellData(e.row, e.col, oldVal)
        }
    }
}

export default new TreeGridStore()
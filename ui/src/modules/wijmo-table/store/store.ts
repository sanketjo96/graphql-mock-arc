import { observable, action, toJS } from 'mobx';
export interface IPageMeta {
    start: number,
    end: number, 
    selectedItem: any
}

export class TreeGridStore {
    nodeIndex = 2;
    dfs: Array<any> = [];

    @observable gridData: any = [];
    @observable isProgressing = false;
    @observable stickRows: Array<any> = [];
    @observable selectedItem: any = '';
    @observable expandedPath: any = {}

    @action setStickRows = (rows: Array<any>) => {
        this.stickRows = rows;
    }

    @action setSelectedItem = (item: any) => {
        this.selectedItem = item;
    }

    @action setExpandedPath = (item: any) => {
        this.expandedPath = Object.assign({}, item);
    }

    @action setProgress() {
        this.isProgressing = true;
    }

    @action clearProgress() {
        this.isProgressing = false;
    }


    @action appendToGridData = (newPageData: any) => {
        const previousPageData: Array<string> = toJS(this.gridData).filter((item: any, index: number) => {
            return index > 2
        });

        // this.gridData = this.stickRows.concat(previousPageData).concat(newPageData);
        
        const dataSetLength = newPageData.length;
        const tempRows = [];
        if (newPageData.length < 15) {
            const rowPadding = 15 - dataSetLength;
            for (let i=0; i<rowPadding; i++) {
                tempRows.push({});
            }
        }
        
        this.gridData = this.stickRows.concat(newPageData).concat(tempRows);
    }


    initExpand = (data: Array<string>) => {
        for (let item of data) {
            this.expandedPath[item] = true;
        }
    }

    setNextTreeNode = () => {
        if (this.nodeIndex < this.dfs.length) {
            const selectedNode = this.dfs[++this.nodeIndex];
            if (!this.expandedPath[selectedNode]) {
                this.expandedPath[selectedNode] = true;
            }
            this.setSelectedItem(selectedNode);
        }

    }

    setPreviousTreeNode = () => {
        if (this.nodeIndex > 2) {
            const selectedNode = this.dfs[--this.nodeIndex];
            this.setSelectedItem(selectedNode);
        }
    }
}

export const TreeStore = new TreeGridStore()
import { observable, action, toJS, computed } from 'mobx';

export interface IPageMeta {
    start: number,
    end: number,
    selectedItem: any
}

export class TreeGridStore {
    nodeIndex = 2;
    dfs: Array<any> = [];
    isPreviousPageAvailable = false;
    columnPicker: any;
    grid: any;
    hasNextPage = false;

    @observable gridData: any = [];
    @observable skipChunk: number = 0;
    @observable isProgressing = false;
    @observable selectedItem: any = undefined;
    @observable expandedPath: any = {}

    initExpand = (data: Array<string>) => {
        for (let item of data) {
            this.expandedPath[item] = true;
        }
    }

    setNextTreeNode = () => {
        this.hasNextPage = false;
        this.skipChunk = 0;
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

    @computed get stickyRows() {
        if (!this.selectedItem) return [];

        return this.selectedItem.split('=').map((item: string) => {
            return {
                'name': item
            }
        });
    }

    @action setSelectedItem = (item: any) => {
        this.hasNextPage = false;
        this.skipChunk = 0;
        this.nodeIndex = this.dfs.indexOf(item) !== -1 ? this.dfs.indexOf(item) : 0;
        this.selectedItem = item;
    }

    @action setSkipChunk() {
        this.skipChunk += 20;
    }

    @action setExpandedPath = (item: any) => {
        this.expandedPath = Object.assign({}, item);
    }

    @action setGridData = (newPageData: any) => {
        if (this.skipChunk === 0) {
            this.gridData = this.stickyRows.concat(newPageData);
        } else if (this.skipChunk > 0) {
            this.gridData = this.gridData.concat(newPageData);
        }
    }
}

export const TreeStore = new TreeGridStore()
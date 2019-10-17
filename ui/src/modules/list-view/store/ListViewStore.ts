import { observable, action } from "mobx";

export const cols: Array<any> = [
    {
        header: "Category",
        binding: "name",
        width: '350px',
        isFrozen: true,
        isReadOnly: true
    },
    {
        header: "RM Cluster",
        binding: "rmcluster",
        width: '150px',
        isFrozen: true,
        isReadOnly: true
    },
    {
        header: "Average Depth",
        binding: "averageDepth",
        isReadOnly: false,
        allowResizing: true
    },
    {
        header: "Mix Quantity",
        binding: "mixQuantity",
        isReadOnly: true,
        allowResizing: true
    },
    {
        header: "Mix Value",
        binding: "mixValue",
        isReadOnly: true,
        allowResizing: true
    },
    {
        header: "Sales Qty",
        binding: "salesQty",
        allowResizing: true
    },
    {
        header: "sku Efficiency",
        binding: "skuEfficiency",
        allowResizing: true
    },
    {
        header: "Total Products",
        binding: "totalProducts",
        allowResizing: true
    },
    {
        header: "Total Quantity",
        binding: "totalQuantity",
        allowResizing: true
    },
    {
        header: "Total Stores",
        binding: "totalStores",
        allowResizing: true
    },
    {
        header: "Total Value",
        binding: "totalValue",
        allowResizing: true
    }
];
export const togglerList = cols.filter(item => !item.isFrozen);
class ListStore {
    data: any;
    dfs: any;
    listRef: any;

    @observable offset: number = 0;
    @observable selectedNavItem: string = '';
    @observable scrollItemIndex = 0;
    @observable expandedPath: any = {};
    @observable selectedCols = cols.map(item => item.header);

    jumpToRow = () => {
        if (this.listRef && this.listRef.current) {
            const categories = this.selectedNavItem ? this.selectedNavItem.split('=') : null;
            if (categories && categories.length === 3) {
                const selectedItemIndex = this.data.findIndex((item: any) => {
                    return (
                        item.category.name === categories[0]
                        && item.children1.name === categories[1]
                        && item.children2.name === categories[2]
                    );
                });

                const scrollSize = selectedItemIndex
                    ? this.data[selectedItemIndex].itemStartInList
                    : 0
                    ;
                this.listRef.current.scrollTo(scrollSize, "start")
            }
        }
    }

    pushParentItemsToExpandList = (item: any) => {
        const path = item.split("=");
        for (let i = 0; i < path.length - 1; i++) {
            let key = path[i];
            if (i > 0) {
                key = `${path[i - 1]}=${key}`;
            }

            if (!this.expandedPath[key]) {
                this.expandedPath[key] = true;
            }
        }
    }

    @action setSelectedNavItem = (item: string, fromSideNav: boolean = false) => {
        if (item) {
            this.pushParentItemsToExpandList(item);
            this.selectedNavItem = item;
            if (fromSideNav) {
                this.jumpToRow()
            }
        }
    }

    @action setExpandedPath = (item: any) => {
        this.expandedPath = Object.assign({}, item);
    }

    @action setSelectedCols = (event: any) => {
        this.selectedCols = event.target.value;
    }
}

export const ListViewStore = new ListStore()
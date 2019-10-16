import { observable, action } from "mobx";

class ListStore {
    data: any;
    dfs: any;
    listRef: any;

    @observable offset: number = 0;
    @observable selectedNavItem: string = '';
    @observable scrollItemIndex = 0;
    @observable expandedPath: any = {};

    initExpand = (data: Array<string>) => {
        for (let item of data) {
            this.expandedPath[item] = true;
        }
    }

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

    pushParentToExpandList = (item: any) => {
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
            this.pushParentToExpandList(item);
            this.selectedNavItem = item;
            if (fromSideNav) {
                this.jumpToRow()
            }
        }
    }

    @action setExpandedPath = (item: any) => {
        this.expandedPath = Object.assign({}, item);
    }
}

export const ListViewStore = new ListStore()
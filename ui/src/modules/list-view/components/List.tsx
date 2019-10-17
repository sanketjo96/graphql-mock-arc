/* eslint-disable react-hooks/rules-of-hooks */

import * as React from 'react';
import { AutoSizer } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/scrollbarSize';
import { VariableSizeList, FixedSizeList } from 'react-window';
import { makeStyles } from '@material-ui/styles';
import { Item } from './Item';
import ListRow from './Row';
import { ListViewStore } from '../store/ListViewStore';

export const HEADERROWHEIGHT = 40;
export const CONTENTROWHEIGHT = 40;

const useStyles = makeStyles({
    root: {
        height: '470px',
        width: '95vw'
    }
});

export interface CategoryVirtualizedListProps {
    data: Array<any>
}

const CategoryVirtualizedList: React.SFC<CategoryVirtualizedListProps> = ({ data }) => {
    const listStore = ListViewStore;
    listStore.data = data;
    listStore.listRef = React.useRef(null);

    const classes = useStyles();
    const bodyGrid: any = React.useRef(null);
    const headerGrid: any = React.useRef(null);

    React.useEffect(() => {
        if (
            bodyGrid
            && bodyGrid.current
            && headerGrid
            && headerGrid.current
        ) {
            bodyGrid.current.addEventListener("scroll", (e: any) => {
                headerGrid.current.scrollLeft = e.target.scrollLeft;
            });
        }
    }, [bodyGrid, headerGrid]);


    const getItemSize = (index: number): number => {
        return data[index].itemSize;
    }

    const onScroll = ({ scrollOffset, scrollUpdateWasRequested }: any) => {
        // Execute below logic only if scroll caused
        // due to user interaction in the browser and
        // not due to setting scrollTo() 
        if (!scrollUpdateWasRequested) {
            const topCategory = listStore.data.find((item: any) => {
                return (
                    item.itemStartInList <= scrollOffset
                    && item.itemEndInList >= scrollOffset
                )
            });

            if (topCategory) {
                const item: string = `${topCategory.category.name}=${topCategory.children1.name}=${topCategory.children2.name}`;
                listStore.setSelectedNavItem(item);
            }
        }
    }

    const getHeader = () => {
        return (
            <div>
                <ListRow type="head"></ListRow>
            </div>
        );
    }

    return (
        <div className={`${classes.root} list-view`}>
            <AutoSizer>
                {({ height, width }: any) => {
                    return (
                        <div>
                            <FixedSizeList
                                outerRef={headerGrid}
                                height={42}
                                itemSize={40}
                                width={width - scrollbarSize()}
                                itemCount={1}
                                overscanCount={0}
                                style={{
                                    overflowX: 'hidden',
                                    overflowY: 'hidden',
                                    marginBottom:'2px'
                                }}
                            >
                                {getHeader}
                            </FixedSizeList>

                            <VariableSizeList
                                ref={listStore.listRef}
                                outerRef={bodyGrid}
                                height={height}
                                width={width}
                                itemCount={data.length}
                                itemData={data}
                                overscanCount={1}
                                itemSize={(index: number) => getItemSize(index)}
                                onScroll={onScroll}
                            >
                                {Item}
                            </VariableSizeList>
                        </div>

                    )
                }}
            </AutoSizer>

        </div>
    );
}

export default CategoryVirtualizedList;
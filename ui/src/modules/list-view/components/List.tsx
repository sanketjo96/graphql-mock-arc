import * as React from 'react';
import { AutoSizer } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/scrollbarSize';
import { VariableSizeList, FixedSizeList } from 'react-window';
import { makeStyles } from '@material-ui/styles';
import { Item } from './Item';
import ListRow from './Row';

export const HEADERROWHEIGHT = 40;
export const CONTENTROWHEIGHT = 40;

const useStyles = makeStyles({
    root: {
        padding: '2rem',
        height: '95vh',
        width: '100vw'
    }
});


export interface CategoryVirtualizedListProps {
    data: Array<any>
}

const CategoryVirtualizedList: React.SFC<CategoryVirtualizedListProps> = ({ data }) => {
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
        return () => {
            bodyGrid.current.removeEventListner("scroll");
        };
    }, [bodyGrid, headerGrid]);

    const getItemSize = (index: number): number => {
        const currentItem = data[index];
        return (currentItem.headers * HEADERROWHEIGHT) + (CONTENTROWHEIGHT * currentItem.totalProducts);
    }

    /*
    const getItemSizeForList = ({ index }: any): number => {
        const currentItem = data[index];
        return (currentItem.headers * HEADERROWHEIGHT) + (CONTENTROWHEIGHT * currentItem.totalProducts);
    }

    const getRow = ({ index, style }: any) => {
        return <Item data={data} index={index} style={style}></Item>
    }
    */

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
                                height={40}
                                itemSize={30}
                                width={width - scrollbarSize()}
                                itemCount={1}
                                overscanCount={0}
                                style={{
                                    overflowX: 'hidden',
                                    overflowY: 'hidden',
                                    backgroundColor: 'lightgray',
                                    borderBottom: `1px solid gray`,
                                }}
                            >
                                {getHeader}
                            </FixedSizeList>

                            <VariableSizeList
                                outerRef={bodyGrid}
                                height={height}
                                width={width}
                                itemCount={data.length}
                                itemData={data}
                                overscanCount={1}
                                itemSize={(index: number) => getItemSize(index)}
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

/*
<List
    height={height}
    width={width}
    rowCount={data.length}
    overscanRowCount={1}
    rowHeight={getItemSizeForList}
    rowRenderer={getRow}
/>

<VariableSizeList
    height={height}
    width={width}
    itemCount={data.length}
    itemData={data}
    overscanCount={1}
    itemSize={(index: number) => getItemSize(index)}
>
    {Item}
</VariableSizeList>
*/
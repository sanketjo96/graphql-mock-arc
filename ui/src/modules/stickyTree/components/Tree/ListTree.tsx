import React from "react";
import { AutoSizedStickyTree, StickyTree } from 'react-virtualized-sticky-tree';
import TreeListRow from "./TreeRow";
import ProductRows from "./ProductRow";
import { AutoSizer } from "react-virtualized";
import { makeStyles } from "@material-ui/core";
import { MAXCHILDDEPTH } from "../../../wijmo-table/hooks/TreeHook";
import { HEADERROWHEIGHT } from "../../../wijmo-table/hooks/hooks";

export interface TreeListProps {
    tree: any;
    root: any
}

const useStyles = makeStyles({
    root: {
        height: '470px',
        width: '95vw'
    }
});

const getStartPositionWithinList = (item: any) => {
    const previousRowTop = item ? item.itemStartInList : 0;
    const previousRowHeight = item
        ? ((item.productheight) ? (item.height + item.productheight) : item.height)
        : 0
        ;
    return previousRowTop + previousRowHeight;
}


const TreeList: React.SFC<TreeListProps> = ({ tree, root }) => {
    const classes = useStyles();
    const listRef: any = React.useRef(null);
    tree['HEADER'] = {
        name: 'HEADER',
        depth: 0,
        children: [root[0].key],
        height: HEADERROWHEIGHT
    };
    const treeList = Object.values(tree);

    let prevoiusNode: any = null;
    const updateNodeWithStartPosition = (node: any) => {
        if (!node.itemStartInList) {
            node.itemStartInList = getStartPositionWithinList(prevoiusNode);
            node.itemEndInList = (node.itemStartInList + (node.productheight ? (node.height + node.productheight) : node.height))
            prevoiusNode = node;
        }
    }

    const getChildren = (id: string) => {
        if (tree[id] && tree[id].children) {
            if (tree[id].depth <= MAXCHILDDEPTH) {
                updateNodeWithStartPosition(tree[id]);
                return tree[id].children.map((childId: number) => ({
                    id: childId,
                    isSticky: true,
                    stickyTop: tree[childId].depth * 40,
                    backgroundColor: 'white',
                    zIndex: 30 - tree[childId].depth,
                    height: tree[childId].height
                }))
            }
            updateNodeWithStartPosition(tree[id]);
            return {
                id: id,
                height: tree[id].height
            };
        }
    }

    const rowRenderer = ({ id, style }: any) => {
        const node = tree[id];
        if (id === 'HEADER') {
            return (
                <div style={{ ...style }}>
                    <TreeListRow type='head'></TreeListRow>
                </div>
            )
        } else if (node.depth <= MAXCHILDDEPTH) {
            return (
                <div style={{ ...style }}>
                    <TreeListRow item={node} type='category'></TreeListRow>
                </div>
            )
        } else {
            return (
                <div style={{ ...style }}>
                    <ProductRows parent={node}></ProductRows>
                </div>
            )
        }
    };

    const onScroll = ({ scrollTop, scrollReason }: any) => {
        // Execute below logic only if scroll caused
        // due to user interaction in the browser and
        // not due to setting scrollTo() 
        if (scrollReason === "observed") {
            const updatedScroll = scrollTop + 120;
            const topCategory: any = treeList.find((item: any) => {
                return (
                    (item.itemStartInList) <= updatedScroll
                    && (item.itemEndInList) >= updatedScroll
                )
            });

            if (topCategory) {
                // console.log(topCategory.key);
            }
        }
    }

    const scroll = () => {
        listRef.current.setScrollTop(0);
    }

    return (
        <div className={`${classes.root} list-view`}>
            <button onClick={scroll}>Scroll</button>
            <AutoSizer>
                {({ height, width }: any) => {
                    return <StickyTree
                        ref={listRef}
                        root={{ id: 'HEADER', height: 40, isSticky: true, backgoundColor: 'white', zIndex: 30 }}
                        width={width}
                        height={height}
                        getChildren={getChildren}
                        rowRenderer={rowRenderer}
                        renderRoot={true}
                        overscanRowCount={1}
                        onScroll={onScroll}
                        wrapAllLeafNodes={true}
                    />
                }}
            </AutoSizer>
        </div>
    );
}

export default TreeList;
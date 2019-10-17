import React from "react";
import { AutoSizedStickyTree, StickyTree } from 'react-virtualized-sticky-tree';
import TreeListRow from "./TreeRow";
import ProductRows from "./ProductRow";
import { AutoSizer } from "react-virtualized";
import { makeStyles } from "@material-ui/core";
import { MAXCHILDDEPTH } from "../../../wijmo-table/hooks/TreeHook";

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

const TreeList: React.SFC<TreeListProps> = ({ tree, root }) => {
    const classes = useStyles();
    tree['HEADER'] = { 
        name: 'HEADER',
        depth: 0,
        children: [root[0].key]
    };

    const getChildren = (id: number) => {
        if (tree[id] && tree[id].children) {
            if (tree[id].depth <= MAXCHILDDEPTH) {
                return tree[id].children.map((childId: number) => ({
                    id: childId,
                    isSticky: true,
                    stickyTop: tree[childId].depth * 40,
                    backgroundColor: 'white',
                    zIndex: 30 - tree[childId].depth,
                    height: tree[childId].height
                }))
            }
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
                <div style={{ ...style, backgroundColor: 'white' }}>
                    <TreeListRow type='head'></TreeListRow>
                </div>
            )
        } else if (node.depth <= MAXCHILDDEPTH) {
            return (
                <div style={{ ...style, backgroundColor: 'white' }}>
                    <TreeListRow item={node} type='category'></TreeListRow>
                </div>
            )
        } else {
            return (
                <div style={{ ...style, backgroundColor: 'white' }}>
                    <ProductRows parent={node}></ProductRows>
                </div>
            )
        }
    };

    return (
        <div className={`${classes.root} list-view`}>
            <AutoSizer>
                {({ height, width }: any) => {
                    return <StickyTree
                        root={{ id: 'HEADER', height: 40, isSticky: true, backgoundColor: 'white', zIndex: 30 }}
                        width={width}
                        height={height}
                        getChildren={getChildren}
                        rowRenderer={rowRenderer}
                        renderRoot={true}
                        overscanRowCount={1}
                    />
                }}
            </AutoSizer>
        </div>
    );
}

export default TreeList;
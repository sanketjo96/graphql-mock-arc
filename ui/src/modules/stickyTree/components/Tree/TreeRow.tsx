/* eslint-disable react-hooks/rules-of-hooks */

import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import _ from 'lodash';
import { useObserver } from 'mobx-react-lite';
import { ListViewStore, cols } from '../../../list-view/store/ListViewStore';
import { CONTENTROWHEIGHT, HEADERROWHEIGHT } from '../../../wijmo-table/hooks/TreeHook';
const uuidv4 = require('uuid/v4');

export interface ListRowProps {
    item?: any,
    type?: string
}

const useStyles = makeStyles((theme) => {
    return {
        listRow: {
            width: '1733px',
            display: 'flex'
        },
        cell: {
            backgroundColor: 'white',
            border: '1px solid gray',
            padding: '3px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        defaultWidthCell: {
            flexBasis: 0,
            flexGrow: 1
        },
        headerCell: {
            color: 'black',
            height: '40px',
        },
        categoryCell:(props: any) => ({
            height: `${props.HEADERROWHEIGHT}px`,
        }),
        contentCell: (props: any) => ({
            height: `${props.CONTENTROWHEIGHT}px`,
        })
    }
});
const TreeListRow: React.SFC<ListRowProps> = ({ item, type }) => {
    return useObserver(() => {
        const classes = useStyles({
            CONTENTROWHEIGHT,
            HEADERROWHEIGHT
        });
        const cellClass = [classes.cell]
        const store = ListViewStore;

        switch (type) {
            case 'head':
                cellClass.push(classes.headerCell);
                break;
            case 'category':
                cellClass.push(classes.categoryCell);
                break;
            default:
                cellClass.push(classes.contentCell);
                break;
        }

        return (
            <div className={classes.listRow}>
                {_.map(cols, (col, index: number) => {
                    if (!col.isFrozen && store.selectedCols.indexOf(col.header) === -1) return;

                    const style: any = {};

                    // Set cell width
                    if (col.width) {
                        style.width = col.width;
                    } else {
                        cellClass.push(classes.defaultWidthCell);
                    }

                    // set frozen css
                    if (col.isFrozen) {
                        const previousColWidth = (index - 1 >= 0) ? cols[index - 1].width : 0;
                        style.position = 'sticky';
                        style.left = previousColWidth;
                        style.boxShadow = '7px 0 3px -2px #888';
                    }

                    return (
                        <div key={uuidv4()} style={style} className={cellClass.join(' ')}>
                            {
                                (type === 'head')
                                    ? col.header
                                    : item ? item[col.binding] : (
                                        <Skeleton variant="rect" width={210} height={118} />
                                    )
                            }
                        </div>
                    )
                })}
            </div>
        )
    });
}
export default TreeListRow;
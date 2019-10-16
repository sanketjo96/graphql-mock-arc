import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import _ from 'lodash';
const uuidv4 = require('uuid/v4');

export interface ListRowProps {
    item?: any,
    type?: string
}

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

const useStyles = makeStyles(() => {
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
        categoryCell: {
            height: `40px`,
        },
        contentCell: {
            height: `40px`,
        }
    }
});
const ListRow: React.SFC<ListRowProps> = React.memo(({ item, type }) => {
    const classes = useStyles();
    const cellClass = [classes.cell]

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
            {_.map(cols, (col, index) => {
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
                    style['z-index'] = 100; 
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
    );
})
export default ListRow;
import * as React from 'react';
import { TreeTable } from 'primereact/treetable';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Column } from "primereact/column";
import { data, IColConfig } from '../data/data';
import LeafComp from './LeafComponent';
import './Table.css';
const uuidv4 = require('uuid/v4');

export interface ListViewProps {
    config: Array<IColConfig>
}

export interface ListViewState {
    data: any,
    cols: any
}

class ListView extends React.Component<ListViewProps, ListViewState> {
    colOptions: Array<any> = [];
    frozenCols: Array<any> = [];
    constructor(props: ListViewProps) {
        super(props);
        for (let col of this.props.config) {
            if (col.frozen) {
                this.frozenCols.push(col);
            }
            this.colOptions.push({ label: col.header, value: col, disabled: true});
        }
        this.state = {
            cols: this.props.config,
            data: data.tableData,
        };

    }

    format = (node: any, feild: any) => {
        if (!node.children) {
            return <LeafComp></LeafComp>
        } else {
            return node.data[feild];
        }
    }

    onEditorValueChange(props: any, value: any) {
        let newNodes = JSON.parse(JSON.stringify(this.state.data));
        let editedNode = this.findNodeByKey(newNodes, props.node.key);
        editedNode.data[props.field] = value;

        this.setState({
            data: newNodes
        });
    }

    inputTextEditor = (props: any) => {
        return (
            <InputText
                type="text"
                value={props.node.data[props.field]}
                onChange={(e: any) => this.onEditorValueChange(props, e.target.value)}
            />
        );
    }

    findNodeByKey(nodes: any, key: string) {
        let path = key.split('-');
        let node;

        while (path.length) {
            let list: any = node ? node.children : nodes;
            node = list[parseInt(path[0], 10)];
            path.shift();
        }

        return node;
    }

    onColumnToggle = (event: any) => {
        this.setState({ cols: this.frozenCols.concat(event.value) });
    }

    render() {
        const header = (
            <div style={{ textAlign: 'left' }}>
                <MultiSelect
                    value={this.state.cols.filter((item: IColConfig) => {
                        return !item.frozen;
                    })}
                    options={this.colOptions.filter((item: any) => {
                        return !item.value.frozen;
                    })}
                    onChange={this.onColumnToggle}
                    style={{ width: '250px' }} />
            </div>
        );

        let dynamicColumns = this.state.cols.map((col: IColConfig) => {
            const baseClass = !col.resize ? 'no-resize' : '';
            return <Column
                key={uuidv4()}
                className={col.class ? `${col.class} ${baseClass}` : `${baseClass}`}
                frozen={col.frozen}
                style={
                    {
                        width: col.width ? col.width : '400px',
                        height: col.height ? col.height : '46px'
                    }
                }
                field={col.field}
                header={col.header}
                expander={!!col.expand}
                editor={col.edit ? this.inputTextEditor : undefined}
                body={(node: any) => {
                    return this.format(node, col.field)
                }}
            />;
        });

        return (
            <TreeTable
                scrollable
                scrollHeight="500px"
                frozenWidth="500px"
                resizableColumns={true}
                columnResizeMode="expand"
                header={header}
                value={this.state.data}
            >
                {dynamicColumns}
            </TreeTable>
        );
    }
}

export default ListView;
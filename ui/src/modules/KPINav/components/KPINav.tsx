/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect } from 'react';
import { Tree } from 'primereact/tree';
import { hierarchyVariable } from '../../wijmo-table/graphql/variables';
import { useProductHierarchy } from '../../wijmo-table/hooks/hooks';
import {useObserver } from 'mobx-react-lite';
import { TreeGridStore, TreeStore } from '../../wijmo-table/store/store';
import './nav.css';
import { toJS } from 'mobx';
// const uuidv4 = require('uuid/v4');

const KPINav = () => {
  return useObserver(() => {
    const store: TreeGridStore = TreeStore;
    const [data, dfs, loading] = useProductHierarchy({
      variables: hierarchyVariable
    });
  
    // One time store initialization
    useEffect(() => {
      store.dfs = dfs;
      store.initExpand([dfs[0], dfs[1], dfs[2]]);
      store.setSelectedItem(dfs[2]);
    }, [data]);

    useEffect(() => {
      if (store.selectedItem) {
        let stickRows: Array<any> = store.selectedItem.split('=').map((item: string) => {
          return {
            'name': item
          }
        });
        store.setStickRows(stickRows);
      }
    }, [store.selectedItem]);
    
    const selectionChange = (e: any) => {
      store.setSelectedItem(e.value);
    }

    const onToggle = (e: any) => {
      store.setExpandedPath(e.value);
    }
  
    if (data && !data.length && loading) return <div>Loading</div>;
    return (
      <React.Fragment>
        <Tree
          value={data}
          selectionMode="single"  
          selectionKeys={store.selectedItem}
          onSelectionChange={selectionChange}
          expandedKeys={toJS(store.expandedPath)}
          onToggle={onToggle}/>
      </React.Fragment>
    );
  })
}

export default KPINav;
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect } from 'react';
import { Tree } from 'primereact/tree';
import { hierarchyVariable } from '../../wijmo-table/graphql/variables';
import { useProductHierarchy } from '../../wijmo-table/hooks/hooks';
import {useObserver } from 'mobx-react-lite';
import { TreeGridStore, TreeStore } from '../../wijmo-table/store/store';
import './nav.css';
import { toJS } from 'mobx';
const DEPTH = 3;

const KPINav = () => {
  return useObserver(() => {
    const store: TreeGridStore = TreeStore;
    const [data, dfs, loading] = useProductHierarchy({
      variables: hierarchyVariable
    });
  
    // One time store initialization per Data
    useEffect(() => {
      store.dfs = dfs;
      store.initExpand(dfs.filter((item, index) => index < DEPTH));
      store.setSelectedItem(dfs[DEPTH -1]);
    }, [data]);

    // Get rows to stick at top
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
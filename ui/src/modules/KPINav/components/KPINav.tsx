/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect } from 'react';
import { Tree } from 'primereact/tree';
import { hierarchyVariable } from '../../wijmo-table/graphql/variables';
import { useProductHierarchy } from '../../wijmo-table/hooks/hooks';
import { useObserver } from 'mobx-react-lite';
import { ListViewStore } from '../../list-view/store/ListViewStore';
import './nav.css';
import { toJS } from 'mobx';
const DEPTH = 3;

const KPINav = () => {
  return useObserver(() => {
    const store = ListViewStore;
    const [loading, data, navData, dfs] = useProductHierarchy({
      variables: hierarchyVariable
    });

    // One time store initialization per Data
    useEffect(() => {
      store.dfs = dfs;
      store.initExpand(dfs.filter((item: any, index: number) => index < DEPTH));
      store.setSelectedNavItem(dfs[DEPTH - 1]);
    }, [navData]);

    const selectionChange = (e: any) => {
      store.setSelectedNavItem(e.value, true);
    }

    const onToggle = (e: any) => {
      store.setExpandedPath(e.value);
    }

    if (navData && !navData.length && loading) return <div>Loading</div>;
    return (
      <React.Fragment>
        <Tree
          value={navData}
          selectionMode="single"
          selectionKeys={store.selectedNavItem}
          onSelectionChange={selectionChange}
          expandedKeys={toJS(store.expandedPath)}
          onToggle={onToggle} />
      </React.Fragment>
    );
  })
}

export default KPINav;
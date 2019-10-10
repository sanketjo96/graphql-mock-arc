/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useObserver } from "mobx-react-lite"
import { TreeGridStore, TreeStore } from '../modules/wijmo-table/store/store';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const LinearIndeterminate: any  = () => {
  return useObserver(() => {
    const classes = useStyles();
    const store: TreeGridStore = TreeStore;
    return (
        <div className={classes.root}>
          { store.isProgressing && <LinearProgress />}
        </div>
      );
  })
}

export default LinearIndeterminate

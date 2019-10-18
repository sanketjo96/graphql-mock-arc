import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KPINav from '../modules/KPINav/components/KPINav';
import IconButton from '@material-ui/core/IconButton';
import LinearIndeterminate from './Progress';
import ListContainer from '../modules/list-view/components';
import TreeListConatiner from '../modules/stickyTree/components/Tree';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
    },
    main: {
      margin: '0 1rem 1rem 1rem'
    },
    iconbar: {
      position: 'fixed',
      zIndex: 9,
      right: '0px',
      top: '50%',
    },
    iconanch: {
      background: '#424242',
      color: 'white',
      display: 'block',
      textAlign: 'center',
      padding: '8px',
      transition: 'all 0.3s ease',
      fontSize: '13px',
      textDecoration: 'none',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    }
  }),
);

export default function PersistentDrawerRight() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // <ListContainer ></ListContainer>
  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.iconbar}>
        <a className={classes.iconanch} href="#" onClick={handleDrawerOpen}>NAV</a>
      </div>
      <main>
        <LinearIndeterminate></LinearIndeterminate>
        <div className={classes.main}>
            <TreeListConatiner></TreeListConatiner>
        </div>
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <KPINav></KPINav>
      </Drawer>
    </div>
  );
}

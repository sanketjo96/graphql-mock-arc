/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useObserver } from 'mobx-react-lite';
import { ListViewStore, togglerList } from '../../store/ListViewStore';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function ColToggler() {
    return useObserver(() => {
        const classes = useStyles();
        const theme = useTheme();
        const store = ListViewStore;

        return (
            <div className={classes.root}>
                <FormControl className={clsx(classes.formControl, classes.noLabel)}>
                    <Select
                        multiple
                        displayEmpty
                        value={store.selectedCols}
                        onChange={store.setSelectedCols}
                        input={<Input id="select-multiple-placeholder" />}
                        renderValue={selected => {
                            if ((selected as string[]).length === 0) {
                                return <em>Column Selector</em>;
                            }

                            return (selected as string[]).join(', ');
                        }}
                        MenuProps={MenuProps}
                    >
                        <MenuItem disabled value="">
                            <em>Column Selector</em>
                        </MenuItem>
                        {togglerList.map((col: any) => (
                            <MenuItem key={col.header} value={col.header} style={getStyles(col.header, store.selectedCols, theme)}>
                                {col.header}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    })
}
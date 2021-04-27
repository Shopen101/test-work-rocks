import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0 auto',
        display: 'block'
    }
}));

export default function CircLoader() {
    const classes = useStyles()

    return <CircularProgress disableShrink className={classes.root} />
}

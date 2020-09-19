import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import './LoadingIcon.css';

const useStyle = makeStyles((theme) => ({
    root: {
        position: 'relative',
      },
    top: {
        color: '#ffffff',
        animationDuration: '550ms',
        left: 0,
      },
    circle: {
      strokeLinecap: 'round',
    },
  }),
);


export default function LoadingIcon() {

    const classes = useStyle();

    return (
        <div className={classes.root}>
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                classes={{
                    circle: classes.circle,
                }}
                size={80}
                thickness={4}
            />
        </div>
    );
}

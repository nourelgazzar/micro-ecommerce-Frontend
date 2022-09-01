import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '../components/Table';
import ShowUpModel from '../components/ShowModelPopUp';

const useStyles = makeStyles((theme) => ({
  table: {
    marginLeft: '10vw !important',
  },
}));
export default function Category() {
  const classes = useStyles();

  return (
    <div>
      <ShowUpModel />
      <Table className={classes.table} />
    </div>
  );
}

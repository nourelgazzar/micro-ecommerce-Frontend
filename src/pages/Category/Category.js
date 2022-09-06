import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Stack, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Page from '../../components/Page';
import Table from '../../components/Table';
import ShowUpModel from '../../components/ShowModelPopUp';
import Button from '../../components/Button';
import ShowUpModelAdd from './CategoryComponents/ShowUpmodel';

const useStyles = makeStyles((theme) => ({
  table: {},
}));
export default function Category() {
  const classes = useStyles();
  const [openShowUpModelDelete, setopenShowUpModelDelete] = useState(false);
  const [openShowUpModelAddEdit, setopenShowUpModelAddEdit] = useState(false);
  const [finalCategoriesArray, setfinalCategoriesArray] = useState([]);
  const [height, setheight] = useState(250);

  return (
    <Page title="Dashboard: Categories">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Categories
          </Typography>
          <Button
            text={'Add Category'}
            icon={AddCircleOutlineIcon}
            onClick={() => {
              setopenShowUpModelAddEdit(true);
            }}
          />
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="center" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Table />
          </Stack>
        </Stack>

        {/* <Table className={classes.table} /> */}
        {/* <ShowUpModel open={openShowUpModelDelete} setopen={setopenShowUpModelDelete} /> */}
        <ShowUpModelAdd
          open={openShowUpModelAddEdit}
          setopen={setopenShowUpModelAddEdit}
          finalCategoriesArray={finalCategoriesArray}
          height={height}
          setheight={setheight}
          setfinalCategoriesArray={setfinalCategoriesArray}
        />
      </Container>
    </Page>
  );
}

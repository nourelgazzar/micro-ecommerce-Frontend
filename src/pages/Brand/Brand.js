import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Stack, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Page from '../../components/Page';
import Table from '../../components/Table';
import ShowUpModel from '../../components/ShowModelPopUp';
import Button from '../../components/Button';
import ShowUpModelAdd from './BrandComponents/ShowUpmodel';

const useStyles = makeStyles((theme) => ({
  table: {},
}));
export default function Brand() {
  const classes = useStyles();
  const [openedit, setopenedit] = useState(false);
  const [openShowUpModelDelete, setopenShowUpModelDelete] = useState(false);
  const [openShowUpModelAddEdit, setopenShowUpModelAddEdit] = useState(false);
  const [finalBrandsArray, setfinalBrandsArray] = useState([]);
  const [height, setheight] = useState(250);
  const [data, setdata] = useState([]);

  return (
    <Page title="Dashboard: Brands">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap-reverse" mb={5}>
          <Typography variant="h4" gutterBottom>
            Brands
          </Typography>
          <Button
            text={'Add Brand'}
            icon={AddCircleOutlineIcon}
            onClick={() => {
              setopenShowUpModelAddEdit(true);
            }}
          />
        </Stack>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="center" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Table
              text="Brand Name"
              opendelete={openShowUpModelDelete}
              setopendelete={setopenShowUpModelDelete}
              setopenedit={setopenedit}
              setopeneditmodel={setopenShowUpModelAddEdit}
              data={data}
            />
          </Stack>
        </Stack>
        {/* <Table className={classes.table} /> */}
        <ShowUpModel open={openShowUpModelDelete} setopen={setopenShowUpModelDelete} />
        <ShowUpModelAdd
          open={openShowUpModelAddEdit}
          setopen={setopenShowUpModelAddEdit}
          finalBrandsArray={finalBrandsArray}
          height={height}
          setheight={setheight}
          setfinalBrandsArray={setfinalBrandsArray}
          setopenedit={setopenedit}
          openedit={openedit}
        />
      </Container>
    </Page>
  );
}

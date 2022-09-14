import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { Container, Stack, Typography, Divider, IconButton } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const useStyles = makeStyles((theme) => ({
  div: {
    '&:hover': { textDecoration: 'underline', textDecorationColor: '#2065D1' },
  },
}));

const ProductImgStyle = styled('img')({
  top: 60,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});
export default function OderDetailsForm() {
  const [quantity, setquantity] = useState(false);
  const [hoover, sethoover] = useState(false);
  const classes = useStyles();

  return (
    <div style={{ width: 1150 }}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 200, height: 200, objectFit: 'cover', position: 'absolute' }}>
          <img src="src\components\employee.png" alt="" />
        </div>
        <div style={{ marginTop: '2%', width: 400, height: 200, marginLeft: '20%', mb: 2, display: 'inline-block' }}>
          <div>
            <div
              style={{ width: 200, fontWeight: 500 }}
              variant="h12"
              sx={{ fontWeight: 500, display: 'inline-block' }}
            >
              Name of the brand
            </div>{' '}
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex' }}>
              <div>
                <Typography sx={{ fontSize: 15, marginTop: '5%', color: '#2065D1' }}> Quantity:</Typography>
              </div>
              <div>
                <IconButton disabled={quantity === 0}>
                  <RemoveIcon
                    sx={{ color: quantity === 0 ? 'grey' : '#2065D1', width: 20, height: 20 }}
                    onClick={() => {
                      if (quantity !== 0) setquantity(quantity - 1);
                    }}
                  />
                </IconButton>
              </div>
              <div style={{ marginTop: '2%' }}>
                {' '}
                <Typography variant="h12" gutterBottom sx={{ color: '#2065D1' }}>
                  {quantity}
                </Typography>
              </div>
              <div>
                {' '}
                <IconButton
                  className={classes.icon}
                  onClick={() => {
                    setquantity(quantity + 1);
                  }}
                >
                  {' '}
                  <AddIcon sx={{ color: '#2065D1', width: 20, height: 20 }} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2%', marginLeft: '37%' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            EKH 5000
          </Typography>{' '}
        </div>
      </div>
      <div className={classes.div} style={{ marginLeft: '95%' }}>
        <Typography variant="h12" sx={{ fontWeight: 500, color: '#2065D1' }}>
          Delete
        </Typography>{' '}
      </div>
    </div>
  );
}

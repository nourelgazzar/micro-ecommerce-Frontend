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
export default function OderDetailsForm(props) {
  const [quantity, setquantity] = useState(false);
  const [hoover, sethoover] = useState(false);
  const [cartid, setcartid] = useState(0);
  const [productid, setproductid] = useState(0);
  const [price, setprice] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    console.log(props.item, 'itemsssssssss');
    setcartid(props.item.cart_id);
    setproductid(props.item.product);
    setquantity(props.item.no_items);
    let price = 0;
    price = props.item.no_items * props.item.product.price;
    setprice(price);
  }, []);

  return (
    <div style={{ width: 1150 }}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 200, height: 200, objectFit: 'cover', position: 'absolute' }}>
          <img src={`http://localhost:8000/images/${props.item.product.image}`} alt={props.item.product.name} />
        </div>
        <div style={{ marginTop: '2%', width: 400, height: 200, marginLeft: '20%', mb: 2, display: 'inline-block' }}>
          <div>
            <div
              style={{ width: 200, fontWeight: 500 }}
              variant="h12"
              sx={{ fontWeight: 500, display: 'inline-block' }}
            >
              {props.item.product.name}
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
          <div className={classes.div} style={{}}>
            <Typography variant="h12" sx={{ fontWeight: 500, color: '#2065D1' }}>
              Delete
            </Typography>{' '}
          </div>
        </div>

        <div style={{ marginTop: '2%', marginLeft: '37%' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            {price}
          </Typography>{' '}
        </div>
      </div>
      <Divider sx={{ borderRightWidth: 8 }} />
    </div>
  );
}

import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Link, Stack, IconButton, InputAdornment, Typography, TextField } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import ErrorIcon from '@mui/icons-material/Error';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { Modal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  modal: {
    backgroundColor: '#FFFAFA',
    marginTop: '20%',
    borderRadius: 20,
    width: 600,
    height: 250,
    borderWidth: 3,
    borderColor: '#252F3E',
  },
  display: {
    display: 'flex',
    marginLeft: '16%',
    marginTop: '5%',
  },
  button: {
    marginLeft: '2vw',
    width: '10vw',
  },
  icon: {
    borderColor: 'red !important',
    '&:hover': { borderColor: '#2065D1' },
  },
}));
const ShowUpModel = (props) => {
  const classes = useStyles();
  console.log(props.quantity, 'PORPPPPPPP');

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={props.open}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
    >
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 400,
          alignItems: 'center',
        }}
      >
        <div className={classes.modal}>
          <div style={{ marginTop: '5%', textAlign: 'right', marginRight: 20 }}>
            <IconButton
              sx={{
                size: 'small',
                color: 'primary',
                width: 30,
                height: 30,
              }}
              onClick={() => {
                props.setopen(false);
              }}
            >
              <CloseIcon
                sx={{
                  color: 'black',
                  fontSize: 13,
                }}
              />
            </IconButton>{' '}
          </div>
          <div>
            <Typography variant="h4" gutterBottom sx={{}}>
              Add Product
            </Typography>
          </div>
          <div style={{ display: 'flex', marginLeft: '20%', marginTop: '5%' }}>
            <div>
              <Typography sx={{ fontSize: 20, marginTop: '5%' }}> Quantity:</Typography>
            </div>
            <div>
              <IconButton disabled={props.quantity === 0}>
                <RemoveIcon
                  sx={{ color: props.quantity === 0 ? 'grey' : '#2065D1' }}
                  onClick={() => {
                    if (props.quantity !== 0) props.setquantity(props.quantity - 1);
                  }}
                />
              </IconButton>
            </div>
            <div>
              {' '}
              <Typography variant="h4" gutterBottom sx={{}}>
                {props.quantity}
              </Typography>
            </div>
            <div>
              {' '}
              <IconButton
                className={classes.icon}
                onClick={() => {
                  props.setquantity(props.quantity + 1);
                }}
              >
                {' '}
                <AddIcon sx={{ color: '#2065D1' }} />
              </IconButton>
            </div>
          </div>
          <div style={{ width: 200, marginLeft: '50%' }}>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              onClick={() => {
                props.setopen(false);
                props.setaddcart(true);
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShowUpModel;

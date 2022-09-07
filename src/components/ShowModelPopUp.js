import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Link, Stack, IconButton, InputAdornment, Typography } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import ErrorIcon from '@mui/icons-material/Error';
import Button from '@mui/material/Button';

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
}));
const ShowUpModel = (props) => {
  const classes = useStyles();

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
            <ErrorIcon sx={{ width: 32, height: 32 }} />
            <Typography variant="h4" gutterBottom sx={{}}>
              Are you sure you want to delete?
            </Typography>

            <div className={classes.display}>
              <div>
                {' '}
                <Button className={classes.button} variant="outlined">
                  Delete it
                </Button>
              </div>
              <div>
                {' '}
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    props.setopen(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShowUpModel;

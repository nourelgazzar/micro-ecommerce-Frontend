import * as React from 'react';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

export default function SimpleSnackbar(props) {
  const [opensnackbar, setopensnackbar] = useState(true);

  const handleClick = () => {
    props.setopen(true);
  };

  const handleClose = () => {
    props.setopen(false);
  };

  const action = (
    <div>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );

  return (
    <div>
      <Snackbar
        sx={{ width: '30vw' }}
        spacing={2}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={2000}
        onClose={handleClose}
        open={props.open}
      >
        <Alert severity="info" open={opensnackbar} onClose={handleClose}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

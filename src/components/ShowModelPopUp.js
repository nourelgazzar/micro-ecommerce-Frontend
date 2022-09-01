import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
    height: '30vw !important',
    borderWidth: 3,
    borderColor: '#252F3E',
  },
}));
const ShowUpModel = (props) => {
  const [open, setopen] = useState(true);
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
        <div className={classes.modal}> </div>
      </div>
    </Modal>
  );
};

export default ShowUpModel;

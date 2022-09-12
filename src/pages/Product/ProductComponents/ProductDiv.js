import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Stack, IconButton, InputAdornment, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

const useStyles = makeStyles((theme) => ({
  div: {
    height: '3vw',
    width: '20vw',
    borderRadius: '2vw',
    border: '2px solid red',
  },
  text: {
    textAlign: 'center !important',
    margin: 'auto',
    marginTop: '-5%',
  },
}));
export default function ProductDiv(props) {
  const classes = useStyles();
  const [id, setid] = useState(0);

  // useEffect(() => {
  //   setid(props.id);
  // }, []);

  const setDelete = () => {
    props.setdeleteCheck(true);
    props.setdeleteID(id);
  };
  return (
    <div style={{ width: 200, whiteSpace: 'nowrap' }}>
      <Box
        component="div"
        sx={{
          overflow: 'auto',
          my: 2,
          p: 1,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          border: '1px solid',
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        <div style={{ marginTop: '-0.2%', textAlign: 'right', marginRight: 2 }}>
          <IconButton
            sx={{
              width: 20,
              height: 20,
            }}
            onClick={() => {
              props.deleteItem();
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
        <div>{props.text}</div>
      </Box>
    </div>
  );
}

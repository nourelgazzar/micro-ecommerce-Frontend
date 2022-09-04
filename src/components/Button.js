import * as React from 'react';
import Button from '@mui/material/Button';

export default function DisableElevation(props) {
  return (
    <Button variant="contained" disableElevation startIcon={<props.icon />} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

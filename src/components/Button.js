import * as React from 'react';
import Button from '@mui/material/Button';
import { ClassNames } from '@emotion/react';

export default function DisableElevation(props) {
  return (
    <Button
      variant="contained"
      disableElevation
      startIcon={<props.icon />}
      onClick={props.onClick}
      className={props.className}
    >
      {props.text}
    </Button>
  );
}

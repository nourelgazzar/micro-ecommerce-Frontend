import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
//   return { name, calories, fat, carbs, protein };
// }

const rows = ['Frozen yoghurt', 'Ice cream sandwich', 'Eclair', 'Cupcake', 'Gingerbread'];

export default function CustomizedTables(props) {
  return (
    <TableContainer component={Paper} sx={{ width: '75vw', fontSize: 3 }} className={props.className}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ fontSize: 16 }}>{props.text}</StyledTableCell>

            <StyledTableCell sx={{ fontSize: 16, marginRight: 20 }} align="right">
              Action
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {' '}
                <IconButton
                  onClick={() => {
                    props.setopenedit(true);
                    props.setopeneditmodel(true);
                  }}
                >
                  {' '}
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    props.setopendelete(true);
                  }}
                >
                  {' '}
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

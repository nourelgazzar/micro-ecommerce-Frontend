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

// const rows = ['Frozen yoghurt', 'Ice cream sandwich', 'Eclair', 'Cupcake', 'Gingerbread'];

export default function CustomizedTables(props) {
  return (
    <TableContainer component={Paper} sx={{ width: '75vw', fontSize: 3 }} className={props.className}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ fontSize: 16 }}>{props.text}</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 16 }}>{props.price ?? props.price}</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 16 }}>{props.quantity ?? props.quantity}</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 16 }}>{props.description ?? props.description}</StyledTableCell>
            {/* <StyledTableCell sx={{ fontSize: 16 }}>{props.image ?? props.image}</StyledTableCell> */}
            <StyledTableCell sx={{ fontSize: 16, marginRight: 20 }} align="right">
              Action
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((item) => (
            <StyledTableRow key={item.name}>
              <StyledTableCell component="th" scope="row">
                {item.name ?? item.name}
              </StyledTableCell>

              <StyledTableCell component="th" scope="row">
                {item.price ?? item.price}
              </StyledTableCell>

              <StyledTableCell component="th" scope="row">
                {item.quantity ?? item.quantity}
              </StyledTableCell>

              <StyledTableCell component="th" scope="row">
                {item.description ?? item.description}
              </StyledTableCell>

              {/* <StyledTableCell component="th" scope="row">
                {item.image ?? (
                  <img
                    src={`http://localhost:8000/images/${item.image}`}
                    alt="logo"
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                )}
              </StyledTableCell> */}
              <StyledTableCell align="right">
                {' '}
                <IconButton
                  onClick={() => {
                    props.openModalForEdit(item);
                    // props.setopenedit(true);
                    // props.setopeneditmodel(true);
                    props.height(350);
                  }}
                >
                  {' '}
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    props.setopendelete(true);
                    props.name(item.name);
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

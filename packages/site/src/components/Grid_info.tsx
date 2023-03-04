import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

// Define the styles for the grid item
const GridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
}));

// Define the type for your JSON data
type Data = {
  [key: string]: string;
};

// Define the props for the component
type Props = {
  data: Data;
};

// Define the component
export const GridComponent: React.FC<Props> = ({ data }) => {
  return (
    <Grid container>
      {Object.entries(data).map(([key, value]) => (
        <React.Fragment key={key}>
          <GridItem item xs={6}>
            <Typography variant="body1">{key}</Typography>
          </GridItem>
          <GridItem item xs={6}>
            <Typography variant="body1">{value}</Typography>
          </GridItem>
        </React.Fragment>
      ))}
    </Grid>
  );
};


import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@mui/material";

interface Props1 {
  data: Record<string, string>;
}

export const MyTable: React.FC<Props1> = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tableRows = Object.entries(data).map(([key, value]) => (
    <TableRow key={key}>
      <TableCell component="th" scope="row">
        {key}
      </TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Trait</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={tableRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

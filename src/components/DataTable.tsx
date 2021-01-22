import React from 'react';

import { Table, TableCell, TableRow } from '@material-ui/core';

const DataTable: React.FC = (props) => {
  return (
    <Table>
      <TableRow>
        <TableCell variant="head">Header 1</TableCell>
        <TableCell>Cell 1</TableCell>
      </TableRow>
      <TableRow>
        <TableCell variant="head">Header 1</TableCell>
        <TableCell>Cell 2</TableCell>
      </TableRow>
    </Table>
  );
};

export default DataTable;

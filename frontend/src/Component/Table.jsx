import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const TableComponent = ({ headers, data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);

  const handleActionClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
    setCurrentRow(null);
  };

  const handleEdit = (row) => {
    console.log('Edit:', row);
    handleActionClose();
  };

  const handleDelete = (row) => {
    console.log('Delete:', row);
    handleActionClose();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.position}</TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleActionClick(e, row)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl && currentRow === row)}
                  onClose={handleActionClose}
                >
                  <MenuItem onClick={() => handleEdit(row)}>Edit</MenuItem>
                  <MenuItem onClick={() => handleDelete(row)}>Delete</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;

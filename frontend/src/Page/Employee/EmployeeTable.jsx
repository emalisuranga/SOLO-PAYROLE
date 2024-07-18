import React, { useState, useEffect } from 'react';
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
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTranslation } from 'react-i18next';
import useEmployeeStore from '../../store/employeeStore';
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "./CustomSnackbar";

const EmployeeTable = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { deleteEmployee, fetchEmployees } = useEmployeeStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (currentRow) {
      console.log(currentRow);
    }
  }, [currentRow]);

  const handleEdit = (row) => {
    navigate(`/employee/edit/${row.id}`);
    handleActionClose();
  };


  const handleView = (row) => {
    navigate(`/employee/${row.id}`);
  };

  const handleActionClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
    setCurrentRow(null);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentRow(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (currentRow) {
      try {
        await deleteEmployee(currentRow.id);
        setSnackbarMessage(t("delete_success"));
        setSnackbarSeverity("deleteSuccess");
        setSnackbarOpen(true);
        fetchEmployees();
      } catch (error) {
        setSnackbarSeverity("error");
        setSnackbarMessage(t("delete_error"));
        setSnackbarOpen(true);
        console.error("Failed to save data", error);
      }
      handleDialogClose()
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('Employee ID')}</TableCell>
            <TableCell>{t('Full Name')}</TableCell>
            <TableCell>{t('Phone')}</TableCell>
            <TableCell>{t('Address')}</TableCell>
            <TableCell>{t('Date of Birth')}</TableCell>
            <TableCell>{t('Join Date')}</TableCell>
            <TableCell>{t('Department')}</TableCell>
            <TableCell>{t('Bank Account Number')}</TableCell>
            <TableCell>{t('Bank Name')}</TableCell>
            <TableCell>{t('Basic Salary')}</TableCell>
            <TableCell>{t('Total Allowance')}</TableCell>
            <TableCell>{t('Action')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow hover key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{new Date(row.dateOfBirth).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(row.joinDate).toLocaleDateString()}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.bankDetails?.bankAccountNumber}</TableCell>
              <TableCell>{row.bankDetails?.bankName}</TableCell>
              <TableCell>{row.salaryDetails?.basicSalary}</TableCell>
              <TableCell>
                {[
                  row.salaryDetails?.overtimePay,
                  row.salaryDetails?.transportationCosts,
                  row.salaryDetails?.familyAllowance,
                  row.salaryDetails?.attendanceAllowance,
                  row.salaryDetails?.leaveAllowance,
                  row.salaryDetails?.specialAllowance,
                ].reduce((acc, allowance) => acc + (allowance || 0), 0)}
              </TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleActionClick(e, row)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleActionClose}>
                <MenuItem onClick={() => handleView(row)}>{t("View")}</MenuItem>
                  <MenuItem onClick={() => handleEdit(row)}>{t("Edit")}</MenuItem>
                  <MenuItem onClick={() => setOpenDialog(true)}>{t('Delete')}</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{t('Confirm Delete')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('Are you sure you want to delete this employee? This action cannot be undone.')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
            {t('Delete')}
          </Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} />
    </TableContainer>
  );
};

export default EmployeeTable;
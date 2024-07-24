import React, { useState } from "react";
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
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomSnackbar from "./CustomSnackbar";

const SalaryTable = ({ salaries, onDelete }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleActionClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
    setCurrentRow(null);
  };

  const handleView = (row) => {
    // onView(row.id);
    navigate(`/salary-details/view/${row.id}`);
    handleActionClose();
  };

  const handleEdit = (row) => {
    navigate(`/salary-details/edit/${row.id}`);
    handleActionClose();
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
        await onDelete(currentRow.id);
        setSnackbarMessage(t("actions.delete_success"));
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage(t("actions.delete_error"));
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.error("Failed to delete data", error);
      }
      handleDialogClose();
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("table.employeeId")}</TableCell>
              <TableCell>{t("table.firstName")}</TableCell>
              <TableCell>{t("table.lastName")}</TableCell>
              <TableCell>{t("table.totalEarnings")}</TableCell>
              <TableCell>{t("table.totalDeductions")}</TableCell>
              <TableCell>{t("table.netSalary")}</TableCell>
              <TableCell>{t("table.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salaries.map((salary) => (
              <TableRow key={salary.id}>
                <TableCell>{salary.employee.id}</TableCell>
                <TableCell>{salary.employee.firstName}</TableCell>
                <TableCell>{salary.employee.lastName}</TableCell>
                <TableCell>{salary.totalEarnings}</TableCell>
                <TableCell>{salary.totalDeductions}</TableCell>
                <TableCell>{salary.netSalary}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleActionClick(e, salary)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleActionClose}
                  >
                    <MenuItem onClick={() => handleView(currentRow)}>
                      {t("View")}
                    </MenuItem>
                    <MenuItem onClick={() => handleEdit(currentRow)}>
                      {t("Edit")}
                    </MenuItem>
                    <MenuItem onClick={() => setOpenDialog(true)}>
                      {t("Delete")}
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{t("Confirm Delete")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("DeleteConfirmationMessage")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            {t("Cancel")}
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

SalaryTable.propTypes = {
  salaries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      employee: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
      }).isRequired,
      totalEarnings: PropTypes.number.isRequired,
      totalDeductions: PropTypes.number.isRequired,
      netSalary: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SalaryTable;

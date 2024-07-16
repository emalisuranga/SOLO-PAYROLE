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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EmployeeTable = ({ data }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const navigate = useNavigate();

  const handleActionClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
    setCurrentRow(null);
  };

  const handleEdit = (row) => {
    console.log("Edit:", row);
    handleActionClose();
  };

  const handleDelete = (row) => {
    console.log("Delete:", row);
    handleActionClose();
  };

  const handleRowClick = (row) => {
    navigate(`/employee/${row.id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("Employee ID")}</TableCell>
            <TableCell>{t("Full Name")}</TableCell>
            <TableCell>{t("Phone")}</TableCell>
            <TableCell>{t("Address")}</TableCell>
            <TableCell>{t("Date of Birth")}</TableCell>
            <TableCell>{t("Join Date")}</TableCell>
            <TableCell>{t("Department")}</TableCell>
            <TableCell>{t("Bank Account Number")}</TableCell>
            <TableCell>{t("Bank Name")}</TableCell>
            <TableCell>{t("Basic Salary")}</TableCell>
            <TableCell>{t("Total Allowance")}</TableCell>
            <TableCell>{t("Action")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow hover key={row.id} onClick={() => handleRowClick(row)}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>
                {new Date(row.dateOfBirth).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(row.joinDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.bankDetails[0]?.bankAccountNumber}</TableCell>
              <TableCell>{row.bankDetails[0]?.bankName}</TableCell>
              <TableCell>{row.salaryDetails[0]?.basicSalary}</TableCell>
              <TableCell>
                {[
                  row.salaryDetails[0]?.overtimePay,
                  row.salaryDetails[0]?.transportationCosts,
                  row.salaryDetails[0]?.familyAllowance,
                  row.salaryDetails[0]?.attendanceAllowance,
                  row.salaryDetails[0]?.leaveAllowance,
                  row.salaryDetails[0]?.specialAllowance,
                ].reduce((acc, allowance) => acc + (allowance || 0), 0)}
              </TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleActionClick(e, row)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl && currentRow === row)}
                  onClose={handleActionClose}
                >
                  <MenuItem onClick={() => handleEdit(row)}>
                    {t("Edit")}
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(row)}>
                    {t("Delete")}
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;

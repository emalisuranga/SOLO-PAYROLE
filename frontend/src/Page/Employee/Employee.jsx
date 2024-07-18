import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, TextField, MenuItem, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EmployeeTable from './EmployeeTable';
import useEmployeeStore from '../../store/employeeStore';

const Employee = () => {
  const { t } = useTranslation();
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigate = useNavigate();

  const { employees, loading, fetchEmployees } = useEmployeeStore((state) => ({
    employees: state.employees,
    loading: state.loading,
    fetchEmployees: state.fetchEmployees,
  }));

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  const handleSearch = () => {
    console.log("handleSearch")
    console.log("searchId",searchId)
    console.log("item.id.toString()",employees.id)
    const filteredData = employees.filter(item =>
      (searchName === "" || item.firstName.toLowerCase().includes(searchName.toLowerCase()) || item.lastName.toLowerCase().includes(searchName.toLowerCase())) &&
      (searchId === "" || item.id.toString() === searchId.toString())
    );
    console.log("filteredData",filteredData)
    setFilteredEmployees(filteredData);
    // useEmployeeStore.setState({ filteredEmployees: filteredData });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">{t('Employee Details')}</Typography>
            <Button variant="contained" onClick={() => navigate("/addemployee")}>{t('addEmployee')}</Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label={t('name')}
              variant="outlined"
              value={searchName}
              size="small"
              onChange={(e) => setSearchName(e.target.value)}
            />
            <TextField
              label={t('ID')}
              variant="outlined"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              select
              size="small"
              sx={{ width: 100 }}  // Adjust the width here
            >
              {employees.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.id}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" onClick={handleSearch} sx={{ height: 40 }}>{t('Search')}</Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <EmployeeTable data={filteredEmployees} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Employee;
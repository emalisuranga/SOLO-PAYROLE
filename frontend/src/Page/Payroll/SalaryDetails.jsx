import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import useSalaryStore from '../../store/salaryStore'; // Assuming you have a salary store set up
import { useNavigate } from 'react-router-dom';
import Loading from '../../Component/Loading';
import Error from '../../Component/Error';
import SalaryTable from '../../Component/SalaryTable';

const SalaryDetails = () => {
  const navigate = useNavigate();
  const { salaries, fetchSalaryDetailsByMonth, deleteSalary, loading, error } = useSalaryStore();
  const [month, setMonth] = useState(new Date().getMonth()); // Current month
  const [year, setYear] = useState(new Date().getFullYear()); // Current year

  useEffect(() => {
    fetchSalaryDetailsByMonth(7, 2024);
    console.log(JSON.stringify(salaries))
  }, [month, year, fetchSalaryDetailsByMonth]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">従業員給与詳細</Typography>
            <Button variant="contained" onClick={() => navigate("/add-salary-details")}>給与の発生</Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            {/* Additional Search Filters */}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <SalaryTable 
            salaries={salaries} 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalaryDetails;
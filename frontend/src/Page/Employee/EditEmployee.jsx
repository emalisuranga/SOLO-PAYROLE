import React, { useEffect, useState } from "react";
import { Stack, CircularProgress, Box } from "@mui/material";
import { Typography } from "@mui/material";
import BackButton from "../../Component/BackButton";
import CustomTabs from "../../Component/CustomTabs";
import { useParams, useNavigate } from 'react-router-dom';
import useEmployeeStore from '../../store/employeeStore';
import getSections from '../../utils/sections';
import { useTranslation } from "react-i18next";

const EditEmployee = () => {
  const { id } = useParams();
  const { employee, fetchEmployeeDetails } = useEmployeeStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchEmployeeDetails(id);
      } catch (error) {
        console.error('Failed to fetch employee details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, fetchEmployeeDetails]);

  useEffect(() => {
    if (employee) {
      const sectionsData = getSections(employee);
      setSections(sectionsData);
    }
  }, [employee]);

  const handleSubmit = (formData) => {
    navigate('/employee');
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ mb: 2, mt: 2 }}
      >
        <BackButton />
        <Typography variant="h5">更新フォーム</Typography>
      </Stack>
      <CustomTabs sections={sections} mode="edit" initialData={employee} onSubmit={handleSubmit} />
    </React.Fragment>
  );
};

export default EditEmployee;
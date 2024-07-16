import React, { useEffect, useState } from "react";
import { Stack, CircularProgress, Box } from "@mui/material";
import { Typography } from "@mui/material";
import BackButton from "../../Component/BackButton";
import CustomTabs from "../../Component/CustomTabs";
import { useParams, useNavigate } from 'react-router-dom';
import useEmployeeStore from '../../store/employeeStore';
import getSections from '../../utils/sections';

const EditEmployee = () => {
  const { id } = useParams();
  const { employee, fetchEmployeeDetails } = useEmployeeStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchEmployeeDetails(id);
        if (employee) {
          const sectionsData = getSections(employee);
          setSections(sectionsData);
        }
      } catch (error) {
        console.error('Failed to fetch employee details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id,employee, fetchEmployeeDetails]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("Fetching employee details for ID:", id);
  //       await fetchEmployeeDetails(id);
  //       console.log("Employee details fetched:", employee);
  //     } catch (error) {
  //       console.error('Failed to fetch employee details:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchData();
  // }, [id, fetchEmployeeDetails]);
  
  // useEffect(() => {
  //   console.log("Employee state updated:");
  // });

  const handleSubmit = (formData) => {
    navigate('/employee');
  };

  //  const sections = getSections(employee);
  // console.log(sections)

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
      <CustomTabs sections={sections} onSubmit={handleSubmit} />
    </React.Fragment>
  );
};

export default EditEmployee;
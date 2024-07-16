import React from "react";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import BackButton from "../../Component/BackButton";
import CustomTabs from "../../Component/CustomTabs";
import getSections from '../../utils/sections';

const AddEmployee = () => {
  const handleSubmit = (formData) => {
  };
  const sections = getSections();

  return (
    <React.Fragment>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ mb: 2, mt: 2 }}
      >
        <BackButton />
        <Typography variant="h5">登録フォーム</Typography>
      </Stack>
      <CustomTabs sections={sections} onSubmit={handleSubmit} />
    </React.Fragment>
  );
};

export default AddEmployee;

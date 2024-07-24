import { styled } from '@mui/material/styles';
import { TableCell, Typography } from '@mui/material';

export const CustomTableCell = styled(TableCell)({
  border: "2px solid black",
  width: "150px",
  padding: "8px",
  boxSizing: "border-box"
});

export const SmallTypography = styled(Typography)({
  fontSize: '10px',
});
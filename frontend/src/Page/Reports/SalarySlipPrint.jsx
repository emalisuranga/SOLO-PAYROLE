import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Paper,
  Grid,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { generatePaymentText } from "../../utils/dateUtils";

const CustomTableCell = styled(TableCell)({
  border: "2px solid black",
  width: "150px",
  padding: "8px",
  boxSizing: "border-box",
  height: "50px",
});

const SalarySlipPrint = ({ salarySlip }) => {
  const paymentText = generatePaymentText(salarySlip.year, salarySlip.month);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        mt: 4,
      }}
    >
      <Paper
        id="salary-slip"
        sx={{
          width: "100%",
          maxWidth: "100%",
          p: 2,
        }}
      >
        <Table sx={{ width: "450px", height: 50 }}>
          <TableBody>
            <TableRow>
              <CustomTableCell>
                <Typography variant="h6" align="center">
                  株式会社SOLA
                </Typography>
              </CustomTableCell>
            </TableRow>
            <TableRow>
              <CustomTableCell>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">{paymentText}</Typography>
                  <Typography variant="body2">給料明細書</Typography>
                </Box>
              </CustomTableCell>
            </TableRow>
            <TableRow>
              <CustomTableCell>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1">{`${salarySlip.employee.firstName} ${salarySlip.employee.lastName}`}</Typography>
                  <Typography variant="body1">殿</Typography>
                </Box>
              </CustomTableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Box sx={{ mt: 4 }}>
          <Table sx={{ width: "250px" }}>
            <TableBody>
              <TableRow>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    部門名
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center"></Typography>
                </CustomTableCell>
              </TableRow>
              <TableRow>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    役職名
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center"></Typography>
                </CustomTableCell>
              </TableRow>
              <TableRow>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    社員NO
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    {`${salarySlip.employeeId}`}
                  </Typography>
                </CustomTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        <Grid container spacing={2} sx={{ mt: 6 }}>
          <Grid item xs={5}>
            <Typography variant="body2" align="left">
              {paymentText}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" align="left">
              給料明細書
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Table sx={{ width: 1000 }}>
            <TableBody>
              <TableRow>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    部門名
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography
                    variant="body2"
                    align="center"
                  >{`${salarySlip.employee.department}`}</Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    部門名
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography
                    variant="body2"
                    align="center"
                  >{`${salarySlip.employeeId}`}</Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    部門名
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography
                    variant="body2"
                    align="center"
                  >{`${salarySlip.employee.firstName} ${salarySlip.employee.lastName}`}</Typography>
                </CustomTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={8}>
            <Table sx={{ height: 100 }}>
              <TableBody>
                <TableRow>
                  <CustomTableCell rowSpan={4}>
                    <Typography variant="body2" align="center">
                      Row 1, Col 1
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 1, Col 2
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 1, Col 3
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 1, Col 4
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 1, Col 5
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 1, Col 6
                    </Typography>
                  </CustomTableCell>
                </TableRow>

                <TableRow>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 2, Col 2
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 2, Col 3
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 2, Col 4
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 2, Col 5
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 2, Col 6
                    </Typography>
                  </CustomTableCell>
                </TableRow>

                <TableRow>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 3, Col 2
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 3, Col 3
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 3, Col 4
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 3, Col 5
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 3, Col 6
                    </Typography>
                  </CustomTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>

          {/* Second Table */}
          <Grid item xs={4}>
            <Table>
              <TableBody>
                {/* First Row */}
                <TableRow>
                  <CustomTableCell rowSpan={3}>
                    <Typography variant="body2" align="center">
                      Row 1, Col 1
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 1, Col 2
                    </Typography>
                  </CustomTableCell>
                </TableRow>

                {/* Second Row */}
                <TableRow>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 2, Col 2
                    </Typography>
                  </CustomTableCell>
                </TableRow>

                {/* Third Row */}
                <TableRow>
                  <CustomTableCell>
                    <Typography variant="body2" align="center">
                      Row 3, Col 2
                    </Typography>
                  </CustomTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>

        <Grid sx={{ mt: 2 }}>
          <Table sx={{ height: 100 }}>
            <TableBody>
              {/* First Row */}
              <TableRow>
                <CustomTableCell rowSpan={4}>
                  <Typography variant="body2" align="center">
                    Row 1, Col 1
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 2
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 3
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 4
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 6
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 6
                  </Typography>
                </CustomTableCell>
              </TableRow>

              {/* Second Row */}
              <TableRow>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 2
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 3
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 4
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 6
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 6
                  </Typography>
                </CustomTableCell>
              </TableRow>

              {/* Third Row */}
              <TableRow>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 3, Col 2
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 3, Col 3
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 3, Col 4
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 3, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 3, Col 6
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 6
                  </Typography>
                </CustomTableCell>
              </TableRow>
              <TableRow>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 2
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 3
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 4
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 6
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 6
                  </Typography>
                </CustomTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>

        <Grid sx={{ mt: 2 }}>
          <Table sx={{ height: 100 }}>
            <TableBody>
              {/* First Row */}
              <TableRow>
                <CustomTableCell rowSpan={4}>
                  <Typography variant="body2" align="center">
                    Row 1, Col 1
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 2
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 3
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 4
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 6
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 6
                  </Typography>
                </CustomTableCell>
              </TableRow>

              {/* Second Row */}
              <TableRow>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 2
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 3
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 4
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 6
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 6
                  </Typography>
                </CustomTableCell>
              </TableRow>

              {/* Third Row */}
              <TableRow>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 3, Col 2
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 3, Col 3
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 3, Col 4
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 3, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 3, Col 6
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 6
                  </Typography>
                </CustomTableCell>
              </TableRow>
              <TableRow>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 2
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 3
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 4
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 2, Col 6
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 5
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" align="center">
                    Row 1, Col 6
                  </Typography>
                </CustomTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <TextField
          type="text"
          label="備考"
          name="remarks"
          value=""
          fullWidth
          sx={{ mt: 4 }}
          rows={15}
          maxRows={15}
        />
      </Paper>
      {/* 
      <Button
        onClick={exportAsPDF}
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
      >
        Export as PDF
      </Button> */}
    </Box>
  );
};

export default SalarySlipPrint;

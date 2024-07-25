import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableRow,
  Box,
  Paper,
  Grid,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import useSalarySlipStore from "../../../store/salarySlipStore";
import Loading from "../../../Component/Common/Loading";
import {
  CustomTableCell,
  SmallTypography,
  VerticalTableCell,
} from "./SalarySlipDetails.styles";
import { generatePaymentText } from "../../../utils/dateUtils";
import SalarySlipPrint from "../SalarySlipPrint";

const SalarySlipDetails = () => {
  const { employeeId, paymentDetailsId } = useParams();
  const { salarySlip, loading, error, fetchSalarySlipDetails } =
    useSalarySlipStore();

  useEffect(() => {
    fetchSalarySlipDetails(
      parseInt(employeeId, 10),
      parseInt(paymentDetailsId, 10)
    );
  }, [employeeId, paymentDetailsId, fetchSalarySlipDetails]);

  const paymentText = salarySlip
    ? generatePaymentText(salarySlip.year, salarySlip.month)
    : "";

  // const exportAsPDF = async () => {
  //   const input = document.getElementById("salary-slip");

  //   // Capture the element as a canvas
  //   const canvas = await html2canvas(input, {
  //     scale: 2,
  //   });

  //   const imgData = canvas.toDataURL("image/png");

  //   // A4 size in points (1 point = 1/72 inch)
  //   const a4Width = 595.28;
  //   const a4Height = 841.89;

  //   // Get the dimensions of the input element
  //   const rect = input.getBoundingClientRect();
  //   const elementWidth = rect.width;
  //   const elementHeight = rect.height;

  //   // Calculate scale to fit the element within A4 dimensions
  //   const scaleX = a4Width / elementWidth;
  //   const scaleY = a4Height / elementHeight;
  //   const scale = Math.min(scaleX, scaleY);

  //   const pdfWidth = elementWidth * scale;
  //   const pdfHeight = elementHeight * scale;

  //   // Create a new PDF document with A4 dimensions
  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "pt",
  //     format: [a4Width, a4Height],
  //   });

  //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save("salary-slip.pdf");
  // };

  const exportAsPDF = async () => {
    const input = document.getElementById("salary-slip");
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    pdf.addImage(imgData, "PNG", 0, 0, 595.28, 841.89); // A4 dimensions
    pdf.save("salary-slip.pdf");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loading />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }
  if (!salarySlip) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        mt: 2,
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
                <Typography variant="body2" align="center">
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
                  <SmallTypography variant="body2">
                    {paymentText}
                  </SmallTypography>
                  <SmallTypography variant="body2">給料明細書</SmallTypography>
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
                  <SmallTypography variant="body1">{`${salarySlip.employee.firstName} ${salarySlip.employee.lastName}`}</SmallTypography>
                  <SmallTypography variant="body1">殿</SmallTypography>
                </Box>
              </CustomTableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Box sx={{ mt: 1 }}>
          <Table sx={{ width: "250px" }}>
            <TableBody>
              <TableRow>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    部門名
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
              </TableRow>
              <TableRow>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    役職名
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
              </TableRow>
              <TableRow>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    社員NO
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.employeeId}`}
                  </SmallTypography>
                </CustomTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={5}>
            <SmallTypography variant="body2" align="left">
              {paymentText}
            </SmallTypography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="left">
              給料明細書
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Table sx={{ width: 1000 }}>
            <TableBody>
              <TableRow>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    部門名
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.employee.department}`}
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    社員NO
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  >{`${salarySlip.employeeId}`}</SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    氏名
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  >{`${salarySlip.employee.firstName} ${salarySlip.employee.lastName}`}</SmallTypography>
                </CustomTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        <Grid container columnSpacing={{ md: 30 }} sx={{ mt: 1 }}>
          <Grid item xs={8}>
            <Table sx={{ height: 100, width: "100%" }}>
              <TableBody>
                <TableRow>
                  <VerticalTableCell rowSpan={4}>
                    <SmallTypography variant="body2" align="center">
                      勤怠
                    </SmallTypography>
                  </VerticalTableCell>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      所定労働日数/Scheduled working days
                    </SmallTypography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      出勤日数
                    </SmallTypography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      法定時間外/Overtime
                    </SmallTypography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      遅刻時間
                    </SmallTypography>
                  </CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      {`${salarySlip.workDetails.scheduledWorkingDays}`}
                    </SmallTypography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      {`${salarySlip.workDetails.numberOfWorkingDays}`}
                    </SmallTypography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      {`${salarySlip.workDetails.overtime}`}
                    </SmallTypography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      {`${salarySlip.workDetails.timeLate}`}
                    </SmallTypography>
                  </CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      早退時間
                    </SmallTypography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      控除時間/Deductions
                    </SmallTypography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      有給休暇日数/Number of paid holidays
                    </SmallTypography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      残有給日数
                    </SmallTypography>
                  </CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      {`${salarySlip.workDetails.timeLeavingEarly}`}
                    </SmallTypography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      {`${salarySlip.workDetails.timeLeavingEarly}`}
                    </SmallTypography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      {`${salarySlip.workDetails.numberOfPaidHolidays}`}
                    </SmallTypography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <SmallTypography variant="body2" align="center">
                      {`${salarySlip.workDetails.remainingPaidVacationDays}`}
                    </SmallTypography>
                  </CustomTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>

          <Grid item xs={4}>
            <Table sx={{ height: 100, width: "100%" }}>
              <TableBody>
                <TableRow>
                  <CustomTableCell>
                    <Typography variant="h6" align="center">
                      差引支給額
                    </Typography>
                  </CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell>
                    <Typography variant="h6" align="center">
                      {`${salarySlip.netSalary}`}
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
                <VerticalTableCell rowSpan={4}>
                  <SmallTypography variant="body2" align="center">
                    支給
                  </SmallTypography>
                </VerticalTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    役員報酬
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    残業手当/overtime pay
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    交通費/Transportation costs
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    家族手当/Family allowance
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    精勤手当
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
              </TableRow>

              {/* Second Row */}
              <TableRow>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    Executive Remuneration
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.earnings.overtimePay}`}
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.earnings.transportationCosts}`}
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.earnings.familyAllowance}`}
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.earnings.attendanceAllowance}`}
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
              </TableRow>

              {/* Third Row */}
              <TableRow>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    特別手当/Special allowance
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    不就労控除/Non-employment deduction
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    総支給額
                  </SmallTypography>
                </CustomTableCell>
              </TableRow>
              <TableRow>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.earnings.specialAllowance}`}
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    不就労控除/Non-employment deduction
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.totalEarnings}`}
                  </SmallTypography>
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
                <VerticalTableCell rowSpan={4}>
                  <SmallTypography variant="body2" align="center">
                    控除
                  </SmallTypography>
                </VerticalTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    介護保険
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    健康保険
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    厚生年金
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    雇用保険
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    社会保険料計
                  </SmallTypography>
                </CustomTableCell>
              </TableRow>

              {/* Second Row */}
              <TableRow>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.deductions.longTermCareInsurance}`}
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.deductions.healthInsurance}`}
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.deductions.employeePensionInsurance}`}
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.deductions.employmentInsurance}`}
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {salarySlip.deductions.longTermCareInsurance +
                      salarySlip.deductions.healthInsurance +
                      salarySlip.deductions.employeePensionInsurance +
                      salarySlip.deductions.employmentInsurance}
                  </SmallTypography>
                </CustomTableCell>
              </TableRow>

              {/* Third Row */}
              <TableRow>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    年末調整
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    住民税
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    前払金
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    還付金等
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    所得税
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    控除計
                  </SmallTypography>
                </CustomTableCell>
              </TableRow>
              <TableRow>
                <CustomTableCell>
                  <SmallTypography
                    variant="body2"
                    align="center"
                  ></SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.deductions.yearEndAdjustment}`}
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.deductions.residentTax}`}
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.deductions.advancePayment}`}
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.deductions.yearEndAdjustment}`}
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {`${salarySlip.deductions.incomeTax}`}
                  </SmallTypography>
                </CustomTableCell>
                <CustomTableCell>
                  <SmallTypography variant="body2" align="center">
                    {salarySlip.deductions.yearEndAdjustment +
                      salarySlip.deductions.residentTax +
                      salarySlip.deductions.advancePayment +
                      salarySlip.deductions.yearEndAdjustment +
                      salarySlip.deductions.incomeTax}
                  </SmallTypography>
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

      <Box
        id="salary-slip"
        sx={{ position: "absolute", top: "-10000px", left: "-10000px" }}
      >
        <SalarySlipPrint salarySlip={salarySlip} />
      </Box>

      <Button
        onClick={exportAsPDF}
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
      >
        Export as PDF
      </Button>
    </Box>
  );
};

export default SalarySlipDetails;

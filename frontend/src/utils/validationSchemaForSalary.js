import * as Yup from "yup";

export const getSalaryValidationSchema = (t) => {
  return Yup.object().shape({
    scheduledWorkingDays: Yup.number()
      .typeError(
        t("validation.number", { field: t("fields.scheduledWorkingDays") })
      )
      .required(
        t("validation.required", { field: t("fields.scheduledWorkingDays") })
      ),
    numberOfWorkingDays: Yup.number()
      .typeError(
        t("validation.number", { field: t("fields.numberOfWorkingDays") })
      )
      .required(
        t("validation.required", { field: t("fields.numberOfWorkingDays") })
      ),
    numberOfPaidHolidays: Yup.number()
      .typeError(
        t("validation.number", { field: t("fields.numberOfPaidHolidays") })
      )
      .required(
        t("validation.required", { field: t("fields.numberOfPaidHolidays") })
      ),
    remainingPaidVacationDays: Yup.number()
      .typeError(
        t("validation.number", { field: t("fields.remainingPaidVacationDays") })
      )
      .required(
        t("validation.required", {
          field: t("fields.remainingPaidVacationDays"),
        })
      ),
    overtime: Yup.number()
      .typeError(t("validation.number", { field: t("fields.overtime") }))
      .required(t("validation.required", { field: t("fields.overtime") })),
    timeLate: Yup.number()
      .typeError(t("validation.number", { field: t("fields.timeLate") }))
      .required(t("validation.required", { field: t("fields.timeLate") })),
    timeLeavingEarly: Yup.number()
      .typeError(
        t("validation.number", { field: t("fields.timeLeavingEarly") })
      )
      .required(
        t("validation.required", { field: t("fields.timeLeavingEarly") })
      ),
    overtimePay: Yup.number()
      .typeError(t("validation.number", { field: t("fields.overtimePay") }))
      .required(t("validation.required", { field: t("fields.overtimePay") })),
    transportationCosts: Yup.number()
      .typeError(
        t("validation.number", { field: t("fields.transportationCosts") })
      )
      .required(
        t("validation.required", { field: t("fields.transportationCosts") })
      ),
    attendanceAllowance: Yup.number()
      .typeError(
        t("validation.number", { field: t("fields.attendanceAllowance") })
      )
      .required(
        t("validation.required", { field: t("fields.attendanceAllowance") })
      ),
    familyAllowance: Yup.number()
      .typeError(t("validation.number", { field: t("fields.familyAllowance") }))
      .required(
        t("validation.required", { field: t("fields.familyAllowance") })
      ),
    leaveAllowance: Yup.number()
      .typeError(t("validation.number", { field: t("fields.leaveAllowance") }))
      .required(
        t("validation.required", { field: t("fields.leaveAllowance") })
      ),
    specialAllowance: Yup.number()
      .typeError(
        t("validation.number", { field: t("fields.specialAllowance") })
      )
      .required(
        t("validation.required", { field: t("fields.specialAllowance") })
      ),
    healthInsurance: Yup.number()
      .typeError(t("validation.number", { field: t("fields.healthInsurance") }))
      .required(
        t("validation.required", { field: t("fields.healthInsurance") })
      ),
    employeePensionInsurance: Yup.number()
      .typeError(
        t("validation.number", { field: t("fields.employeePensionInsurance") })
      )
      .required(
        t("validation.required", {
          field: t("fields.employeePensionInsurance"),
        })
      ),
    employmentInsurance: Yup.number()
      .typeError(
        t("validation.number", { field: t("fields.employmentInsurance") })
      )
      .required(
        t("validation.required", { field: t("fields.employmentInsurance") })
      ),
    longTermCareInsurance: Yup.number()
      .typeError(
        t("validation.number", { field: t("fields.longTermCareInsurance") })
      )
      .required(
        t("validation.required", { field: t("fields.longTermCareInsurance") })
      ),
    socialInsurance: Yup.number()
      .typeError(t("validation.number", { field: t("fields.socialInsurance") }))
      .required(
        t("validation.required", { field: t("fields.socialInsurance") })
      ),
    incomeTax: Yup.number()
      .typeError(t("validation.number", { field: t("fields.incomeTax") }))
      .required(t("validation.required", { field: t("fields.incomeTax") })),
    residentTax: Yup.number()
      .typeError(t("validation.number", { field: t("fields.residentTax") }))
      .required(t("validation.required", { field: t("fields.residentTax") })),
    advancePayment: Yup.number()
      .typeError(t("validation.number", { field: t("fields.advancePayment") }))
      .required(
        t("validation.required", { field: t("fields.advancePayment") })
      ),
    yearEndAdjustment: Yup.number()
      .typeError(
        t("validation.number", { field: t("fields.yearEndAdjustment") })
      )
      .required(
        t("validation.required", { field: t("fields.yearEndAdjustment") })
      ),
  });
};

import * as Yup from "yup";

const getValidationSchema = (t) => {
  return Yup.object().shape({
    firstName: Yup.string()
      .matches(
        /^[A-Za-z\s]+$/,
        t("validation.lettersOnly", { field: t("fields.firstName") })
      )
      .required(t("validation.required", { field: t("fields.firstName") })),
    lastName: Yup.string()
      .matches(
        /^[A-Za-z\s]+$/,
        t("validation.lettersOnly", { field: t("fields.lastName") })
      )
      .required(t("validation.required", { field: t("fields.lastName") })),
    phone: Yup.string()
      .matches(/^\d{11}$/, t("validation.phoneDigits"))
      .required(t("validation.required", { field: t("fields.phone") })),
    address: Yup.string().required(
      t("validation.required", { field: t("fields.address") })
    ),
    dateOfBirth: Yup.date()
      .required(t("validation.required", { field: t("fields.dateOfBirth") }))
      .typeError(t("validation.invalidDate", { field: t("fields.dateOfBirth") })),
    joinDate: Yup.date()
      .required(t("validation.required", { field: t("fields.joinDate") }))
      .typeError(t("validation.invalidDate", { field: t("fields.joinDate") })),
    department: Yup.string().required(
      t("validation.required", { field: t("fields.department") })
    ),
    bankAccountNumber: Yup.number()
      .typeError(
        t("validation.number", { field: t("fields.bankAccountNumber") })
      )
      .required(
        t("validation.required", { field: t("fields.bankAccountNumber") })
      ),
    bankName: Yup.string()
      .matches(
        /^[A-Za-z\s]+$/,
        t("validation.lettersOnly", { field: t("fields.bankName") })
      )
      .required(t("validation.required", { field: t("fields.bankName") })),
    branchCode: Yup.number()
      .typeError(t("validation.number", { field: t("fields.branchCode") }))
      .required(t("validation.required", { field: t("fields.branchCode") })),
    basicSalary: Yup.number()
      .typeError(t("validation.number", { field: t("fields.basicSalary") }))
      .required(t("validation.required", { field: t("fields.basicSalary") })),
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
    familyAllowance: Yup.number()
      .typeError(t("validation.number", { field: t("fields.familyAllowance") }))
      .required(
        t("validation.required", { field: t("fields.familyAllowance") })
      ),
    attendanceAllowance: Yup.number()
      .typeError(
        t("validation.number", { field: t("fields.attendanceAllowance") })
      )
      .required(
        t("validation.required", { field: t("fields.attendanceAllowance") })
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
  });
};

export default getValidationSchema;
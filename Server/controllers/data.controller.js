const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

// Connect to the database
connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

// Controller function to save data
exports.saveData = (req, res) => {
  const data = req.body;

  const personalInfo = [
    data.firstName,
    data.lastName,
    data.phone,
    data.address,
    data.dateOfBirth,
    data.joinDate,
    data.department
  ];

  const bankDetails = [
    data.bankAccountNumber,
    data.bankName,
    data.branchCode
  ];

  const salaryDetails = [
    data.basicSalary,
    data.overtimePay,
    data.transportationCosts,
    data.familyAllowance,
    data.attendanceAllowance,
    data.leaveAllowance,
    data.specialAllowance
  ];

  // Insert data into the database
  connection.query(
    `INSERT INTO personal_info (firstName, lastName, phone, address, dateOfBirth, joinDate, department) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    personalInfo,
    (error, results) => {
      if (error) {
        res.status(500).send({
          message: "Error saving personal information",
          error: error.message
        });
        return;
      }

      connection.query(
        `INSERT INTO bank_details (bankAccountNumber, bankName, branchCode) VALUES (?, ?, ?)`,
        bankDetails,
        (error, results) => {
          if (error) {
            res.status(500).send({
              message: "Error saving bank details",
              error: error.message
            });
            return;
          }

          connection.query(
            `INSERT INTO salary_details (basicSalary, overtimePay, transportationCosts, familyAllowance, attendanceAllowance, leaveAllowance, specialAllowance) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            salaryDetails,
            (error, results) => {
              if (error) {
                res.status(500).send({
                  message: "Error saving salary details",
                  error: error.message
                });
                return;
              }

              res.status(200).send({
                message: "Data saved successfully"
              });
            }
          );
        }
      );
    }
  );
};

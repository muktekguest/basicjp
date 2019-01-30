const { Router } = require("express");

const app = Router();

const Companies = require("../controllers/Companies");
const Employees = require("../controllers/Employee");

app.route("/companies")
  .get(Companies.index)
  .post(Companies.create);

app.route("/employees/:employeeId")
  .put(Employees.update);

app.route("/companies/:companyId/employees")
  .get(Companies.getEmployees);

app.route("/employees")
  .get(Employees.index)
  .post(Employees.create);

app.route("/employees/:employeeId")
  .delete(Employees.deleteById);

module.exports = app;

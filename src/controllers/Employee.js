const ODM = require("mongoose");

const Employee = require("../models/Employee");
const Company = require("../models/Company");

const Employees = {
  index: (request, response) => {
    Employee
      .find()
      .populate("company")
      .exec()
      .then(employees => {
        response
          .status(200)
          .json({
            meta: employees.length,
            data: employees
          });
      })
      .catch(error => console.log(error));
  },

  create: (request, response) => {
    const newEmployee = new Employee({
      _id: new ODM.Types.ObjectId(),
      name: request.body.name,
      age: request.body.age,
      company: request.body.companyId
    });

    // console.log(newEmployee);

    // Company
    //   .findById(request.body.companyId)
    //   .exec()
    //   .then(companyFound => {
    //     console.log(companyFound);
    //
    //     response
    //       .status(200)
    //       .json({
    //         data: companyFound
    //       });
    //   })

    //
    newEmployee
      .save()
      .then(newEmployee => {
        Company
          .findById(request.body.companyId)
          .exec()
          .then(company => {
            company.employees.push(newEmployee._id);
            company.save();

            // console.log("newEmployee: ", newEmployee);
            // console.log("companies: ", company);

            response
              .status(201)
              .json({
                type: "POST request",
                data: newEmployee
              });
          });
      })
      .catch(error => console.log(error));
  },

  deleteById: (request, response) => {
    Employee
      .findOneAndDelete(request.params.employeeId)
      .then(employeeDeleted => {
        response
          .status(200)
          .json({
            type: "DELETE request",
            data: {
              message: "The employee was deleted"
            }
          });
      })
      .catch(error => console.log(error));
  },

  update: (request, response) => {
    const { employeeId } = request.params;

    Employee
      .findByIdAndUpdate(employeeId, {
        $set: { name: request.body.name }
      }, {
        new: true
      })
      .exec()
      .then(newEmployee => {
        response
          .status(200)
          .json({
            type: "PATCH request",
            data: newEmployee
          });
      })
      .catch(error => console.log(error));
  }
};

module.exports = Employees;

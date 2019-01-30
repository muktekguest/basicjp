const ODM = require("mongoose");

const Company = require("../models/Company");

const Companies = {
  index: (request, response) => {
    Company
      .find()
      .exec()
      .then(companies => {
        response
          .status(200)
          .json({
            meta: companies.length,
            data: companies
          });
      })
      .catch(error => console.error(error));
  },

  create: (request, response) => {
    const newCompany = new Company({
      _id: new ODM.Types.ObjectId(),
      name: request.body.name
    });

    newCompany
      .save()
      .then(newCompany => {
        response
          .status(201)
          .json({
            type: "POST Request",
            data: newCompany
          });
      })
      .catch(error => console.log(error));
  },

  getEmployees: (request, response) => {
    const { companyId } = request.params;

    Company
      .findById(companyId)
      .populate("employees")
      .exec()
      .then(company => {
        response
          .status(200)
          .json({
            data: company.employees
          });
      })
      .catch(error => console.log(error));
  }
};

module.exports = Companies;

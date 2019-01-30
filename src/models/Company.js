const ODM = require("mongoose");

const Schema = new ODM.Schema({
  _id: ODM.Schema.Types.ObjectId,
  name: String,
  employees: [{
    type: ODM.Schema.Types.ObjectId,
    ref: "Employee"
  }]
}, { versionKey: false });

module.exports = ODM.model("Company", Schema);

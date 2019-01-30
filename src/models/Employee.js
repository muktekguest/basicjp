const ODM = require("mongoose");

const Schema = new ODM.Schema({
  _id: ODM.Schema.Types.ObjectId,
  name: String,
  age: Number,
  company: {
    type: ODM.Schema.Types.ObjectId,
    ref: "Company"
  }
}, { versionKey: false, timestamps: true });

module.exports = ODM.model("Employee", Schema);

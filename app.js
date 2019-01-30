require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const ODM = require("mongoose");
const cors = require("cors");

const api = require("./src/routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${ process.env.MONGODB_DATABASE }`;

ODM.connect(MONGODB_URI, {
  useNewUrlParser: true
});

ODM.connection.on("connected", () => {
  const formattedMessage = {
    host: MONGODB_URI,
    success: true
  };

  console.log("Connected...");
});


app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use("/api/v1", api);

app.listen(PORT, () => {
  console.log(`REST API server running on PORT: ${ PORT }`);
});

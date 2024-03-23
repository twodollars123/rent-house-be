require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

//init middleware
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//init db
require("./dbs/init.postgres.lv0")
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });
//init routes
app.use("", require("./routes"));
//handle error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: error.stack,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;

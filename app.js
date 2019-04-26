var createError = require("http-errors");
var express = require("express");
import mongoose from "mongoose";
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
var dotenv = require("dotenv").config();

import Routes from "./app/routes";
var app = express();

// Swagger Init
const expressSwagger = require("express-swagger-generator")(app);
expressSwagger({
  swaggerDefinition: {
    info: {
      title: process.env.SWAGGER_TITLE,
      description: process.env.SWAGGER_DESCRIPTION,
      version: process.env.SWAGGER_VERSION
    },
    host: process.env.SWAGGER_API_HOST,
    consumes: ["application/json"],
    produces: ["application/json"],
    schemes: ["http", "https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Authentication Token for NodeJS API Boilerplate"
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ["./app/routes/*.js"] //Path to the API handle folder
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(res => console.log("mongoose=======connection"))
  .catch(e => console.warn("mongoose error", e));

// Express Settings
app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CORS Addtiion
app.use(cors());
app.options("*", cors());

// File Upload Limits
app.use(bodyParser.json({ limit: "128mb" }));
app.use(bodyParser.urlencoded({ limit: "128mb", extended: true }));

// Routes Init
Routes(app);

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
/**
 * Sample Request to Tutoriasl app
 * @group Users
 * @route GET /api/
 */
app.get("/", (req, res) => res.send(`<h1>Tutable app ${env} environment</h1>`));

const port = process.env.NODE_ENV === "development" ? 3003 : 3002;

app.listen(port, () => console.log(`Backend is running on port ${port}`));
app.listen(3000,"172.24.7.151",()=>console.log("Backend is running on port 172.24.7.151:3000"))

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500).send({
//     status: err.status,
//     message: err.message
//   });
// });

// module.exports = app;

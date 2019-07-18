var createError = require("http-errors");
var express = require("express");
import mongoose from "mongoose";
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
var dotenv = require("dotenv").config();
var ip = require('ip');
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
// app.use(express.static(path.join(__dirname, "public")));

// CORS Addtiion
app.use(cors());
app.options("*", cors());

// File Upload Limits
app.use(bodyParser.json({ limit: "128mb" }));
app.use(bodyParser.urlencoded({ limit: "128mb", extended: true }));

// Routes Init
Routes(app);
app.get("/",(req,res)=>{
  res.send(`<div><h1>Api Server</h1><h2>@author Suraj Sanwal</h2><h3>Documentation Link <a href='http://${systemIP}:${port}/api-docs'>Api Docs</a></h3></div>`);
})
const systemIP=ip.address();
const port = process.env.NODE_ENV === "development" ? 3003 : 3002;

app.listen(port, () => console.log(`Backend is running on port http://localhost:${port}`));
app.listen(port,systemIP,()=>console.log(`Backend is running on port http://${systemIP}:${port}`))



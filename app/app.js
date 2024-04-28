const express = require("express");
const routes = require("./routes");
const { notFoundHandler, globalErrorhandler } = require("./errors");
const middleware = require('./middleware');
const connectDB = require("../db/connectDB");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocs = YAML.load("./swagger.yaml");

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Express App with Swagger',
        version: '1.0.0',
        description: 'A sample API to demonstrate how swagger works'
      },
      server: [
        {
            url: "http://localhost:800"
        }
      ]
    },
    apis: ['./app/routes*.js'], // files containing annotations as above
  };

const app = express();

//db connection
connectDB();

const swaggerSpecifications = swaggerJsdoc(swaggerOptions)

//swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 

//routes
app.use(middleware)
app.use(routes)
app.use(notFoundHandler)
app.use(globalErrorhandler)

module.exports = app;
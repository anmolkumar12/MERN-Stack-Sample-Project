const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { app_port, node_env } = require("./src/config/config");
const logger = require("./src/core/Logger");
const { LoggerStream } = require("./src/core/Logger");
const responseHandler = require("./src/core/ResponseHandler");
const CustomException = require("./src/core/customExceptions");
const morgan = require("morgan");
require("./src/database");
const app = express();

app.use(express.json({ limit: 1024000 }));
// Global error handler for uncaught exceptions

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

// Global error handler for unhandled promise rejections

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

// db.initConnection()
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

require("./src/routes/customer")(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  logger.error(`API Not Found! : ${req.url || req.originalUrl}`);
  res.status(404).send("Not Found");
});

app.use(responseHandler.handleError);

// HTTP request logging middleware using Morgan
app.use(
  morgan(node_env === "production" ? "combined" : "dev", {
    stream: new LoggerStream(),
    skip: (req, res) => res.statusCode < 400,
    format:
      ":date[iso] :method :url :status :res[content-length] :response-time ms",
  })
);

app.listen(app_port, () => {
  logger.info(`Express server listening on ${app_port}, in ${node_env} mode`);
});

module.exports = app;

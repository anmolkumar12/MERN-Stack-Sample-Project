const winston = require("winston");
const fs = require("fs");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path"); // Added for path handling
const appRoot = require("app-root-path");
const moment = require("moment");
const config = require("../config/config");

// Assuming you have a way to access environment and logDirectory
const environment = config.node_env || process.env.NODE_ENV; // Example using environment variable
const logDirectory = path.join(appRoot.path, "logs"); // Example using path.join

const dir = logDirectory;

// Create the directory if it doesn't exist (asynchronously)
fs.promises.mkdir(dir, { recursive: true }).catch((err) => {
  if (err.code !== "EEXIST") {
    throw err; // Only rethrow if it's not a "directory already exists" error
  }
});

const logLevel = environment === "development" ? "debug" : "info";

const options = {
  file: {
    level: logLevel,
    filename: path.join(dir, "%DATE%.log"), // Use path.join for consistent paths
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: false,
    maxSize: "20m",
    colorize: true,
    maxFiles: "14d",
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: logLevel,
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(
          (info) =>
            `[${moment(info.timestamp).format("llll")}] ${info.level}: ${
              info.message
            }`
        )
      ),
      handleExceptions: true,
    }),
    new winston.transports.Http({
      level: logLevel,
      format: winston.format.json(),
    }),
  ],
  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false, // Do not exit on handled exceptions
});

if (environment === "production") {
  options.file.filename = path.join(dir, "server", "%DATE%.log");
  logger.add(new DailyRotateFile(options.file));
}

module.exports = logger;

class LoggerStream {
  write(message) {
    logger.info(message.substring(0, message.lastIndexOf("\n")));
  }
}

module.exports.LoggerStream = LoggerStream;

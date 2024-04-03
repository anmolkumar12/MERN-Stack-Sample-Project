const config = require("../config/config.js");
const mongoose = require("mongoose");
const Logger = require("../core/Logger.js");

const username = encodeURIComponent(config.db.user);
const password = encodeURIComponent(config.db.password);

const uri = `mongodb+srv://${username}:${password}@cluster0.pqdwwts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => Logger.info("Connected to MongoDB with Mongoose!"))
  .catch((error) => Logger.error("Error connecting to MongoDB:", error));

module.exports = mongoose.connection; // Export the connection for use in other modules

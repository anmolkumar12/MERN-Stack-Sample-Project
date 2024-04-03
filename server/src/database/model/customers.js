const { model, Schema } = require("mongoose");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
const contactRegex = /^\d{10}$/; // Regular expression for 10-digit contact number validation

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [emailRegex, "Please enter a valid email address"],
  },
  contact: {
    type: String,
    required: true,
    trim: true,
    match: [contactRegex, "Please enter a valid 10-digit contact number"],
  },
});

const UserModel = model("Customer", CustomerSchema);

module.exports = UserModel;

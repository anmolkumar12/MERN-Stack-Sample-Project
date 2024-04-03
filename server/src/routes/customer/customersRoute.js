const express = require("express");
const app = express.Router();
const responseHandler = require("../../core/ResponseHandler");
const customersController = require("../../controller/customersController");
const { validate } = require("../../helper/validator");
const customerSchema = require("../customer/customerSchema");

// create operation
app.post("/create", validate(customerSchema), async (req, res, next) => {
  try {
    console.log(JSON.stringify(req.body));
    const result = await customersController.createCustomer(req.body);
    responseHandler.sendSuccess(res, result);
  } catch (error) {
    responseHandler.sendError(res, error);
  }
});

// get operation
app.get("/read", async (req, res, next) => {
  try {
    const result = await customersController.getAllCustomers();
    responseHandler.sendSuccess(res, result);
  } catch (error) {
    responseHandler.sendError(res, error);
  }
});

// get operation by id
app.get("/read/:customerId", async (req, res, next) => {
  try {
    const customerId = req.params?.customerId;
    const result = await customersController.getCustomerById(customerId);
    responseHandler.sendSuccess(res, result);
  } catch (error) {
    responseHandler.sendError(res, error);
  }
});

// Update operation
app.put("/update/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const updatedData = req.body;
    const result = await customersController.updateCustomer(
      customerId,
      updatedData
    );
    responseHandler.sendSuccess(res, result);
  } catch (error) {
    responseHandler.sendError(res, error);
  }
});

// Delete operation
app.delete("/delete/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const result = await customersController.deleteCustomer(customerId);
    responseHandler.sendSuccess(res, result);
  } catch (error) {
    responseHandler.sendError(res, error);
  }
});

module.exports = app;

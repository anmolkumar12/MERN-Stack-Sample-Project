const customersDao = require("../dao/customerDao");
const exceptions = require("../core/customExceptions");
const messages = require("../messages");

module.exports = {
  createCustomer: async (body) => {
    try {
      await customersDao.createCustomer(body);
      return messages.recordCreated;
    } catch (error) {
      throw new Error(error);
    }
  },

  getAllCustomers: async () => {
    try {
      const customersData = await customersDao.getAllCustomers();
      return {
        data: customersData,
      };
    } catch (e) {
      throw exceptions.badRequestError(messages.invalidRequest);
    }
  },
  getCustomerById: async (id) => {
    try {
      const customerData = await customersDao.getCustomerById(id);
      return {
        data: customerData,
      };
    } catch (e) {
      throw exceptions.badRequestError(messages.invalidRequest);
    }
  },

  updateCustomer: async (customerId, updatedData) => {
    try {
      const customerData = await customersDao.updateCustomer(
        customerId,
        updatedData
      );
      return {
        data: customerData,
      };
    } catch (e) {
      throw exceptions.badRequestError(messages.invalidRequest);
    }
  },

  deleteCustomer: async (customerId) => {
    try {
      const customerData = await customersDao.deleteCustomerById(customerId);
      return {
        data: customerData,
      };
    } catch (e) {
      throw exceptions.badRequestError(messages.invalidRequest);
    }
  },
};

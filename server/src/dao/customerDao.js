const Customer = require("../database/model/customers.js");

module.exports = {
  createCustomer: async (customerData) => {
    try {
      console.log(customerData);
      const newCustomer = new Customer({
        name: customerData.name,
        email: customerData.email,
        contact: customerData.contact,
      });
      const savedCustomer = await newCustomer.save();
      return savedCustomer;
    } catch (error) {
      throw error;
    }
  },
  getAllCustomers: async () => {
    try {
      const customers = await Customer.find();
      return customers;
    } catch (error) {
      throw error;
    }
  },
  getCustomerById: async (customerId) => {
    try {
      const customer = await Customer.findById(customerId);
      return customer;
    } catch (error) {
      throw error;
    }
  },
  deleteCustomerById: async (customerId) => {
    try {
      const deletedCustomer = await Customer.findByIdAndDelete(customerId);
      return deletedCustomer;
    } catch (error) {
      throw error;
    }
  },

  updateCustomer: async (customerId, updateData) => {
    try {
      // Find the customer by ID
      const customer = await Customer.findById(customerId);

      if (!customer) {
        // Throw error if customer not found
        throw new Error(`Customer with ID ${customerId} not found`);
      }

      // Update customer properties with provided data
      customer.name = updateData.name || customer.name;
      customer.email = updateData.email || customer.email;
      customer.contact = updateData.contact || customer.contact;

      // Save the updated customer
      const updatedCustomer = await customer.save();
      return updatedCustomer;
    } catch (error) {
      throw error;
    }
  },
};

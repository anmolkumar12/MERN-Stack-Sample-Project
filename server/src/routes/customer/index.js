//= ========================= Load Modules Start =======================
const { ROUTE_PREFIX } = require("../../constants");
const customersRoute = require("./customersRoute");
//= ========================= Export Module Start ==============================

module.exports = function (app) {
  app.use(`${ROUTE_PREFIX}/customers`, customersRoute);
};

//= ========================= Export Module End ===============================

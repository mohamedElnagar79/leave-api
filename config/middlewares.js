// const { generateInvoicePdf } = require("../middlewares/generatePdf");
const mwError = require("../middlewares/validationMW");
const auth = require("../middlewares/authMW");
const createPDF = require("../middlewares/generatePdf");
const calcDays = require("../middlewares/calcDays");
module.exports = {
  mwError,
  auth,
  createPDF,
  calcDays,
  // generateInvoicePdf,
};

// const { generateInvoicePdf } = require("../middlewares/generatePdf");
const mwError = require("../middlewares/validationMW");
const auth = require("../middlewares/authMW");
const createPDF = require("../middlewares/generatePdf");
const calcDays = require("../middlewares/calcDays");
const convertDates = require("../middlewares/convertDates");
module.exports = {
  mwError,
  auth,
  createPDF,
  calcDays,
  convertDates,
  // generateInvoicePdf,
};

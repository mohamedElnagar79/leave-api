const express = require("express");
const router = express.Router();
const leaveController = require("../controller/leaves.controller");
// const { addCountriesValidation } = require("../validations/country.validation");
const config = require("../config/middlewares");

router.route("/new-leave").post(
  config.auth,
  // addCountriesValidation,
  // config.mwError,
  leaveController.addNewLeaves
);
router.route("/get-leave-details");
//   .get(config.auth, countyController.getAllCountries);

module.exports = router;

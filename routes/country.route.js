const express = require("express");
const router = express.Router();
const countyController = require("../controller/country.controller");
const { addCountriesValidation } = require("../validations/country.validation");
const config = require("../config/middlewares");

router
  .route("/new-countries")
  .post(
    config.auth,
    addCountriesValidation,
    config.mwError,
    countyController.addNewCountries
  );
router
  .route("/all-countries")
  .get(config.auth, countyController.getAllCountries);

module.exports = router;

const { body } = require("express-validator");

exports.addCountriesValidation = [
  body("countries")
    .notEmpty()
    .withMessage("countries is requried")
    .isArray()
    .withMessage("countries must be an array"),
  body("countries.*.en")
    .notEmpty()
    .withMessage("each country object must have en key with value")
    .isString()
    .withMessage("en must be a string")
    .isLength({ max: 191 })
    .withMessage("en must be less than 191 characters long"),
  body("countries.*.ar")
    .notEmpty()
    .withMessage("each country object must have ar key with value")
    .isString()
    .withMessage("ar must be a string")
    .isLength({ max: 191 })
    .withMessage("ar must be less than 191 characters long"),
];

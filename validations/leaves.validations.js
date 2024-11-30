const { body, check } = require("express-validator");
const leaves = require("../models/leaves.model");
const Country = require("../models/countries.model");

exports.addNewLeavesValidation = [
  body("leave_id")
    .notEmpty()
    .withMessage("leave_id is required")
    .isString()
    .withMessage("leave_id must be a string")
    .isLength({ max: 191 })
    .withMessage("leave_id must be less than 191 characters long"),
  check("leave_id").custom((value) => {
    return leaves.findOne({ where: { leave_id: value } }).then((leave) => {
      if (leave) {
        return Promise.reject("this leave_id is already used!");
      }
    });
  }),

  body("admission_date_en")
    .notEmpty()
    .withMessage("admission_date_en is required")
    .isString()
    .withMessage("admission_date_en must be a string")
    .isLength({ max: 191 })
    .withMessage("admission_date_en must be less than 191 characters long"),

  body("discharge_date_en")
    .notEmpty()
    .withMessage("discharge_date_en is required")
    .isString()
    .withMessage("discharge_date_en must be a string")
    .isLength({ max: 191 })
    .withMessage("discharge_date_en must be less than 191 characters long"),

  body("issue_date")
    .notEmpty()
    .withMessage("issue_date is required")
    .isString()
    .withMessage("issue_date must be a string")
    .isLength({ max: 191 })
    .withMessage("issue_date must be less than 191 characters long"),

  body("name_en")
    .notEmpty()
    .withMessage("name_en is required")
    .isString()
    .withMessage("name_en must be a string")
    .isLength({ max: 191 })
    .withMessage("name_en must be less than 191 characters long"),

  body("name_ar")
    .notEmpty()
    .withMessage("name_ar is required")
    .isString()
    .withMessage("name_ar must be a string")
    .isLength({ max: 191 })
    .withMessage("name_ar must be less than 191 characters long"),

  body("national_id")
    .notEmpty()
    .withMessage("national_id is required")
    // .isString()
    // .withMessage("national_id must be a string")
    // .isLength({ max: 191 })
    // .withMessage("national_id must be less than 191 characters long"),

  body("employer_en")
    .notEmpty()
    .withMessage("employer_en is required")
    .isString()
    .withMessage("employer_en must be a string")
    .isLength({ max: 191 })
    .withMessage("employer_en must be less than 191 characters long"),
  body("employer_ar")
    .notEmpty()
    .withMessage("employer_ar is required")
    .isString()
    .withMessage("employer_ar must be a string")
    .isLength({ max: 191 })
    .withMessage("employer_ar must be less than 191 characters long"),

  body("physician_name_en")
    .notEmpty()
    .withMessage("physician_name_en is required")
    .isString()
    .withMessage("physician_name_en must be a string")
    .isLength({ max: 191 })
    .withMessage("physician_name_en must be less than 191 characters long"),

  body("physician_name_ar")
    .notEmpty()
    .withMessage("physician_name_ar is required")
    .isString()
    .withMessage("physician_name_ar must be a string")
    .isLength({ max: 191 })
    .withMessage("physician_name_ar must be less than 191 characters long"),

  body("position_en")
    .notEmpty()
    .withMessage("position_en is required")
    .isString()
    .withMessage("position_en must be a string")
    .isLength({ max: 191 })
    .withMessage("position_en must be less than 191 characters long"),

  body("position_ar")
    .notEmpty()
    .withMessage("position_ar is required")
    .isString()
    .withMessage("position_ar must be a string")
    .isLength({ max: 191 })
    .withMessage("position_ar must be less than 191 characters long"),

  body("countryId")
    .notEmpty()
    .withMessage("countryId is required")
    .isInt()
    .withMessage("countryId must be an integer"),
  check("countryId").custom((value, req) => {
    return Country.findOne({ where: { id: value } }).then((country) => {
      if (!country) {
        return Promise.reject("countryId not found!");
      }
    });
  }),
];

exports.validateGetLeaveById = [
  body("leave_id")
    .notEmpty()
    .withMessage("leave_id is required")
    .isString()
    .withMessage("leave_id must be a string")
    .isLength({ max: 191 })
    .withMessage("leave_id must be less than 191 characters long"),
  body("national_id")
    .notEmpty()
    .withMessage("national_id is required")
    .isInt()
    .withMessage("national_id must be a number")
    .isLength({ max: 191 })
    .withMessage("national_id must be less than 191 characters long"),
];

const { body, check } = require("express-validator");
const leaves = require("../models/leaves.model");
const Country = require("../models/countries.model");

exports.addNewLeavesValidation = [
  body("leave_id")
    .notEmpty()
    .withMessage("leave_id مطلوب")
    .isString()
    .withMessage("leave_id يجب أن يكون نصًا")
    .isLength({ max: 191 })
    .withMessage("leave_id يجب أن يكون أقل من 191 حرفًا"),
  check("leave_id").custom((value) => {
    return leaves.findOne({ where: { leave_id: value } }).then((leave) => {
      if (leave) {
        return Promise.reject("برجاء تغيير رمز الإجازة لأنه مسجل بالفعل");
      }
    });
  }),

  body("admission_date_en")
    .notEmpty()
    .withMessage("admission_date_en مطلوب")
    .isString()
    .withMessage("admission_date_en يجب أن يكون نصًا")
    .isLength({ max: 191 })
    .withMessage("admission_date_en يجب أن يكون أقل من 191 حرفًا"),

  body("discharge_date_en")
    .notEmpty()
    .withMessage("discharge_date_en مطلوب")
    .isString()
    .withMessage("discharge_date_en يجب أن يكون نصًا")
    .isLength({ max: 191 })
    .withMessage("discharge_date_en يجب أن يكون أقل من 191 حرفًا"),

  body("issue_date")
    .notEmpty()
    .withMessage("issue_date مطلوب")
    .isString()
    .withMessage("issue_date يجب أن يكون نصًا")
    .isLength({ max: 191 })
    .withMessage("issue_date يجب أن يكون أقل من 191 حرفًا"),

  body("name_en")
    .notEmpty()
    .withMessage("name_en مطلوب")
    .isString()
    .withMessage("name_en يجب أن يكون نصًا")
    .isLength({ max: 191 })
    .withMessage("name_en يجب أن يكون أقل من 191 حرفًا"),

  body("name_ar")
    .notEmpty()
    .withMessage("name_ar مطلوب")
    .isString()
    .withMessage("name_ar يجب أن يكون نصًا")
    .isLength({ max: 191 })
    .withMessage("name_ar يجب أن يكون أقل من 191 حرفًا"),

  body("national_id").notEmpty().withMessage("national_id مطلوب"),
  // .isString()
  // .withMessage("national_id يجب أن يكون نصًا")
  // .isLength({ max: 191 })
  // .withMessage("national_id يجب أن يكون أقل من 191 حرفًا"),

  body("employer_en")
    .notEmpty()
    .withMessage("employer_en مطلوب")
    .isString()
    .withMessage("employer_en يجب أن يكون نصًا")
    .isLength({ max: 191 })
    .withMessage("employer_en يجب أن يكون أقل من 191 حرفًا"),

  body("employer_ar")
    .notEmpty()
    .withMessage("employer_ar مطلوب")
    .isString()
    .withMessage("employer_ar يجب أن يكون نصًا")
    .isLength({ max: 191 })
    .withMessage("employer_ar يجب أن يكون أقل من 191 حرفًا"),

  body("physician_name_en")
    .notEmpty()
    .withMessage("physician_name_en مطلوب")
    .isString()
    .withMessage("physician_name_en يجب أن يكون نصًا")
    .isLength({ max: 191 })
    .withMessage("physician_name_en يجب أن يكون أقل من 191 حرفًا"),

  body("physician_name_ar")
    .notEmpty()
    .withMessage("physician_name_ar مطلوب")
    .isString()
    .withMessage("physician_name_ar يجب أن يكون نصًا")
    .isLength({ max: 191 })
    .withMessage("physician_name_ar يجب أن يكون أقل من 191 حرفًا"),

  body("position_en")
    .notEmpty()
    .withMessage("position_en مطلوب")
    .isString()
    .withMessage("position_en يجب أن يكون نصًا")
    .isLength({ max: 191 })
    .withMessage("position_en يجب أن يكون أقل من 191 حرفًا"),

  body("position_ar")
    .notEmpty()
    .withMessage("position_ar مطلوب")
    .isString()
    .withMessage("position_ar يجب أن يكون نصًا")
    .isLength({ max: 191 })
    .withMessage("position_ar يجب أن يكون أقل من 191 حرفًا"),

  body("countryId")
    .notEmpty()
    .withMessage("countryId مطلوب")
    .isInt()
    .withMessage("countryId يجب أن يكون عددًا صحيحًا"),
  check("countryId").custom((value, req) => {
    return Country.findOne({ where: { id: value } }).then((country) => {
      if (!country) {
        return Promise.reject("لم يتم العثور على countryId!");
      }
    });
  }),
];

exports.validateGetLeaveById = [
  body("leave_id")
    .notEmpty()
    .withMessage("leave_id مطلوب")
    .isString()
    .withMessage("leave_id يجب أن يكون نصًا")
    .isLength({ max: 191 })
    .withMessage("leave_id يجب أن يكون أقل من 191 حرفًا"),
  body("national_id")
    .notEmpty()
    .withMessage("national_id مطلوب")
    .isInt()
    .withMessage("national_id يجب أن يكون رقمًا")
    .isLength({ max: 191 })
    .withMessage("national_id يجب أن يكون أقل من 191 حرفًا"),
];

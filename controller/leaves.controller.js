const leaves = require("../models/leaves.model");

module.exports.addNewLeaves = async (req, res, next) => {
  const {
    leave_id,
    admission_date_en,
    admission_date_ar,
    discharge_date_en,
    discharge_date_ar,
    issue_date,
    name_en,
    name_ar,
    national_id,
    employer,
    physician_name_en,
    physician_name_ar,
    position_en,
    position_ar,
    countryId,
  } = req.body;
  try {
    const new_leave = await leaves.create({
      leave_id,
      admission_date_en,
      admission_date_ar,
      discharge_date_en,
      discharge_date_ar,
      issue_date,
      name_en,
      name_ar,
      national_id,
      employer,
      physician_name_en,
      physician_name_ar,
      position_en,
      position_ar,
      countryId,
    });

    return res.status(200).json({
      status_code: 200,
      data: null,
      message: "leave added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      data: null,
      message: error.message,
    });
  }
};

// module.exports.getOneLeaveByLeaveId = async (req, res, next) => {
//   try {
//     const countries = await country.findAll({
//       attributes: ["id", "country_name_en", "country_name_ar"],
//     });
//     return res.status(200).json({
//       status_code: 200,
//       data: countries,
//       message: "request success",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status_code: 500,
//       data: null,
//       message: error.message,
//     });
//   }
// };

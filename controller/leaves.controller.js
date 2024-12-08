const leaves = require("../models/leaves.model");
const config = require("../config/middlewares");
const Country = require("../models/countries.model");
const { Sequelize } = require("sequelize");
const moment = require("moment");

const getFormattedDateTime = () => {
  // Getting current time in "hh:mm A" format
  const currentTime = moment().format("hh:mm A");

  // Getting current date in "dddd, DD MMMM YYYY" format
  const currentDate = moment().format("dddd, DD MMMM YYYY");

  return { currentTime, currentDate };
};

module.exports.addNewLeaves = async (req, res, next) => {
  const {
    leave_id,
    admission_date_en,
    // admission_date_ar,
    discharge_date_en,
    issue_date,
    name_en,
    name_ar,
    national_id,
    employer_en,
    employer_ar,
    physician_name_en,
    physician_name_ar,
    position_en,
    position_ar,
    countryId,
  } = req.body;
  try {
    let path;
    const DateObj = getFormattedDateTime();
    let admission_date_ar = config.convertDates(admission_date_en);
    let discharge_date_ar = config.convertDates(discharge_date_en);
    let new_leave = await leaves.create({
      leave_id,
      admission_date_en,
      admission_date_ar,
      discharge_date_en,
      discharge_date_ar,
      issue_date,
      name_en,
      name_ar,
      national_id,
      employer_en,
      employer_ar,
      physician_name_en,
      physician_name_ar,
      position_en,
      position_ar,
      countryId,
    });
    if (new_leave) {
      let leave_days = config.calcDays(
        new_leave.dataValues.admission_date_en,
        new_leave.dataValues.discharge_date_en
      );
      const coutry = await Country.findOne({
        where: {
          id: new_leave.dataValues.countryId,
        },
      });
      console.log("coutry ", coutry.dataValues);
      // new_leave = new_leave.dataValues.leave_days;
      console.log("leave days count ===> ", leave_days);

      path = await config.createPDF(
        new_leave.dataValues,
        leave_days,
        DateObj,
        coutry
      );
    }
    return res.status(200).json({
      status_code: 200,
      data: process.env.SERVER_HOST + path,
      message: "leave added successfully",
    });
  } catch (error) {
    console.log("errorr ", error);
    return res.status(500).json({
      status_code: 500,
      data: null,
      message: error.message,
    });
  }
};

module.exports.getOneLeaveDetails = async (req, res, next) => {
  try {
    const { national_id, leave_id } = req.body;
    const leave = await leaves.findOne({
      where: { national_id, leave_id },
      attributes: {
        include: [
          [Sequelize.col("Country.country_name_en"), "nationality_en"],
          [Sequelize.col("Country.country_name_ar"), "nationality_ar"],
        ],
      },
      include: [
        {
          model: Country,
          attributes: [], // Exclude original attributes from Country to avoid duplication
        },
      ],
    });
    if (leave) {
      let leave_days = config.calcDays(
        leave.dataValues.admission_date_en,
        leave.dataValues.discharge_date_en
      );
      leave.dataValues.leave_days = leave_days;
      return res.status(200).json({
        status_code: 200,
        data: leave,
        message: "request success",
      });
    } else {
      return res.status(400).json({
        status_code: 400,
        data: null,
        message: "خطأ فى رمز الخدمة او رقم الهوية / البطاقة",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      data: null,
      message: error.message,
    });
  }
};

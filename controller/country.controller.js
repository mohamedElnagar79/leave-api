const country = require("../models/countries.model");

module.exports.addNewCountries = async (req, res, next) => {
  const { countries } = req.body;
  try {
    console.log("====new_countries ", countries);
    countries.forEach(async (country_item) => {
      const new_countries = await country.create({
        country_name_en: country_item.en,
        country_name_ar: country_item.ar,
      });
    });
    return res.status(200).json({
      status_code: 200,
      data: null,
      message: "countries added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      data: null,
      message: error.message,
    });
  }
};

module.exports.getAllCountries = async (req, res, next) => {
  try {
    const countries = await country.findAll({
      attributes: ["id", "country_name_en", "country_name_ar"],
    });
    return res.status(200).json({
      status_code: 200,
      data: countries,
      message: "request success",
    });
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      data: null,
      message: error.message,
    });
  }
};

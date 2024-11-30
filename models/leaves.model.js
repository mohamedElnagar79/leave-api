const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const leaves = sequelize.define(
  "leaves",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    leave_id: {
      type: Sequelize.STRING(191),
      allowNull: false,
    },
    admission_date_en: {
      type: Sequelize.STRING(191),
      allowNull: false,
    },
    admission_date_ar: {
      type: Sequelize.STRING(191),
      allowNull: false,
    },
    discharge_date_en: {
      type: Sequelize.STRING(191),
      allowNull: false,
    },
    discharge_date_ar: {
      type: Sequelize.STRING(191),
      allowNull: false,
    },
    issue_date: {
      type: Sequelize.STRING(191),
      allowNull: false,
    },
    name_en: {
      type: Sequelize.STRING(191),
      allowNull: false,
    },
    name_ar: {
      type: Sequelize.STRING(191),
      allowNull: false,
    },
    national_id: {
      type: Sequelize.STRING(191),
      allowNull: false,
    },
    employer_en: {
      type: Sequelize.STRING(191),
      allowNull: false,
    },
    employer_ar: {
      type: Sequelize.STRING(191),
      allowNull: false,
    },
    physician_name_en: {
      type: Sequelize.STRING(191),
      allowNull: false,
    },
    physician_name_ar: {
      type: Sequelize.STRING(191),
      allowNull: false,
    },
    position_en: {
      type: Sequelize.STRING(191),
      allowNull: false,
    },
    position_ar: {
      type: Sequelize.STRING(191),
      allowNull: false,
    },
  },

  {
    indexes: [{ unique: true, fields: ["leave_id"] }],
  }
);

module.exports = leaves;

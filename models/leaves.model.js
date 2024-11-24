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
      unique: true,
    },
    admission_date_ar: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true,
    },
    discharge_date_en: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true,
    },
    discharge_date_ar: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true,
    },
    issue_date: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true,
    },
    name_en: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true,
    },
    name_ar: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true,
    },
    national_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },

    nationality_en: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true,
    },
    nationality_ar: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true,
    },
    employer: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true,
    },
    physician_name_en: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true,
    },
    physician_name_ar: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true,
    },
    position_en: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true,
    },
    position_ar: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true,
    },
  },

  {
    indexes: [{ unique: true, fields: ["leave_id"] }],
  }
);

module.exports = leaves;

const User = require("../models/user.model.js");
const leaves = require("../models/leaves.model.js");
const countries = require("../models/countries.model.js");

countries.hasMany(leaves);
leaves.belongsTo(countries);

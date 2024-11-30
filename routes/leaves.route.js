const express = require("express");
const router = express.Router();
const leaveController = require("../controller/leaves.controller");
const {
  addNewLeavesValidation,
  validateGetLeaveById,
} = require("../validations/leaves.validations");
const config = require("../config/middlewares");

router
  .route("/new-leave")
  .post(
    config.auth,
    addNewLeavesValidation,
    config.mwError,
    leaveController.addNewLeaves
  );
router
  .route("/get-leave-details")
  .post(
    validateGetLeaveById,
    config.mwError,
    leaveController.getOneLeaveDetails
  );

module.exports = router;

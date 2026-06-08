const express = require("express");
const showTimeController = require("../controllers/showTimrController");

const router = express.Router();

router.get("/options", showTimeController.getShowTimeOptions);
router.get("/", showTimeController.getShowTimes);
router.get("/:id", showTimeController.getShowTimeById);
router.post("/", showTimeController.createShowTime);
router.put("/:id", showTimeController.updateShowTime);
router.delete("/:id", showTimeController.deleteShowTime);

module.exports = router;

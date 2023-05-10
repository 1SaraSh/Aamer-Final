const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.index);


router.get("/deleteSeeker/:id", adminController.deleteSeeker);
router.get("/deleteExpert/:id", adminController.deleteExpert);

router.post("/updateExpert", adminController.updateExpert);

module.exports = router;

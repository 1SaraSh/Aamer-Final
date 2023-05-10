const express = require("express");
const router = express.Router();
const SeekerController = require("../controllers/SeekerController");

const isAuth = require("../middleware/isAuth");

router.get("/SeekerSearch/:Specialization", SeekerController.SeekerSearch_get);

// router.get("/ProfileExpert/:id", SeekerController.SeekerSearchId_get);

router.get("/EditSeekerProfile", isAuth, SeekerController.EditSeekerProfile_get);
router.post("/EditSeekerProfile", isAuth, SeekerController.EditSeekerProfile_post);

router.get("/deleteSeeker", isAuth, SeekerController.deleteSeeker);

router.post("/addReview", isAuth, SeekerController.addReview);

module.exports = router;

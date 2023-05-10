const express = require("express");
const router = express.Router();
const appController = require("../controllers/appController");

router.get("/Homepage", appController.Homepage_get);

router.get("/login", appController.login_get);
router.post("/login", appController.login_post);

router.get("/SignUp", appController.SignUp_get);
router.post("/SignUp", appController.SignUp_post);

router.get("/Subscription", appController.Subscription_get);
router.post("/Subscription", appController.Subscription_post);

router.get("/logout", appController.logout_post);

module.exports = router;

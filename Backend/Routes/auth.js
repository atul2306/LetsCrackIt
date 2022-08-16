const express= require("express")
const router= express.Router()
const auth_Controller = require("../Controller/auth");
router.post("/signup",auth_Controller.signup);
router.post("/confirm",auth_Controller.confirmation);
router.get("/requestOtp",auth_Controller.requestOtp);
router.post("/login",auth_Controller.login);
router.get("/getDetailsbyid",auth_Controller.getdetails)
router.post("/feedback",auth_Controller.feedback)
module.exports=router
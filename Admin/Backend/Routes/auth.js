const express= require("express")
const router= express.Router()
const auth_Controller = require("../Controller/auth");

router.get("/getDetailsbyid",auth_Controller.getdetails)

module.exports=router
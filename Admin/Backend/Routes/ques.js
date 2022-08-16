
const express= require("express")
const router= express.Router()
const ques_controller = require("../controller/ques")
const multer = require("../Config/multer") ;



router.post("/ques",multer.array("image"),ques_controller.upload);
router.post("/conduct",ques_controller.conduct)
router.get("/getalltest",ques_controller.getquesfromuserid)
router.get("/gettestdetail",ques_controller.gettestdetail);
router.post("/updatedetail",ques_controller.updateTestdetail);
router.get("/getanswer",ques_controller.gettestAns);
module.exports=router
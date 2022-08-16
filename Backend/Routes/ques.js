const express= require("express")
const router= express.Router();
const ques_Controller= require("../Controller/ques")
router.get("/alltest",ques_Controller.ques);
router.get("/quesbyid",ques_Controller.quesbyid)
router.post("/teststarted",ques_Controller.teststarted)
router.post("/submitans",ques_Controller.submitans)
module.exports=router
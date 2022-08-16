const mongoose= require("mongoose")
const feedbackSchema= new mongoose.Schema({
    
        email:String,
        description:String,
        message:String
    
})

const Feedback= mongoose.model("feedbackSchema",feedbackSchema);
module.exports=Feedback
const mongoose= require("mongoose")

const userSchema = new mongoose.Schema({
    method:{
      type:String,
      enum:["local","google"],
      required:true
    },
    local:{
        name:String,
        email:String,
        password:String,
        otp:String,
        time:Date
    },
    google:{
        id:String,
        email:String,
        token:String
        }
    
    
})
const User= mongoose.model("userSchema",userSchema);
module.exports=User
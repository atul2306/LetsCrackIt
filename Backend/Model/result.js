const mongoose= require("mongoose")
const resSchema= new mongoose.Schema({
     testid:mongoose.Schema.Types.ObjectId,
     user:[
        {
            name:String,
            email:String,
            score:Number
        }
     ]
    
     
     
})

const Res= mongoose.model('resSchema',resSchema)
module.exports=Res
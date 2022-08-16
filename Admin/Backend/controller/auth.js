const express = require("express");
const User = require("../Model/user");
const async = require("async");



const jwt= require("jsonwebtoken")

// make Tokens
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
}; 

module.exports.getdetails=async(req,res)=>{
   const {id1}= req.query;
  
   const detail= await User.findOne({_id:id1});
   
   if(!detail){
     return res.json({
       message:"Please try agin there is some error",
       ok:false
     })
   }
   const token = createToken(detail._id);
   const det={ 
      id:detail._id,
      name:detail.local.name,
      email:detail.local.email
   }

   return res.status(201).json({
    det,
    token,
    ok:true 
   })
}


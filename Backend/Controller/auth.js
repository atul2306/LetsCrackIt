const express = require("express");
const User = require("../Model/user");
const async = require("async");
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const nodemailer = require("../Config/nodemailer");
const sendEmail = require("../Config/email-template");
const jwt= require("jsonwebtoken")
const Feedback= require("../Model/feedback")
// make Tokens
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
}; 
module.exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({
        message: "Fill all the details",
        ok: false,
      });
    }
    if (password.length < 6) {
      return res.json({
        message: "Password should be strong(length greater than equal 6)",
        ok: false,
      });
    }
    
    if (validator.validate(email) === false) {
      return res.json({
        message: "Enter the valid Email",
        ok: false,
      });
    }
    
    const existingdetail = await User.findOne({ "local.email": email });
    
    // console.log(existingdetail);
     if(existingdetail?.local?.otp) {
      return res.status(201).json({
        message: "Registered But not Confirm, Please confirm by otp",
        ok: true,
        id:existingdetail._id
      });
     }
    if (existingdetail) {
      return res.json({
        message: "You are registered already",
        ok: false,
        
      });

    }
    const hashedPass = await bcrypt.hash(password, 10);
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    const user = await new User({
      method: "local",
      local: {
        name: name,
        email: email,
        password: hashedPass,
        otp,
        time: Date.now(),
      },
    });
    await user.save();

    //console.log(otp)
    await nodemailer(email, sendEmail.register(name, otp));
    return res.status(201).json({
      message: "please enter otp to confirm your Email",
      ok: true,
      id:user._id
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.confirmation = async (req, res, next) => {
  try {
    const { otp } = req.body;

    const finddetail = await User.findOne({ "local.otp": otp });
    if (!finddetail) {
      return res.json({
        message: "Wrong otp or Invalid Otp or User Registered Already",
        ok: false,
      });
    }

    const otpSentTime = finddetail.local.time;
    const currTime = Date.now();
    const time_Difference = currTime - otpSentTime;
    const time_in_Second = Math.round(time_Difference / 1000);
    if (time_in_Second > 300) {
      return res.json({
        message: "Invalid Otp or Some Error Occured",
        ok: false,
      });
    }

    finddetail.local.otp = null;
    await finddetail.save();
    return res.status(201).json({
      message: "Registered Successfully , you can login now ☺☺",
      ok: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.requestOtp = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id)
    const userDetails = await User.findOne({"_id": id });
    if(!userDetails){
       return res.json({
         message:"Some internal Error",
         ok:false
       })
    }
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    userDetails.local.otp = otp;
    userDetails.local.time = Date.now();
    await userDetails.save();
    await nodemailer(
      userDetails.local.email,
      sendEmail.register(userDetails.local.name, otp)
    );

    return res.status(201).json({
      message: "otp sent",
      ok: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.login=async(req,res)=>{
    try{
       const {email,password}= req.body;
       if(!email || !password) {
          return res.json({
             message:"please fill the details",
             ok:false
          })
       }
       const userDetail = await User.findOne({"local.email":email});
       if(!userDetail){
        return res.json({
            message:"You are not registered",
            ok:false
         })
       }
       if(userDetail.local.otp!=null){
          return res.json({
            message:"user not confirmed Please confirm your email",
            ok:false
         })
       }
       const pass= await bcrypt.compare(password,userDetail.local.password);
       if(!pass){
        return res.status(404).json({
            message:"Credential Mismatched",
            ok:false
         })
       }
       const token = createToken(userDetail._id);
       const udetail={
          id:userDetail._id,
          name:userDetail.local.name,
          email:userDetail.local.email
       };
       return res.status(201).json({
           message:"logged in success",
           token,
           udetail,
           ok:true
       })
        
    }
    catch(err){
        console.log(err)
    }
}

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

module.exports.feedback=async(req,res)=>{
   try{
      const {description, email ,message}= req.body
      if(!description || !email || !message){
         return res.json({
           message:"enter complete details 🤑",
           ok:false
         })
      }
      if (validator.validate(email) === false) {
        return res.json({
          message: "Enter the valid Email",
          ok: false,
        });
      }
      const feedback = new Feedback({
         email,
         description,
         message
      })
      await feedback.save();
      await nodemailer(process.env.MAIL_USER,sendEmail.feedback(description,email));
      return res.status(201).json({
        message:"feeback aa gya hai apne pass, we will get back to u, with 3-4 days 😶😊",
        ok:true
       }) 
   }
   catch(err){
     console.log(err)
   }
}
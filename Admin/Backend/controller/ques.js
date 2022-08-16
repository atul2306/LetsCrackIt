const express = require("express");
const User = require("../Model/user");
const Ques = require("../Model/ques");
const async = require("async");
const cloudinary = require("../Config/Cloudinary");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const moment = require("moment")
module.exports.upload = async (req, res) => {
  try {
    const { id } = req.query;
    //console.log(id)
    const {
      quesType,
      ques,

      marks,
      topic,
      correctans,
      option1,
      option2,
      option3,
      option4,
      solution,
    } = req.body;
    if (
      !id ||
      !quesType ||
      !marks ||
      !topic ||
      !correctans ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !solution
    ) {
      return res.json({
        message: "fill all the details",
        ok: false,
      });
    }
    
    const find = await Ques.findOne({ _id: id });
    //  console.log(find)
    if (!find) {
      return res.json({
        message: "some technical error ,Try again",
        ok: false,
      });
    }
    if (find.totalQuestions === find.questions.size) {
      return res.json({
        message: "ques limit exceeded",
        ok: false,
      });
    }

    const options = [];
    for (let i = 1; i <= 4; i++) {
      let ot = {
        option: req.body["option" + i],
        optionId: uuidv4(),
      };
      options.push(ot);
    }
    // console.log(options)
    const correctAnswer = options[correctans - 1].option;
    let detail = {
      pattern: quesType,

      options,
      marks,
      topic,
      correctAnswer,
      solution,
    };
    if (!!ques) detail = { ...detail, passage: ques };

    // now uploading images in cloudinary
    const files = req.files;

    // console.log(files);
    const images = [];
    if (!!files) {
      for (const file of files) {
        const { path } = file;
        const image = await cloudinary.uploader.upload(path, {
          folder: "LetsCrackIt",
          use_filename: true,
        });
        // console.log(image);
        images.push(image.url);
        fs.unlinkSync(path);
      }
    }
    detail = { ...detail, images };
    find.questions.push(detail);
    await find.save();
    return res.status(201).json({
      message: "ques added Add more",
      all: find,
      ok: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.conduct = async (req, res) => {
  try {
    
    const detail = req.body;
    
    
    
   
    const { id1 } = req.query;
    if (
      !detail.testname ||
      !detail.testtype ||
      !detail.starttime ||
      !detail.endtime ||
      !detail.testduration ||
      !detail.totalques
    ) {
      return res.json({
        message: "fill all detail",
        ok: false,
      });
    }
     
    const conduct = await new Ques({
      creatorId: id1,
      testName: detail?.testname,
      testType: detail?.testtype,
      startTime: detail?.starttime,
      endTime: detail?.endtime,
      testDuration: detail?.testduration,
      totalQuestions: detail?.totalques,
    });
    await conduct.save();
    const id = conduct._id;
    return res.status(201).json({
      message: "you can now add ques",
      id,
      ok: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getquesfromuserid = async (req, res) => {
  try {
    const { id } = req.query;
    const detail = await Ques.find({ creatorId: id });
    return res.status(201).json({
      detail,
      ok: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.gettestdetail = async (req, res) => {
  try {
    const { id } = req.query;
    const detail = await Ques.findOne({ _id: id });
    if (!detail) {
      return res.json({
        message: "Some Technical error Occured",
        ok: false,
      });
    }
    return res.status(201).json({
      detail,
      ok: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateTestdetail = async (req, res) => {
  try {
    const { id } = req.query;

    const detail = req.body;

    const check = await Ques.findOne({ _id: id });

    if (!check || !detail) {
      return res.json({
        message: "Some Technical error Occured",
        ok: false,
      });
    }
    if (detail.testname) {
      check.testName = detail.testname;
    }
    if (detail.testtype) {
      check.testType = detail.testtype;
    }
    if (detail.starttime) {
      check.startTime = detail.starttime;
    }
    if (detail.endtime) {
      check.endTime = detail.endtime;
    }
    if (detail.testduration) {
      check.testDuration = detail.testduration;
    }
    if (detail.totalques) {
      check.totalQuestions = detail.totalques;
    }
    await check.save();
    return res.status(201).json({
      message: "updated",
      ok: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.gettestAns = async (req, res) => {
  try {
    const { id } = req.query;
    const detail = await Ques.find({
      questions: {
        $in: id,
      },
    });
    if (detail) {
      const arr = detail.options;
      const det = detail.correctAnswer;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].optionId === det) {
          return res.status(201).json({
            ans: arr[i].option,
            ok: true,
          });
        }
      }
    }
    return res.json({
      message:"some Technical Error",
      ok:false
    })
  } catch (err) {
    console.log(err);
  }
};

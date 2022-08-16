const express = require("express");
const Ques = require("../Model/ques");
const Ans = require("../Model/submittedAns");
module.exports.ques = async (req, res) => {
  try {
    const alltest = await Ques.find();

    return res.status(201).json({
      ok: true,
      alltest,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.quesbyid = async (req, res) => {
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

module.exports.teststarted = async (req, res) => {
  try {
    const { Testid, name, userid, email } = req.body;
    const user = await Ans.findOne({
      userId: userid,
    });
    if (user) {
      let flag = false;
      for (let i = 0; i < user.tests.length; i++) {
        if (user.tests[i].testId == Testid) {
          flag = true;
          break;
        }
      }

      if (flag == false) {
        user.tests.push({
          testId: Testid,
          startTime: Date.now(),
        });
        await user.save();
      }

      return res.status(201).json({
        ok: true,
      });
    }
    const ans = await new Ans({
      userId: userid,
      name,
      email,
    });
    await ans.save();

    ans.tests.push({
      testId: Testid,
      startTime: Date.now(),
    });
    await ans.save();
    return res.status(201).json({
      ok: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.submitans = async (req, res) => {
  try {
    const { option, quesid, userid, Testid } = req.body;

    const user = await Ans.findOne({
      userId: userid,
    }).populate("tests");

    if (!user) {
      return res.json({
        message: "some error occured , please try again",
        ok: false,
      });
    }
    const ques = await Ques.findOne({
      _id: Testid,
    });

    // console.log(ques);
    let testdetail = {};
    for (let i = 0; i < user.tests.length; i++) {
      if (user.tests[i].testId == Testid) {
        testdetail = user.tests[i];
        break;
      }
    }
   
    let flag = false;
    let index = 0;
    for (let i = 0; i < testdetail?.questions.length; i++) {
      if (testdetail?.questions[i].questionId == quesid) {
        flag = true;
        index = i;
        break;
      }
    }
    if (flag) {
      let attempt = false;
      let temp = testdetail?.questions[index].attempted;
      if (temp == true) {
        if (testdetail?.questions[index]?.attemptedAns == option) {
          testdetail.questions[index].attempted = false;
          testdetail.questions[index].attemptedAns = null;
          attempt = false;
        } else {
          testdetail.questions[index].attempted = true;
          testdetail.questions[index].attemptedAns = option;
          attempt = true;
        }
      } else {
        testdetail.questions[index].attempted = true;
        testdetail.questions[index].attemptedAns = option;
        attempt = true;
      }
      await user.save();
      return res.status(201).json({
        ok: true,
        val:attempt,
        testdetail,
      });
    }
    let det = {};
    for (let i = 0; i < ques.questions.length; i++) {
      if (ques.questions[i]._id == quesid) {
        det = ques.questions[i];
        break;
      }
    }
    const detail = {
      questionId: quesid,
      attempted: true,
      attemptedAns: option,
      correctAns: det?.correctAnswer,
      marks: det?.marks,
    };
    testdetail.questions.push(detail);
    await user.save();
    return res.status(201).json({
      ok: true,
      val:true,
      testdetail,
    });
  } catch (err) {
    console.log(err);
  }
};

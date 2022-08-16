const mongoose= require("mongoose")
const quesSchema= new mongoose.Schema({
  creatorId: String,
  testName: String,
  testType: String,
  startTime: Date,
  endTime: Date,
  testDuration: Number,
  totalQuestions: Number,
  resultPublish: {
    type: Boolean,
    default: false,
  },
  questions: [
    {
      pattern: String,
      passage: String,
      question: String,
      images: Array,
      options: [
        {
          option: String,
          optionId: String,
        },
      ],
      
      marks: Number,
      topic: String,
      correctAnswer: String,
      solution: String,
    },
  ],
})

const Ques= mongoose.model("quesSchema",quesSchema);
module.exports=Ques
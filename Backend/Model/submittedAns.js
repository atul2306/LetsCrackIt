const mongoose= require("mongoose")

 const submittedSchema= new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    tests: [
      {
        testId: mongoose.Schema.Types.ObjectId,
        startTime: {
          type: Date,
          default: Date.now,
        },
        totalScore: {
          type: Number,
          default: 0,
        },
        questions: [
          {
            questionId: mongoose.Schema.Types.ObjectId,
            attempted: {
              type: Boolean,
              default: false,
            },
            attemptedAns: String,
            correctAns: String,
            marks: Number,
            score: {
              type: Number,
              default: 0,
            },
          },
        ],
      },
    ],
  
 },
 {timestamps:true})

 module.exports= mongoose.model("submittedSchema",submittedSchema)
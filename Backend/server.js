require("dotenv").config();
const express= require("express");
const mongoose= require("mongoose");
const app= express();
const passport = require("passport")
// setting middleware
app.use(express.json());
app.use(passport.initialize());
require("./Config/passport")

//CORS Policy
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
  });

   


// For any unknown API request
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(500).json({ message: error.message || "Something went wrong" });
});
const auth= require("./Routes/auth")
const oauth= require("./Routes/oauth")
const ques= require("./Routes/ques")
app.use("/api/auth",auth);
app.use(oauth);
app.use("/api/ques",ques);
const PORT = process.env.PORT || 8000;

const CONNECTION_URL= `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9dktd.mongodb.net/?retryWrites=true&w=majority`
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🌹✔✔ MongoDB Connected and Connection started at ${PORT}`);
      console.log(`Local -> http://localhost:8000`);
      console.log(`Client Origin -> ${process.env.CLIENT_ORIGIN}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
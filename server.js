require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/dbConn");
const verifyJWT = require("./middleware/verifyjwt");

const PORT = process.env.PORT || 3500;

//connect to db
connectDb();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

//routes
app.use("/signup", require("./routes/signup"));
app.use("/logout", require("./routes/logout"));
app.use("/refresh", require("./routes/refresh"));
app.use("/admin-signup", require("./routes/adminSignup"));
app.use("/admin-signin", require("./routes/adminSignin"));

app.use(verifyJWT);
app.use("/students", require("./routes/api/students"));
app.use("/admins", require("./routes/api/admins"));

mongoose.connection.once("open", () => {
  console.log("connected to DB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

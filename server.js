const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const Contact = require("./models/Contact");
const DBUSER = process.env.DBUSER;
const DBPWD = process.env.DBPWD;

app.use(express.json());
mongoose
  .connect(
    `mongodb+srv://${DBUSER}:${DBPWD}@mycluster.gww0avb.mongodb.net/db-contacts?retryWrites=true&w=majority`
  )
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

app.post("/add-contact", async (req, res) => {
  try {
    let { fullName, email, phone, birthDate, gender, desc } = req.body;
    let newContact = new Contact({
      fullName,
      email,
      phone,
      gender,
      birthDate,
      desc,
    });
    await newContact.save();
    res
      .status(200)
      .json({ status: true, message: "Contact was created successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    // res
    //   .status(400)
    //   .json({ status: false, error: error.errors["email"].message });
  //   if (error.errors["fullName"]) {
  //     return res
  //       .status(401)
  //       .json({ status: false, error: error.errors["fullName"].message });
  //   }
  //   if (error.errors["email"]) {
  //     return res
  //       .status(401)
  //       .json({ status: false, error: error.errors["email"].message });
  //   }
  //   if (error.errors["phone"]) {
  //     return res
  //       .status(401)
  //       .json({ status: false, error: error.errors["phone"].message });
  //   }
  //   if (error.errors["gender"]) {
  //     return res
  //       .status(401)
  //       .json({ status: false, error: error.errors["gender"].message });
  //   }
  //   if (error.errors["desc"]) {
  //     return res
  //       .status(401)
  //       .json({ status: false, error: error.errors["desc"].message });
  //   }
  //   if (error.errors["birthDate"]) {
  //     return res
  //       .status(401)
  //       .json({ status: false, error: error.errors["birthDate"].message });
  //   }
  // }
});



app.listen(5000, (err) => {
  if (err) throw err;
  console.log("server is up and running on port 5000");
});

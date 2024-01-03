const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const Contact = require("./Models/Contact");
const DBUSER = process.env.DBUSER;
const DBPWD = process.env.DBPWD;
mongoose
  .connect(
    `mongodb+srv://${DBUSER}:${DBPWD}@mycluster.t5ajheo.mongodb.net/contact-app?retryWrites=true&w=majority`
  )
  .then(() => console.log("connected to DataBase"))
  .catch((err) => {
    console.log("error");
    console.log(err);
  });

// add Contacts: POST
app.post("/api/addContacts", (req, res) => {
  Contact.insertMany([
    {
      FullName: "Mohamed Tlili",
      Email: "Mohamed@hotmail.com",
      PhoneNumber: 29572401,
      Birthdate: "24/04/1995",
    },
    {
      FullName: "Emna Ben Sassi",
      Email: "Emna@hotmail.com",
      PhoneNumber: 24567401,
      Birthdate: "24/04/1990",
    },
    {
      FullName: "Saida Jouini",
      Email: "Saida@hotmail.com",
      PhoneNumber: 96809302,
      Birthdate: "24/04/1966",
    },
    {
      FullName: "Fatma Jouini",
      Email: "Fatma@hotmail.com",
      PhoneNumber: 23948328,
      Birthdate: "24/04/1999",
    },
  ]);
  res.json({ message: "ok" });
});

// get Contacts: GET
app.get("/api/getContacts", async (req, res) => {
  const contacts = await Contact.find();
  res.json({ data: contacts });
});
// get one contact by name  / The /
app.get("/api/getNameContacts", async (req, res) => {
  const contacts = await Contact.find({ FullName: /Mohamed/ });
  res.json({ data: contacts });
});

// update :PUT
app.put("/api/UpdateContacts", async (req, res) => {
  const contacts = await Contact.findByIdAndUpdate(
    "6595761f9c9cad71e11310b6",
    {
      FullName: "Sarra ",
    },
    { new: true }
  );
  res.json({ data: contacts });
});


// delete
app.delete("/api/DeleteContacts", async (req, res) => {
    const contacts = await Contact.deleteOne({ FullName: "Fatma Jouini" } );
    res.json({ data: contacts });
  });

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("server is up and running on port 5000");
});

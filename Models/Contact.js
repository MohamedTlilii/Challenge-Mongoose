const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
  FullName: String,
  Email: String,
  PhoneNumber: Number,
  Birthdate: String,
});

module.exports = Contact = mongoose.model("contacts", ContactsSchema);

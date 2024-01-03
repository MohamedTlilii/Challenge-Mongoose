const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please insert the fullname"],
    },
    email: {
      type: String,
      required: [true, "Please insert the email"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "This is not a valid email, please try again",
      ],
    },
    phone: {
      type: Number,
      required: [true, "Please insert the phone number"],
      min: [8, "Minimum 8 numbers"],
      max: [8, "Maximum 8 numbers"],
    },
    gender: {
      type: String,
      required: [true, "Please insert the gender"],
      enum: {
        values: ["Male", "Female"],
        message: "{VALUE} is not supported",
      },
    },
    birthDate: {
      type: String,
      required: [true, "Please insert the birth date"],
    },
    desc: {
      type: String,
      minLength: [20, "Minimum 20 caracters are required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Contact = mongoose.model("Contact", contactSchema);

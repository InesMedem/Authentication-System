import bcrypt from "bcrypt";
import validator from "validator";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, "Email not valid"],
      // Si el email no es válido, se lanzará el error ----> "Email not valid"
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isStrongPassword],
    }, //minLength:8, minLowercase:1, minUppercase:1, minNumbers:1, minSymbols:1
    image: {
      type: String,
    },
    confirmationCode: {
      type: Number,
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

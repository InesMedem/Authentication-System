import bcrypt from "bcrypt";
import validator from "validator";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
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
    // confirmationCode: {
    //   type: Number,
    //   required: false,
    // },
    // check: {
    //   type: Boolean,
    //   default: false,
    // },
  },

  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next("Error hashing password", error);
  }
});

const User = mongoose.model("User", UserSchema);

export default User;

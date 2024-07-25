import { deleteImgCloudinary } from "../../middleware/files.middleware.js";
import User from "../models/User.model.js";
import randomCode from "../../utils/randomCode.js";
import nodemailer from "nodemailer";
import validator from "validator";
import bcryptjs from "bcryptjs";
import { generateToken } from "../../utils/token.js";

const register = async (req, res, next) => {
  console.log("INSIDE CONTROLLER Request body:", req.body);
  console.log("File:", req.file);

  let catchImg = req.file?.path;

  try {
    await User.syncIndexes();
    console.log("Indexes synced");

    let confirmationCode = randomCode();
    const { email, name } = req.body;

    const userExist = await User.findOne({ email: req.body.email });
    console.log("User exists:", userExist);

    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });

      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }

      try {
        const userSave = await newUser.save();
        console.log("User saved:", userSave);

        if (userSave) {
          const emailEnv = process.env.EMAIL;
          const password = process.env.PASSWORD;

          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: emailEnv,
              pass: password,
            },
          });

          const mailOptions = {
            from: emailEnv,
            to: email,
            subject: "Confirmation code",
            text: `tu codigo es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("Email error:", error);
              return res.status(404).json({
                user: userSave,
                confirmationCode: "error, resend code",
              });
            }
            console.log("Email sent: " + info.response);
            return res.status(200).json({
              user: userSave,
              confirmationCode,
            });
          });
        }
      } catch (error) {
        console.log("Error saving user:", error);
        return res.status(404).json(error.message);
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      console.log("User already exists");
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    console.log("Error in try-catch:", error);
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });
    if (userDB) {
      if (bcryptjs.compareSync(password, userDB.password)) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("password doesn't match");
      }
    } else {
      return res.status(404).json("user not found");
    }
  } catch (error) {
    return next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    // variable to store the user with the email
    const userDB = await User.findOne({ email });

    // if the user exists
    if (userDB) {
      // get env variables
      const emailEnv = process.env.EMAIL;
      const password = process.env.PASSWORD;
      // send email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailEnv,
          pass: password,
        },
      });

      const mailOptions = {
        from: emailEnv,
        to: email,
        subject: "Reset Password",
        text: `Your new password is ${newPassword}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(404).json({
            user: userSave,
            confirmationCode: "error, resend code",
          });
        }
        // respond status 200
        console.log("Email sent: " + info.response);
        return res.status(200).json({
          user: userSave,
          confirmationCode,
        });
      });
    } else {
      // email failed to send
      return res.status(404).json("user not found");
    }
    // something is wrong with the resetPassword function in the API file
  } catch (error) {
    return res.status(404).json(error.message);
  }
  console.log(
    "🚀 ~ something is wrong with the resetPassword function in the API file",
    message
  );
};
export { register, login, resetPassword };

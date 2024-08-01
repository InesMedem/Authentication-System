import { deleteImgCloudinary } from "../../middleware/files.middleware.js";
import User from "../models/User.model.js";
import randomCode from "../../utils/randomCode.js";
import nodemailer from "nodemailer";
import validator from "validator";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/token.js";
import randomPassword from "../../utils/randomPassword.js";

// ✅

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

// ✅

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });
    if (userDB) {
      if (bcrypt.compareSync(password, userDB.password)) {
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

// ✅ PASSWORD RESET OUTSIDE APP (getpasscode + loginpasscode)

const getPasscode = async (req, res, next) => {
  console.log("getPasscode endpoint hit with data:", req.body);

  try {
    /** vamos a recibir  por el body el email y vamos a comprobar que
     * este user existe en la base de datos
     */
    console.log("getPasscode endpoint hit with data:", req.body);

    const { email } = req.body;
    console.log("Looking for user with email:", email);
    const userDb = await User.findOne({ email });
    if (userDb) {
      console.log("User found:", userDb);
      // / si existe hacemos el redirect
      const PORT = process.env.PORT;
      console.log(`http://localhost:${PORT}/loginPasscode/${userDb._id}`);

      return res.redirect(
        307,
        `http://localhost:${PORT}/loginPasscode/${userDb._id}`
      );
    } else {
      console.log("User not found");

      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

const loginPasscode = async (req, res, next) => {
  console.log("loginPasscode endpoint hit with data:", req.body);

  try {
    /** VAMOS A BUSCAR AL USER POOR EL ID DEL PARAM */
    const { id } = req.params;
    const userDb = await User.findById(id);
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });
    let passwordSecure = randomPassword();
    console.log(passwordSecure);
    const mailOptions = {
      from: email,
      to: userDb.email,
      subject: "-----",
      text: `User: ${userDb.userName}. Your new code login is ${passwordSecure} Hemos enviado esto porque tenemos una solicitud de iniciar sesión, si no has sido ponte en contacto con nosotros, gracias.`,
    };
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        /// SI HAY UN ERROR MANDO UN 404
        console.log(error);
        return res.status(404).json("dont send email and dont update user");
      } else {
        // SI NO HAY NINGUN ERROR
        console.log("Email sent: " + info.response);
        ///guardamos esta contraseña en mongo db

        /// 1 ) encriptamos la contraseña
        const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);

        try {
          /** este metodo te lo busca por id y luego modifica las claves que le digas
           * en este caso le decimos que en la parte dde password queremos meter
           * la contraseña hasheada
           */
          await User.findByIdAndUpdate(id, { password: newPasswordBcrypt });

          //!------------------ test --------------------------------------------
          // vuelvo a buscar el user pero ya actualizado
          const userUpdatePassword = await User.findById(id);

          // hago un compare sync ----> comparo una contraseña no encriptada con una encrptada
          /// -----> userUpdatePassword.password ----> encriptada
          /// -----> passwordSecure -----> contraseña no encriptada
          if (bcrypt.compareSync(passwordSecure, userUpdatePassword.password)) {
            // si son iguales quiere decir que el back se ha actualizado correctamente
            return res.status(200).json({
              updateUser: true,
              sendPassword: true,
            });
          } else {
            /** si no son iguales le diremos que hemos enviado el correo pero que no
             * hemos actualizado el user del back en mongo db
             */
            return res.status(404).json({
              updateUser: false,
              sendPassword: true,
            });
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      }
    });
  } catch (error) {
    return next(error);
  }
};

// ✅ INSIDE APP

const modifyPassword = async (req, res, next) => {
  /** IMPORTANTE ---> REQ.USER ----> LO CREAR LOS AUTH MIDDLEWARE */

  try {
    const { password, newPassword } = req.body;
    const { _id } = req.user;

    /** comparamos la contrasela vieja sin encriptar y la encriptada */
    if (bcrypt.compareSync(password, req.user.password)) {
      /** tenemos que encriptar la contraseña para poder guardarla en el back mongo db */
      const newPasswordHashed = bcrypt.hashSync(newPassword, 10);

      /** vamos a actualizar la contraseña en mongo db */
      try {
        await User.findByIdAndUpdate(_id, { password: newPasswordHashed });

        /** TESTING EN TIEMPO REAL  */

        //1) Traemos el user actualizado
        const userUpdate = await User.findById(_id);

        // 2) vamos a comparar la contraseña sin encriptar y la tenemos en el back que esta encriptada
        if (bcrypt.compareSync(newPassword, userUpdate.password)) {
          /// SI SON IGUALES 200 ---> UPDATE OK
          return res.status(200).json({
            updateUser: true,
          });
        } else {
          ///NO SON IGUALES -------> 404 no son iguales
          return res.status(404).json({
            updateUser: false,
          });
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      /** si las contraseñas no son iguales le mando un 404 diciendo que las contraseñas no son iguales */
      return res.status(404).json("password dont match");
    }
  } catch (error) {
    return next(error);
    /**
     * return next(
      setError(
        500,
        error.message || 'Error general to ChangePassword with AUTH'
      )
    );
     */
  }
};

// ✅ INSIDE APP

const changeName = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { name });
    return res.status(200).json({
      name: name,
    });
  } catch (error) {
    return next(error);
  }
};

//  DELETE USER

const deleteUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndDelete(_id);
    return res.status(200).json("User deleted");
  } catch (error) {
    return next(error);
  }
};

export {
  register,
  login,
  getPasscode,
  loginPasscode,
  modifyPassword,
  changeName,
  deleteUser,
};

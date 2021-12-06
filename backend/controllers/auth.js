const secret = process.env.tokenSecret;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const findUserByEmail = require("./users").findUserByEmail;
const db = require("../config/firebase");

const registerUser = async (req, res) => {
  let userFound = await findUserByEmail(req.body.email);

  if (userFound) {
    res.json({
      status: 409,
      message: "User with this email address already exists",
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    let hashedPass = bcrypt.hashSync(req.body.password, salt);

    try {
      let user = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPass,
        age: req.body.age,
      };
      await db.collection("users").add(user);
      res.status(201).json({ message: "User successfully created" });
    } catch (err) {
      console.log(err);
    }
  }
};

const loginUser = async (req, res) => {
  let userFound = await findUserByEmail(req.body.email);

  if (!userFound) {
    res.json({
      status: 404,
      message: "No account found with the given credentials",
    });
  } else {
    const validPass = bcrypt.compareSync(req.body.password, userFound.password);
    if (!validPass) {
      res.json({ status: 400, message: "Wrong password" });
    } else {
      const token = jwt.sign({ id: userFound.id }, secret, { expiresIn: "3h" });
      res.json({
        status: 200,
        userId: userFound.id,
        token: token,
        message: "Successful login",
      });
    }
  }
};

module.exports = {
  registerUser,
  loginUser,
};

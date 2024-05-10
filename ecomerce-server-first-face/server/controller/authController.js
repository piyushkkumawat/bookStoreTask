const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error.js");
const signUp = async (req, res, next) => {
  try {
    const { username, email, password, mobile } = req.body;
    const isExist = await User.findOne({
      $or: [{ email }, { mobile }],
    });
    if (isExist) {
      return next(
        errorHandler(409, "User already exists with associated credentials!")
      );
    }

    const hashedpassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedpassword,
      mobile,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { mobile, password, email } = req.body;
    if (!email) {
      return next(errorHandler(404, `User name is required!`));
    }

    const isExist = await User.findOne({email});

    if (!isExist) {
      return next(errorHandler(404, "User not found"));
    }

    const isMatchPassword = bcrypt.compareSync(password, isExist.password);
    if (!isMatchPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    const token = jwt.sign(
      { id: isExist._id, isAdmin: isExist.isAdmin },
      'bookstore',
      {
        expiresIn: "28d",
      }
    );
    const { password: hashedpassword, ...rest } = isExist._doc;
    const currentDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(currentDate.getDate() + 28);
    // const expiryDate = new Date(Date.now() + 28 * 60 * 60 * 1000);
    return res
      .cookie("access_token", token, {
        httpOnly: false,
        expires: expiryDate,
      })
      .status(200)
      .json({
        success: true,
        message: "Login Successful",
        access_token: token,
        rest,
      });
  } catch (error) {
    next(error);
  }
};

const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success!");
};

module.exports = { signUp, signin, signout };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/user.js";

export const signUp = async (req, res) => {
  const { userName, email, password } = req.body;
  console.log({ userName, email, password });
  try {
    const duplicateUser = await User.findOne({ email });
    if (duplicateUser) {
      res.status(400).json({
        message: "User already exists with this email",
      });
    } else {
      const hash = bcrypt.hashSync(password, 12);
      const token = jwt.sign({ email }, process.env.PRIVATE_KEY);
      const newUser = await User.create({
        userName: userName,
        email,
        password: hash,
      });

      res.status(201).json({
        message: "user created succesfully",
        token,
        user: {
          userName: newUser.userName,
          email: newUser.email,
          _id: newUser._id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed to create an account, Try Again",
    });
  }
};
export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "user doesn't exists",
      });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (isPasswordCorrect) {
        const token = jwt.sign({ email: user.email }, process.env.PRIVATE_KEY);
        res.status(201).json({
          message: "logged in successfully",
          token,
          user: {
            userName: user.userName,
            email: user.email,
            _id: user._id,
          },
        });
      } else {
        res.status(400).json({
          message: "Incorrect password",
        });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

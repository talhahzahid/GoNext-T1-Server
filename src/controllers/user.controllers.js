import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateAccessTokenFromUser = (user) => {
  return jwt.sign({ email: user.email }, process.env.ACCESSTOKEN, {
    expiresIn: "1d",
  });
};
const generateRefreshTokenFromUser = (user) => {
  return jwt.sign({ email: user.email }, process.env.REFREShTOKEN, {
    expiresIn: "7d",
  });
};

// Sign Up
const signUp = async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname)
    return res.status(400).json({ message: "Fullname is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });
    const newUser = await User.create({
      fullname,
      email,
      password,
    });
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.log("Error occurred", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

// Sign In
const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });
  try {
    const exitingUser = await User.findOne({ email });
    if (!exitingUser)
      return res
        .status(400)
        .json({ message: "No user Found try to different email" });
    const validPassword = await bcrypt.compare(password, exitingUser.password);
    if (!validPassword)
      return res.status(400).json({ message: "Password Incorrect" });
    const accessToken = generateAccessTokenFromUser(exitingUser);
    const refreshToken = generateRefreshTokenFromUser(exitingUser);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res
      .status(200)
      .json({ message: "Login Successfully", accessToken, refreshToken });
  } catch (error) {
    console.log("error occurred", error);
  }
};
export { signUp, signIn };

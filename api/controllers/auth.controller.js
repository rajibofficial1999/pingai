import User from "../models/user.model.js";
import { hashPassword, handleError } from "../lib/utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

export const SignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.status(422).json({
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    createToken(user, res);

    const response = successResponse(user, "User registration successful");

    return res.status(201).json(response);
  } catch (err) {
    next(handleError(422, err.message));
  }
};

export const SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).json({
        success: false,
        message: "The provided credentials are invalid.",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(422).json({
        success: false,
        message: "The provided credentials are invalid.",
      });
    }

    createToken(user, res);

    const response = successResponse(user, "Login successful");

    return res.status(200).json(response);
  } catch (err) {
    next(handleError(422, err.message));
  }
};

export const createGoogleUser = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      user.name = name;
      user.avatar = avatar;
    } else {
      const hashedPassword = await hashPassword(uuid());
      user = new User({ name, email, avatar, password: hashedPassword });
    }

    await user.save();

    createToken(user, res);

    res.status(200).json(successResponse(user, "Login successful"));
  } catch (err) {
    next(handleError(422, err.message));
  }
};

export const SignOut = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(handleError(500, err.message));
  }
};

const createToken = (user, res) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/",
  });
};

const successResponse = (user, message) => {
  const newUser = user.toObject({ getters: true });
  delete newUser.password;

  return {
    success: true,
    user: newUser,
    message: message,
  };
};

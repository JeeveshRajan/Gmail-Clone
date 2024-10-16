import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const defaultProfilePhoto =
      "https://imgs.search.brave.com/6WjbriDjdrnstBg5RoQlYwczwt6ilhSajnRHB8gd_HM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMnY1/ZHpoZGc0emh4My5j/bG91ZGZyb250Lm5l/dC93ZWItYXNzZXRz/L2ltYWdlcy9zdG9y/eXBhZ2VzL25ldy9w/cm9maWxlLXBpY3R1/cmUvcHJvZmlsZS0y/LmpwZw";
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "All fields must be provided",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePhoto =
      `https://avatar.iran.liara.run/public/boy` || defaultProfilePhoto;
    await User.create({
      fullname,
      email,
      password: hashedPassword,
      profilePhoto,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // suppose email is not registered
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email is not registered",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // now saving the cookie in our browser session

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `${user.fullname} logged in successfully.`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

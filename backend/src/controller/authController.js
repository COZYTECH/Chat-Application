import User from "../models/userModel.js";
import bcrypt, { hash } from "bcrypt";
import { generateToken } from "../../utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "user already exits" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(newUser._id, res);

      res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          ENV.CLIENT_URL
        );
        console.log("email sent");
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup", error);
    return res.status(500).json({ message: "Internal server error" });
  }
  //res.send("hello world welcome to the chat app");
};

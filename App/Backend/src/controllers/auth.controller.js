import userModel from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken(user._id)

    res.cookie("token",token,{
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    })

    res.status(201).json({
      user
    })
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Register failed",
      error: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }
    
    const token = generateToken(user._id);

res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
});

res.json({
  user
});

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};


export const logout = (req,res)=>{
    res.clearCookie("token",{
      httpOnly:true,
      sameSite: "lax",
      secure: false
    })

   res.json({
      message:"Logged out"
})
}


export const me = async (req,res)=>{
  res.json({
    user:req.user
  })
}
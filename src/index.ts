
import express from "express"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { UserModel ,ContentModel} from './db.js';
import { userMiddleware } from "./middleware.js";
const app=express();
app.use(express.json())

app.post("/api/v1/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    await UserModel.create({
      username,
      password,
    });

    res.status(201).json({
      message: "User signed up successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({
      username,
      password,
    });

    if (!user) {
      return res.status(403).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!
    );

    res.json({ token });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});


app.post("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const { title, link, tags } = req.body;

    const content = await ContentModel.create({
      title,
      link,
      tags: tags || [],
      //@ts-ignore
      userId: req.userId,
    });

    const populatedContent = await content.populate("userId");

    res.status(201).json({
      message: "Content created",
      content: populatedContent,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating content",
    });
  }
});

app.get("api/v1/content",(req,res)=>{
    
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const { contentId } = req.body;

    await ContentModel.deleteOne({
      _id: contentId,
      userId: req.userId,
    });

    res.json({
      message: "Content deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting content",
    });
  }
});

app.post("api/v1/brain/share",(req,res)=>{
    
})

app.get("api/v1/brain/:shareLink",(req,res)=>{
    
})

app.listen(3000)
import mongoose, { Schema, model } from "mongoose";

mongoose.connect("")
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = model("User", UserSchema);

const ContentSchema= new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId, ref:'User', required:true}
})
export const ContentModel= model("Content",ContentSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    length: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    length: 30,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    length: 10,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    length: 30,
  },
  profilePicture: {
    type: String, 
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

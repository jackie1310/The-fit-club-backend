// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  basic: {type: Boolean, default: false},
  premium: {type: Boolean, default: false},
  pro: {type: Boolean, default: false}
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;

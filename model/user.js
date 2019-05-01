const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    lowercase: true,
    minlength: 1,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  }
});

UserSchema.pre("save", async function(next) {
  const user = this;
  try {
    let hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
  } catch (e) {
    console.log(e);
  }
  next();
});

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  try {
    const isValid = await bcrypt.compare(password, user.password);
    return isValid;
  } catch (e) {
    console.log(e);
  }
};

const userModel = mongoose.model("user", UserSchema);
module.exports = userModel;

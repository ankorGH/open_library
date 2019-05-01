const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 1
  },
  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    lowercase: true
  },
  genre: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 1
  },
  addedBy: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

const BookModel = mongoose.model("book", BookSchema);
module.exports = BookModel;

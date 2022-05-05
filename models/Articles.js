const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title "],
  },
  content: {
    type: String,
    required: [true, "Please provide a content "],
  },
  created_date: {
    type: Date,
  },
  author: {
    type: String,
    ref: "Users",
  },
});

module.exports = mongoose.model("Articles", ArticleSchema);

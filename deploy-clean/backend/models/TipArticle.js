const mongoose = require('mongoose');

const tipArticleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  cat: String,
  tag: String,
  title:  String,
  desc:  String,
  date: String,
  views:  Number,
  readTime: Number,
  content: String,
  gradient: String,
  iconPath: String,
});

module.exports = mongoose.model('TipArticle', tipArticleSchema);

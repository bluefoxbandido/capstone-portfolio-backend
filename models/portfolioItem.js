const mongoose = require("mongoose");

const PortfolioItemSchema = new mongoose.Schema({
  name: String,
  url: String,
  description: String,
  blogUrl: String
});

module.exports = mongoose.model("PortfolioItem", PortfolioItemSchema);

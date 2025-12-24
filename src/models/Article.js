const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    url: { type: String, unique: true, index: true },
    title: String,
    publishedAt: { type: Date, index: true },
    keywords: [String],
    contentHash: { type: String, index: true },
    lastSeenAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);

const Article = require("../models/Article");
const { parseDate } = require("../utils/date");

exports.getArticles = async (req, res) => {
  const { after, before, page = 1, limit = 10 } = req.query;

  const filter = {};
  const afterDate = parseDate(after);
  const beforeDate = parseDate(before);

  if (afterDate || beforeDate) {
    filter.publishedAt = {};
    if (afterDate) filter.publishedAt.$gte = afterDate;
    if (beforeDate) filter.publishedAt.$lte = beforeDate;
  }

  const data = await Article.find(filter)
    .sort({ publishedAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Article.countDocuments(filter);

  res.json({
    page: Number(page),
    limit: Number(limit),
    total,
    data
  });
};

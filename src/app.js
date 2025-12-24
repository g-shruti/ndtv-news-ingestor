const express = require("express");
const articlesRoutes = require("./routes/articles.routes");

const app = express();
app.use(express.json());

app.use("/api/articles", articlesRoutes);

module.exports = app;

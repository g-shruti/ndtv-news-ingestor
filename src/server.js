require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const { startSitemapJob } = require("./jobs/sitemap.job");

(async () => {
  await connectDB();
  startSitemapJob();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})();

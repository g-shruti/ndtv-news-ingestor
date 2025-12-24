const { ingestSitemap } = require("../services/sitemap.service");

function startSitemapJob() {
  ingestSitemap();
  // setInterval(ingestSitemap, 5 * 60 * 1000);   cron job which can be setup later
}

module.exports = { startSitemapJob };

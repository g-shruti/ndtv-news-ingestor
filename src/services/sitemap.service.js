const Article = require("../models/Article");
const { parseXML } = require("../utils/xmlParser");
const { generateHash } = require("../utils/hash");

const SITEMAP_URL =
  "https://www.ndtv.com/sitemap/google-news-sitemap";

const HEADERS = {
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
  "accept-encoding": "gzip, deflate, br, zstd",
  "accept-language": "en-IN,en;q=0.9,en-US;q=0.8,hi;q=0.7",
  "user-agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
};

function normalizeKeywords(raw) {
  if (!raw || raw.trim() === "") return [];
  return raw.split(",").map(k => k.trim()).filter(Boolean);
}

async function ingestSitemap() {
  const res = await fetch(SITEMAP_URL, { headers: HEADERS });
  const xml = await res.text();
  const parsed = await parseXML(xml);

  const urls = parsed?.urlset?.url || [];
  const bulkOps = [];
  const now = new Date();

  for (const item of urls) {
    try {
      const news = item["news:news"];
      if (!news || !item.loc) continue;

      const articleData = {
        title: news["news:title"] || null,
        publishedAt: new Date(news["news:publication_date"]),
        keywords: normalizeKeywords(news["news:keywords"])
      };

      const hash = generateHash(articleData);

      bulkOps.push({
        updateOne: {
          filter: { url: item.loc, contentHash: { $ne: hash } },
          update: {
            $setOnInsert: { url: item.loc },
            $set: {
              ...articleData,
              contentHash: hash,
              lastSeenAt: now
            }
          },
          upsert: true
        }
      });
    } catch {}
  }

  if (bulkOps.length) {
    await Article.bulkWrite(bulkOps, { ordered: false });
  }

  console.log(`📰 Ingested ${bulkOps.length} articles`);
}

module.exports = { ingestSitemap };

# NDTV News Ingestor

Fetches and stores NDTV news articles in MongoDB.

## Setup
git clone <repo-url>
cd ndtv-news-ingestor
npm install
cp .env.sample .env
npm start




.env.sample
MONGO_URI=mongodb://localhost:27017/ndtv-news
NEWS_FETCH_INTERVAL=3600000
API_KEY=your_api_key_here

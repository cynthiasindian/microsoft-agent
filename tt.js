require('dotenv').config(); // load .env first

const { PineconeClient } = require("@pinecone-database/pinecone");

(async () => {
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT
  });
  console.log("Pinecone client initialized");
})();

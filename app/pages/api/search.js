const { pipeline } = require("@xenova/transformers");
const { MeiliSearch } = require("meilisearch");

const client = new MeiliSearch({ host: "http://127.0.0.1:7700", apiKey: "masterKey" });
let embedder = null;

module.exports = async function handler(req, res) {
  try {
    const { query } = req.body;

    if (!embedder) {
      embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    }

    const embedding = await embedder(query, { pooling: "mean", normalize: true });
    const queryVector = Array.from(embedding.data);

    const results = await client.index("products").search(query, {
      vector: queryVector,
      limit: 10,
    });

    res.json(results.hits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

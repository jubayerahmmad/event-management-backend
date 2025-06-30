const { MongoClient, ServerApiVersion } = require("mongodb");
require("@dotenvx/dotenvx").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y41ia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("event-management");

async function connectDB() {
  try {
    // await client.connect();
    console.log("Successfully connected to MongoDB!");
    const db = client.db("event-management");

    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = { connectDB, db };

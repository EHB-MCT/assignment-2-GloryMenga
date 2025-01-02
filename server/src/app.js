"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URL);
const dbName = "Data-development";

async function connectToDatabase() {
  try {
    await client.connect();
    console.log(`Connected to MongoDB, database: ${dbName}`);

    const db = client.db(dbName);

    await db.collection("time").createIndex(
      { visitDate: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 } 
    );

    //Will be delted later 
    console.log("TTL index created for 'time' collection.");

    await db.collection("prompts").createIndex(
      { timestamp: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 } 
    );

    //Will be delted later 
    console.log("TTL index created for 'prompts' collection.");

    await db.collection("shares").createIndex(
      { timestamp: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }
    );
    //Will be delted later 
    console.log("TTL index created for 'shares' collection.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}


app.post('/api/timeSpent', async (req, res) => {
  try {
    const { sessionId, timeSpent, visitDate } = req.body;
    
    const db = client.db(dbName);
    const result = await db.collection('time').updateOne(
      
      { sessionId: sessionId },
      { 
        $set: {
          timeSpent,
          visitDate: new Date(visitDate)
        }
      },
      { upsert: true } 
    );
    
    res.status(200).json({ message: 'Time spent saved successfully' });
  } catch (error) {
    console.error('Error saving time spent:', error);
    res.status(500).json({ error: 'Failed to save time spent' });
  }
});

app.post("/api/prompt", async (req, res) => {
  try {
    const { sessionId, prompt, timestamp } = req.body;

    const keywords = extractKeywords(prompt); 
    const db = client.db(dbName);

    await db.collection("prompts").insertOne({
      sessionId,
      prompt,
      keywords,
      timestamp: new Date(timestamp),
    });

    res.status(200).json({ message: "Prompt saved successfully", keywords });
  } catch (error) {
    console.error("Error saving prompt:", error);
    res.status(500).json({ error: "Failed to save prompt" });
  }
});

app.post("/api/share", async (req, res) => {
  try {
    const { sessionId, shared } = req.body;

    const db = client.db(dbName);

    const result = await db.collection("shares").updateOne(
      { sessionId }, 
      {
        $set: {
          sessionId,
          shared,
          timestamp: new Date(), 
        },
      },
      { upsert: true } 
    );

    res.status(200).json({ message: "Share action tracked successfully" });
  } catch (error) {
    console.error("Error saving share action:", error);
    res.status(500).json({ error: "Failed to track share action" });
  }
});

function extractKeywords(prompt) {
  const stopWords = new Set(["and", "the", "is", "in", "to", "with", "a", "of", "that", "an", "as", "like", "by", "on", "you"]);
  return prompt
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .filter((word) => word && !stopWords.has(word));
}

connectToDatabase();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
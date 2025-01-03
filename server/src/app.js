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

    await db.collection("posts").createIndex(
      { timestamp: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }
    );

    //Will be delted later 
    console.log("TTL index created for 'posts' collection.");

    await db.collection("sessions").createIndex(
      { timestamp: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }
    );

    //Will be delted later 
    console.log("TTL index created for 'sessions' collection.");
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

app.post("/api/post", async (req, res) => {
  try {
    const { sessionId, publicPost, privatePost } = req.body;

    if (publicPost && privatePost) {
      return res.status(400).json({ error: "Post cannot be both public and private" });
    }

    const db = client.db(dbName);

    const existingPost = await db.collection("posts").findOne({ sessionId });

    if (existingPost) {
      return res.status(400).json({
        error: existingPost.publicPost
          ? "You have already posted the melody publicly"
          : "You have already posted the melody privately",
      });
    }

    await db.collection("posts").insertOne({
      sessionId,
      publicPost: !!publicPost,
      privatePost: !!privatePost,
      timestamp: new Date(),
    });

    res.status(200).json({
      message: publicPost
        ? "Melody is published in the community page"
        : "Melody is privately posted",
    });
  } catch (error) {
    console.error("Error posting melody:", error);
    res.status(500).json({ error: "Failed to post melody" });
  }
});

app.post("/api/session", async (req, res) => {
  try {
    const { sessionId } = req.body;
    const db = client.db(dbName);

    await db.collection("sessions").updateOne(
      { sessionId }, 
      { 
        $setOnInsert: {
          sessionId,
          converted: false, 
          timestamp: new Date(),
        } 
      },
      { upsert: true } 
    );

    res.status(200).json({ message: "Session recorded successfully" });
  } catch (error) {
    console.error("Error tracking session:", error);
    res.status(500).json({ error: "Failed to track session" });
  }
});

app.post("/api/convert", async (req, res) => {
  try {
    const { sessionId } = req.body;
    const db = client.db(dbName);

    const result = await db.collection("sessions").updateOne(
      { sessionId },
      { $set: { converted: true } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.status(200).json({ message: "Conversion tracked successfully" });
  } catch (error) {
    console.error("Error updating conversion:", error);
    res.status(500).json({ error: "Failed to update conversion" });
  }
});

app.get("/api/conversionRate", async (req, res) => {
  try {
    const db = client.db(dbName);

    const totalSessions = await db.collection("sessions").countDocuments();
    const convertedSessions = await db.collection("sessions").countDocuments({ converted: true });

    const conversionRate = totalSessions > 0 ? (convertedSessions / totalSessions) * 100 : 0;

    res.status(200).json({ conversionRate: conversionRate.toFixed(2) });
  } catch (error) {
    console.error("Error calculating conversion rate:", error);
    res.status(500).json({ error: "Failed to calculate conversion rate" });
  }
});

//visualization
app.get("/api/timeSpentSummary", async (req, res) => {
  try {
    const db = client.db(dbName);

    const timeData = await db.collection("time").aggregate([
      {
        $match: { timeSpent: { $gt: 0 } } 
      },
      {
        $group: {
          _id: null,
          averageTimeSpent: { $avg: "$timeSpent" },
          totalSessions: { $sum: 1 },
        },
      }
    ]).toArray();

    if (timeData.length === 0) {
      return res.status(200).json({ averageTimeSpent: 0, totalSessions: 0 });
    }

    const { averageTimeSpent, totalSessions } = timeData[0];

    res.status(200).json({ averageTimeSpent, totalSessions });
  } catch (error) {
    console.error("Error fetching time spent data:", error);
    res.status(500).json({ error: "Failed to fetch time spent data" });
  }
});

app.get("/api/keywordFrequency", async (req, res) => {
  try {
    const db = client.db(dbName);

    const keywordData = await db.collection("prompts").aggregate([
      { $unwind: "$keywords" }, 
      {
        $group: {
          _id: "$keywords",
          count: { $sum: 1 } 
        },
      },
      { $sort: { count: -1 } },
      { $limit: 50 } 
    ]).toArray();

    res.status(200).json(keywordData);
  } catch (error) {
    console.error("Error fetching keyword frequency:", error);
    res.status(500).json({ error: "Failed to fetch keyword frequency" });
  }
});

app.get("/api/shareSummary", async (req, res) => {
  try {
    const db = client.db(dbName);

    const shareData = await db.collection("shares").aggregate([
      {
        $group: {
          _id: "$shared",
          count: { $sum: 1 },
        },
      },
    ]).toArray();

    let sharedCount = 0;
    let notSharedCount = 0;

    shareData.forEach((item) => {
      if (item._id === true) {
        sharedCount = item.count;
      } else {
        notSharedCount = item.count;
      }
    });

    const total = sharedCount + notSharedCount;
    const sharedPercentage = total > 0 ? ((sharedCount / total) * 100).toFixed(2) : 0;
    const notSharedPercentage = total > 0 ? ((notSharedCount / total) * 100).toFixed(2) : 0;

    res.status(200).json({
      sharedCount,
      notSharedCount,
      sharedPercentage,
      notSharedPercentage,
    });
  } catch (error) {
    console.error("Error fetching share summary:", error);
    res.status(500).json({ error: "Failed to fetch share summary" });
  }
});

app.get("/api/publicPrivateSummary", async (req, res) => {
  try {
    const db = client.db(dbName);

    const postData = await db.collection("posts").aggregate([
      {
        $group: {
          _id: null,
          publicCount: { $sum: { $cond: ["$publicPost", 1, 0] } },
          privateCount: { $sum: { $cond: ["$privatePost", 1, 0] } },
        },
      }
    ]).toArray();

    if (postData.length === 0) {
      return res.status(200).json({ publicCount: 0, privateCount: 0, publicPercentage: 0, privatePercentage: 0 });
    }

    const { publicCount, privateCount } = postData[0];
    const total = publicCount + privateCount;
    const publicPercentage = total > 0 ? ((publicCount / total) * 100).toFixed(2) : 0;
    const privatePercentage = total > 0 ? ((privateCount / total) * 100).toFixed(2) : 0;

    res.status(200).json({ publicCount, privateCount, publicPercentage, privatePercentage });
  } catch (error) {
    console.error("Error fetching public/private post summary:", error);
    res.status(500).json({ error: "Failed to fetch public/private post summary" });
  }
});

connectToDatabase();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
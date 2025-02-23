"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB Connection Setup
const client = new MongoClient(process.env.MONGODB_URL);
const dbName = "Data-development";

/**
 * Connects to the MongoDB database and sets up necessary indexes.
 * Ensures TTL (Time-To-Live) indexes are applied to automatically delete old documents.
 */
async function connectToDatabase() {
  try {
    await client.connect();
    console.log(`Connected to MongoDB, database: ${dbName}`);

    const db = client.db(dbName);

    await db.collection("time").createIndex(
      { visitDate: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 } 
    );

    console.log("TTL index created for any collection.");

    await db.collection("prompts").createIndex(
      { timestamp: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 } 
    );
 
    await db.collection("shares").createIndex(
      { timestamp: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }
    );

    await db.collection("posts").createIndex(
      { timestamp: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }
    );

    await db.collection("sessions").createIndex(
      { timestamp: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

/**
 * Endpoint to track the time a user spends on the platform.
 * 
 * @route POST /api/timeSpent
 * @param {string} sessionId - Unique identifier for the user session.
 * @param {number} timeSpent - Time spent by the user in seconds.
 * @param {string} visitDate - Timestamp of the visit in ISO format.
 * 
 * Stores or updates the time spent for a specific session in the "time" collection.
 * The document is upserted, meaning it is inserted if it does not exist or updated if it does.
 */
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

/**
 * Endpoint to save a user-generated prompt and extract relevant keywords.
 * 
 * @route POST /api/prompt
 * @param {string} sessionId - Unique identifier for the user session.
 * @param {string} prompt - User-provided text input.
 * @param {string} timestamp - Time when the prompt was created, in ISO format.
 * 
 * Extracts keywords from the prompt using a helper function and stores them along with the session data.
 */
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

/**
 * Endpoint to track whether a user has shared content.
 * 
 * @route POST /api/share
 * @param {string} sessionId - Unique identifier for the user session.
 * @param {boolean} shared - Boolean indicating whether the content was shared.
 * 
 * Updates or inserts a document in the "shares" collection with the sharing status.
 */
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

/**
 * Helper function to extract keywords from a given prompt.
 * 
 * @param {string} prompt - The input text from which keywords will be extracted.
 * @returns {Array<string>} - Array of extracted keywords.
 * 
 * This function removes punctuation, converts text to lowercase,
 * and filters out common stop words to identify meaningful keywords.
 */
function extractKeywords(prompt) {
  const stopWords = new Set(["and", "the", "is", "in", "to", "with", "a", "of", "that", "an", "as", "like", "by", "on", "you"]);
  return prompt
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .filter((word) => word && !stopWords.has(word));
}

/**
 * Endpoint to post a melody either publicly or privately.
 * 
 * @route POST /api/post
 * @param {string} sessionId - Unique identifier for the user session.
 * @param {boolean} publicPost - Indicates whether the post is public.
 * @param {boolean} privatePost - Indicates whether the post is private.
 * 
 * The function ensures that a post cannot be both public and private.
 * It also prevents duplicate posts for the same session.
 */
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

/**
 * Endpoint to record a user session.
 * 
 * @route POST /api/session
 * @param {string} sessionId - Unique identifier for the user session.
 * 
 * This function ensures that a session is only recorded once.
 * If a session with the given sessionId already exists, it does not modify it.
 * Otherwise, it inserts a new session entry with a default `converted` status of false.
 */
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

/**
 * Endpoint to mark a user session as converted.
 * 
 * @route POST /api/convert
 * @param {string} sessionId - Unique identifier for the user session.
 * 
 * Updates the session's `converted` status to `true` in the "sessions" collection.
 * If the session does not exist, it returns a 404 error.
 */
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

/**
 * Endpoint to calculate and retrieve the conversion rate.
 * 
 * @route GET /api/conversionRate
 * 
 * Computes the percentage of converted sessions out of total sessions.
 * If there are no sessions recorded, it returns a conversion rate of 0%.
 */
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

// ========================= Visualization Endpoints ========================= //

/**
 * Endpoint to retrieve a summary of time spent by users.
 * 
 * @route GET /api/timeSpentSummary
 * 
 * Aggregates time spent data to calculate the average time spent and total sessions recorded.
 */
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

/**
 * Endpoint to retrieve the frequency of keywords used in prompts.
 * 
 * @route GET /api/keywordFrequency
 * 
 * Extracts and counts the occurrence of keywords in user prompts, returning the top 50 most common keywords.
 */
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

/**
 * Endpoint to retrieve a summary of share actions.
 * 
 * @route GET /api/shareSummary
 * 
 * Aggregates and calculates the number and percentage of shared vs non-shared actions.
 */
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

/**
 * Endpoint to retrieve a summary of public vs private posts.
 * 
 * @route GET /api/publicPrivateSummary
 * 
 * Counts the number of public and private posts and calculates their respective percentages.
 */
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

/**
 * Endpoint to retrieve a historical summary of conversion rates over time.
 * 
 * @route GET /api/conversionRateSummary
 * 
 * Groups session data by date and calculates the daily conversion rate.
 */
app.get("/api/conversionRateSummary", async (req, res) => {
  try {
    const db = client.db(dbName);

    const conversionData = await db.collection("sessions").aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          totalSessions: { $sum: 1 },
          convertedSessions: { $sum: { $cond: ["$converted", 1, 0] } },
        },
      },
      {
        $project: {
          _id: 1,
          conversionRate: {
            $multiply: [{ $divide: ["$convertedSessions", "$totalSessions"] }, 100],
          },
          totalSessions: 1,
        },
      },
      { $sort: { _id: 1 } },
    ]).toArray();

    res.status(200).json(conversionData);
  } catch (error) {
    console.error("Error fetching conversion rate summary:", error);
    res.status(500).json({ error: "Failed to fetch conversion rate summary" });
  }
});

/**
 * Establish connection to the MongoDB database.
 * This function ensures that the database is properly connected before handling requests.
 */
connectToDatabase();

/**
 * Start the Express server and listen for incoming requests.
 * 
 * The server runs on the specified port, which is either set in the environment variables
 * or defaults to 5000.
 */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
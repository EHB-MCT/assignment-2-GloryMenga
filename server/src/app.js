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
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connectToDatabase();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware for parsing JSON data in requests
app.use(express.json());

// Middleware to allow Cross-Origin Resource Sharing
app.use(cors());

// Connect to MongoDB using the connection string in the .env file
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected')) // Log success message when connected
  .catch((err) => console.error(err)); // Log error if connection fails

// Import and use the 'generate' route for melody generation API
const generateRoute = require('./routes/generate');
app.use('/api/generate', generateRoute);

// Define a root route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running'); // Simple response for server health check
});

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`); // Log which port the server is using
});

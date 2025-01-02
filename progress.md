# Project Progress: Melody Generator

## Introduction

This project involves building a web application that allows users to generate melodies based on prompts, share them publicly or privately, and track user engagement through metrics such as time spent on the site, prompt keywords, and sharing behavior. The goal is to learn about full-stack development and data tracking using MongoDB, React, and Express.

---

## Current Status

### Completed

- **Frontend**
  - Basic navigation setup (`Nav.jsx`).
  - `Generate` page where users can submit prompts and generate melodies.
  - `Community` page where users can view publicly posted melodies, like, comment, and share them.
- **Backend**
  - Basic server setup using Express.
  - Connection to MongoDB.
  - Endpoint for saving time spent by users.
  - Endpoint for saving prompt keywords, number of shares, and public/private sharing data.
- **Database**
  - Created `Data-development` database with the following collections:
    - `time` collection for tracking session durations.
    - `prompts` collection for storing user-generated prompts and keywords.
    - `shares` collection for tracking sharing behavior.
    - `posts` collection for distinguishing between public and private posts.
  - Set up TTL indexes to delete data older than 30 days.

### Ongoing

- Testing data aggregation and ensuring accuracy for all tracked metrics.
- Considering tracking **Conversion Rates**: The percentage of users who generate melodies after visiting (optional).

---

## Dependencies

### Frontend

- **React Router**: For navigation between pages.
- **React Icons**: For SVG icons used in the UI.

### Backend

- **Express**: For building the server and handling API endpoints.
- **MongoDB**: For storing data related to user engagement.
- **CORS**: For enabling cross-origin resource sharing between frontend and backend.
- **dotenv**: For securely managing environment variables like the MongoDB connection string.

---

## Next Steps

- Implement visualizations for aggregated data.
- Optimize the backend to handle more complex queries efficiently.
- Add user authentication for better session tracking (optional).
- Write tests for both frontend and backend components.

---

## Challenges

- **Frontend and Backend Integration**: Ensuring seamless communication between the frontend and backend for time tracking.
  - **Solution**: Tested endpoints using Postman and verified frontend requests in the browser console.
- **Simulating Realistic User Behavior**: Manually creating varied user behavior can be time-consuming.
  - **Solution**: Wrote scripts to automate the simulation process.

---

## Key Learnings

- Setting up a TTL index in MongoDB for automatic data deletion was straightforward and efficient.
- Tracking user behavior on the frontend requires careful handling of browser events like `beforeunload`.
- Proper structuring of frontend and backend code improves maintainability and scalability.

---

## Timeline

- **Week 1**:
  - Set up the project structure.
  - Implemented melody generation and sharing features.
- **Week 2**:
  - Added user tracking for time spent on the site.
  - Integrated MongoDB for storing user engagement data.
  - Implemented tracking for:
    - **Time Spent on the Site**: Measured engagement by session duration.
    - **Prompt Keywords**: Recorded user inputs for melody generation prompts.
    - **Number of Shares**: Counted how often users pressed the share button.
    - **Public vs. Private Sharing**: Differentiated between public and private shares.
- **Ongoing**:
  - Considering tracking **Conversion Rates**: The percentage of users who generate melodies after visiting (optional).

---

## Notes

- Remember to document all APIs and their expected inputs/outputs for future reference.
- Consider adding a feature to let users delete their data to align with privacy best practices.

---

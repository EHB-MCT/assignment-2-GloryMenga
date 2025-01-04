# 🎵 Melody Generator - Data Aggregation Project

Welcome to the **Melody Generator** project! This is a mock project designed as part of an assignment to demonstrate **data aggregation** techniques using a web application. While the site simulates functionality, it does **not actually generate melodies**. Instead, its primary purpose is to track and collect user interaction data on the website for analytical purposes.

---

## 📖 Project Overview

The **Melody Generator** allows users to:

- Write a **prompt** and simulate the generation of a melody.
- Share the generated melody using a "Share" button.
- Choose to post the melody **publicly** or save it **privately**.

The data collected from user interactions is stored in a MongoDB database. The focus of this project is on tracking user behavior rather than creating functional melody generation features.

---

## 🎯 Purpose

The project was built to:

1. **Track and aggregate user interaction data**, including:
   - Time spent on the site.
   - Prompts entered by users.
   - Number of shares.
   - Public vs. private post counts.
   - Conversion rates of users who interact with the melody generation feature.
2. **Store aggregated data** in a MongoDB collection for analysis.
3. Demonstrate how frontend and backend systems can be used to track and handle user data efficiently.

---

## 🚨 Disclaimer

This project is **not a fully functional melody generator**. It was created solely for learning and demonstration purposes. All features related to melody generation are simulated, and the primary focus is on **data aggregation** and **backend integration**.

---

## 💡 Features

1. **Frontend**:

   - Users can:
     - Input a melody prompt.
     - Simulate generating a melody and see placeholder results (e.g., an audio player).
     - Share the simulated melody and choose to post it publicly or privately.

2. **Backend**:

   - The backend tracks user interactions and saves the following data in a MongoDB database:
     - **Session Duration**: The time each user spends on the website.
     - **Prompt Keywords**: The prompts entered by users.
     - **Shares**: The number of times users click the "Share" button.
     - **Public vs. Private Posts**: Whether users post melodies publicly or save them privately.

3. **Database**:
   - The project uses MongoDB as the database.
   - Collected data is stored in the `Data` collection under the `Data-development` database.
   - A TTL index is implemented to automatically delete data older than 30 days.

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite ([React/Vite Docs](https://vite.dev/guide/))
- **Backend**: Node.js + Express.js ([Node Docs](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)) ([Express Docs](https://expressjs.com/en/starter/installing.html))
- **Database**: MongoDB ([Mongodb Docs](https://www.mongodb.com/docs/))
- **Styling**: CSS ([Css Docs](https://devdocs.io/css/))
- **Visualization**: Chart.js ([Chartjs Docs](https://www.chartjs.org/docs/latest/))

---

## 📊 Data Visualization

### How is the Data Visualized?

Collected data is visualized using Chart.js and displayed on a Dashboard.

- Time Spent on Site: Line chart showing average time per session.
- Prompt Keywords: Word cloud highlighting the most frequently used words in user prompts.
- Share Analytics: Pie chart displaying shared vs. unshared melodies.
- Public vs. Private Posts: Bar chart comparing public vs. private posts.
- Conversion Rates: Line graph tracking daily conversion trends.Conversion Rates: Line graph tracking daily conversion trends.

---

## 🗃️ How Data Aggregation Works

The project uses MongoDB to store and manage user interactions.

1. **Time Spent on the Site**

Tracking user engagement based on session duration.

Schema:

```bash
{
  "sessionId": "string",
  "timeSpent": "number",
  "visitDate": "Date"
}
```

Insights:

- Helps determine if users are spending enough time engaging with the website.
- Used to improve content or layout to retain users longer.
- A TTL index automatically deletes records older than 30 days to optimize storage.

2. **Prompt Keywords**

Analyzing the type of prompts users input.

Schema:

```bash
{
  "sessionId": "string",
  "prompt": "string",
  "keywords": ["string"],
  "timestamp": "Date"
}
```

Insights:

- Keywords help filter and categorize content in the community section.
- Frequently used words guide content recommendations.
- Data is deleted after 30 days to prevent saturation.

3. **Number of Shares**

Tracking how often users share their melodies.

Schema:

```bash
{
  "sessionId": "string",
  "shared": "boolean",
  "timestamp": "Date"
}
```

Insights:

- Determines whether users find the content share-worthy.
- Helps assess the need for additional social sharing integrations.
- Non-shared entries are also logged to identify barriers to sharing.

4. **Public vs. Private Posts**

Analyzing how many users choose to post publicly or privately.

Schema:

```bash
{
  "sessionId": "string",
  "publicPost": "boolean",
  "privatePost": "boolean",
  "timestamp": "Date"
}
```

Insights:

- Determines the relevance of the community page.
- If private posts dominate, the public page may need improvement.
- Data is stored with a TTL index to maintain efficiency.

5. **Conversion Rates**

Measuring how many users generate a melody after visiting the site.

Schema:

```bash
{
  "sessionId": "string",
  "converted": "boolean",
  "timestamp": "Date"
}
```

Insights:

- Helps track the effectiveness of the melody generation feature.
- Conversion trends can be used to refine UX and UI.

---

## 📌 API Endpoints

| Method | Endpoint              | Description                                |
| ------ | --------------------- | ------------------------------------------ |
| `POST` | `/api/timeSpent`      | Stores user time spent.                    |
| `POST` | `/api/prompt`         | Saves prompts & extracts keywords.         |
| `POST` | `/api/share`          | Tracks if a melody was shared.             |
| `POST` | `/api/post`           | Saves public/private posts.                |
| `POST` | `/api/session`        | Logs a new user session.                   |
| `POST` | `/api/convert`        | Marks a session as converted.              |
| `GET`  | `/api/conversionRate` | Returns % of users who generated a melody. |

---

## 🔍 Data Aggregation & Analysis

### ✅ How data is processed:

1. User spends time on the website → Tracked by /api/timeSpent.
2. User submits a prompt → Extracts keywords via /api/prompt.
3. User shares melody (or not) → Logged via /api/share.
4. User posts melody publicly or privately → Tracked via /api/post.
5. User leaves or converts → Logged via /api/session & /api/convert.

### ✅ Data Insights:

---

## 🚀 How to Run the Project

### Prerequisites:

1. **Node.js** installed on your machine.
2. **MongoDB** (set up locally or via MongoDB Atlas).
3. `.env` file configuration:

   ```plaintext
   MONGO_URI=mongodb+srv://<username>:<password>@web.lingaen.mongodb.net/Data-development
   PORT=5000
   ```

### Steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/EHB-MCT/assignment-2-GloryMenga.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd server
   ```
3. Install backend dependencies:
   ```bash
   npm install
   ```
4. Start the backend server:
   ```bash
   node src/app.js
   ```
5. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd client
   ```
6. Install frontend dependencies:
   ```bash
   npm install
   ```
7. Start the frontend development server:
   ```bash
   npm run dev
   ```
8. Open your browser and go to:
   ```bash
   http://localhost:5173
   ```

## 🤝 Contribution Guidelines

- Follow the coding standards as defined in .eslintrc.
- Ensure pull requests are well-documented.
- Submit bug reports using the Issues section.

## 📜 Code of Conduct

- Be respectful and constructive in discussions.
- Ensure clear documentation in commits and PRs.
- Help maintain clean, efficient, and readable code.

## 📝 License

This project is for educational purposes only. It is not intended for production use or commercial purposes.

## 📬 Contact

If you have questions or feedback, feel free to reach out:

Email: glory.menga@student.ehb.be

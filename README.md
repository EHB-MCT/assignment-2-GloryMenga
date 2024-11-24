# Melody Generator - Data Aggregation Project

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

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Styling**: CSS

---

## 🗃️ How Data Aggregation Works

The project tracks and aggregates user interaction data as follows:

1. **Session Duration**:

   - A timer starts when the user opens the website.
   - The total time spent on the site is sent to the backend when the user leaves or becomes inactive.

2. **Prompt Tracking**:

   - When a user submits a prompt, it is sent to the backend and stored in the database.

3. **Share Count**:

   - The backend tracks how many times the "Share" button is clicked.

4. **Public vs. Private Posts**:

   - When users choose "Public Post" or "Private Post," this choice is sent to the backend for aggregation.

5. **Data Limit**:
   - To prevent the database from growing indefinitely, older user data is automatically deleted if the maximum document limit is reached.

---

## 🚀 How to Run the Project

### Prerequisites:

1. **Node.js** installed on your machine.
2. **MongoDB** (set up locally or via MongoDB Atlas).
3. `.env` file configuration:
   - Backend:
     ```plaintext
     MONGO_URI=mongodb+srv://<username>:<password>@web.lingaen.mongodb.net/Data-development
     PORT=5000
     ```
   - Frontend:
     ```plaintext
     VITE_API_BASE_URL=http://localhost:5000
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
   node app.js
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

## 📝 License

This project is for educational purposes only. It is not intended for production use or commercial purposes.

## 📬 Contact

If you have questions or feedback, feel free to reach out:

Email: glory.menga@student.ehb.be

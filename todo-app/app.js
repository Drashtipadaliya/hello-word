/* eslint-disable no-undef */
const express = require("express");
const { Sequelize } = require("sequelize");
const { Todo } = require("./models"); // Ensure this path is correct
const config = require("./config/config.json");
const path = require("path");

const app = express();
const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Initialize Sequelize
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: console.log, // Logs all SQL queries
  }
);

// Test the database connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
    return sequelize.sync(); // Synchronize models with the database
  })
  .then(() => {
    console.log("Models synchronized with database");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// Route to render the index page
app.get("/", async (request, response) => {
  try {
    const todos = await Todo.findAll(); // Fetch todos from the database
    response.render("index", { todos }); // Pass the todos variable to the index.ejs
  } catch (error) {
    console.error("Error fetching todos:", error); // Log the error
    response.status(500).json({ error: "Failed to load todos" });
  }
});

// API route to fetch todos
app.get("/todos", async (request, response) => {
  try {
    const todos = await Todo.findAll();
    response.json(todos); // Return todos as JSON for API calls
  } catch (error) {
    console.error("Error fetching todos:", error); // Log the error
    response.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Other routes (POST, PUT, DELETE) go here...

// Export the app for testing or further configuration
module.exports = app;

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable or default to 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

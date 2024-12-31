/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require("express");
const { Sequelize } = require("sequelize");
const { Todo } = require("./models"); // Ensure this path is correct
const config = require("./config/config.json"); // Load the configuration file

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Load the appropriate configuration based on the environment
const environment = process.env.NODE_ENV || "development"; // Default to development
const dbConfig = config[environment];

// Sequelize setup
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// GET /todos - Fetch all todos from the database
app.get("/todos", async (request, response) => {
  try {
    const todos = await Todo.findAll(); // Fetch all todos from the database
    response.json(todos); // Return the todos as JSON
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to fetch todos" });
  }
});

// POST /todos - Create a new todo
app.post("/todos", async (request, response) => {
  console.log("creating a todo", request.body);
  try {
    const todo = await Todo.create({
      title: request.body.title,
      dueDate: request.body.dueDate,
      completed: false,
    });
    return response.json(todo); // Return the created todo as JSON
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// PUT /todos/:id/markAsCompleted - Mark a todo as completed
app.put("/todos/:id/markAsCompleted", async (request, response) => {
  try {
    const todo = await Todo.findByPk(request.params.id);
    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }
    todo.completed = true; // Mark as completed
    await todo.save(); // Save the changes
    response.json(todo); // Return the updated todo
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to update todo" });
  }
});

// DELETE /todos/:id - Delete a To-Do by ID
app.delete("/todos/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    const deleted = await Todo.destroy({
      where: {
        id: todoId,
      },
    });

    if (deleted) {
      res.json(true); // Return true if the To-Do was deleted
    } else {
      res.status(404).json(false); // Return false if the To-Do wasn't found
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting todo", error });
  }
});

module.exports = app;

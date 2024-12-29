// Array to hold the todo items
let todos = [];

// Function to add a new todo
function add(todo) {
  const newTodo = {
    id: Date.now(), // Use the current timestamp as a unique id
    title: todo.title,
    completed: todo.completed || false, // Default to false if not provided
    dueDate: todo.dueDate || null // If no due date is provided, set it as null
  };
  todos.push(newTodo);
}

// Function to mark a todo as complete
function markComplete(todoId) {
  const todo = todos.find(todo => todo.id === todoId);
  if (todo) {
    todo.completed = true;
  }
}

// Function to get overdue items
function getOverdueItems() {
  const today = new Date();
  return todos.filter(todo => {
    if (!todo.dueDate || todo.completed) return false;
    const dueDate = new Date(todo.dueDate);
    return dueDate < today;
  });
}

// Function to get items due today
function getDueTodayItems() {
  const today = new Date().toLocaleDateString("en-CA");
  return todos.filter(todo => {
    if (!todo.dueDate || todo.completed) return false;
    return todo.dueDate === today;
  });
}

// Function to get items due later
function getDueLaterItems() {
  const today = new Date().toLocaleDateString("en-CA");
  return todos.filter(todo => {
    if (!todo.dueDate || todo.completed) return false;
    return todo.dueDate > today;
  });
}

// Function to retrieve all todos
function getTodos() {
  return todos;
}

// Function to clear all todos (used for testing)
function clearTodos() {
  todos = [];
}

// Function to format the todo list into a readable format
function toDisplayableList() {
  return todos.map(todo => {
    const status = todo.completed ? '[x]' : '[ ]';
    return `${status} ${todo.title} ${todo.dueDate ? todo.dueDate : ''}`.trim();
  }).join('\n');
}

// Export functions to be used in tests and elsewhere
// eslint-disable-next-line no-undef
module.exports = {
  add,
  markComplete,
  getOverdueItems,
  getDueTodayItems,
  getDueLaterItems,
  getTodos,
  clearTodos,
  toDisplayableList
};

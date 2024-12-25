/* eslint-disable no-undef */
import { add, markComplete, getOverdueItems, getDueTodayItems, getDueLaterItems } from '../todo';


describe("todoList test suite", () => {
  beforeEach(() => {
    // Clear any existing todos before each test
    clearTodos();
  });

  test("should add a new todo", () => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    const todos = getTodos();
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe("Test todo");
  });

  test("should mark a todo as complete", () => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    const todos = getTodos();
    markComplete(todos[0].id);
    expect(todos[0].completed).toBe(true);
  });

  test("should retrieve overdue items", () => {
    add({
      title: "Overdue task",
      completed: false,
      dueDate: "2023-12-24", // Change the due date to ensure it’s in the past
    });
    const overdueItems = getOverdueItems();
    expect(overdueItems).toHaveLength(1);
    expect(overdueItems[0].title).toBe("Overdue task");
  });

  test("should retrieve due today items", () => {
    const today = new Date().toLocaleDateString("en-CA");
    add({
      title: "Due Today task",
      completed: false,
      dueDate: today,
    });
    const dueTodayItems = getDueTodayItems();
    expect(dueTodayItems).toHaveLength(1);
    expect(dueTodayItems[0].title).toBe("Due Today task");
  });

  test("should retrieve due later items", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // Set a future date (1 day ahead)
    const dueLaterDate = futureDate.toLocaleDateString("en-CA"); // Format it to 'en-CA' format

    add({
      title: "Due Later task",
      completed: false,
      dueDate: dueLaterDate, // Use the correct future date
    });
    const dueLaterItems = getDueLaterItems();

    console.log("Due Later Items:", dueLaterItems); // Add this for debugging

    expect(dueLaterItems).toHaveLength(1);
    expect(dueLaterItems[0].title).toBe("Due Later task");
  });
});

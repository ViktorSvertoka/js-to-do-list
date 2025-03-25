import { getTasksFromLocalStorage, setTasksInLocalStorage } from "./storage.js";
import { createMarkup } from "./markup.js";

const list = document.querySelector(".todo__list");

export function displayTasks(filter = "All") {
  const tasks = getTasksFromLocalStorage();
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "In progress") return !task.done;
    if (filter === "Done") return task.done;
    return task.priority === filter;
  });

  list.innerHTML = filteredTasks.map(createMarkup).join("");
}

export function addTask(description, priority) {
  if (!description.trim()) {
    alert("Please, fill the main field");
    return;
  }

  const tasks = getTasksFromLocalStorage();
  tasks.push({ id: Date.now(), description, priority, done: false });
  setTasksInLocalStorage(tasks);
  displayTasks();
}

export function markTaskAsDone(taskId) {
  const tasks = getTasksFromLocalStorage();
  const task = tasks.find((t) => t.id == taskId);
  if (task) task.done = true;
  setTasksInLocalStorage(tasks);
  displayTasks();
}

export function removeTask(taskId) {
  const tasks = getTasksFromLocalStorage();
  setTasksInLocalStorage(tasks.filter((t) => t.id != taskId));
  displayTasks();
}

export function resetTaskStatus(taskId) {
  const tasks = getTasksFromLocalStorage();
  const task = tasks.find((t) => t.id == taskId);
  if (task) task.done = false;
  setTasksInLocalStorage(tasks);
  displayTasks();
}

export function updateTask(taskId, description, priority) {
  const tasks = getTasksFromLocalStorage();
  const task = tasks.find((t) => t.id == taskId);
  if (task) {
    task.description = description;
    task.priority = priority;
    setTasksInLocalStorage(tasks);
    displayTasks();
  }
}

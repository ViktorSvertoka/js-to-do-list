import { displayTasks, addTask, markTaskAsDone, removeTask } from './tasks.js';
import { initFilters } from './filters.js';
import { openEditModal, initModal } from './modal.js';
import { getTasksFromLocalStorage } from './storage.js';
import { displayCurrentDate } from './date.js';
import { initWeatherModal } from './popup.js';

const form = document.querySelector('.todo__form');
const list = document.querySelector('.todo__list');

form.addEventListener('submit', event => {
  event.preventDefault();
  addTask(
    event.target.elements.description.value,
    event.target.elements.priority.value
  );
  event.target.reset();
});

list.addEventListener('click', event => {
  const listItem = event.target.closest('.todo__item');
  if (!listItem) return;

  const taskId = listItem.dataset.taskId;
  const tasks = getTasksFromLocalStorage();
  const task = tasks.find(task => task.id == taskId);

  if (event.target.classList.contains('done')) markTaskAsDone(taskId);
  if (event.target.classList.contains('remove')) removeTask(taskId);
  if (event.target.classList.contains('edit') && task) openEditModal(task);
});

document.addEventListener('DOMContentLoaded', () => {
  displayTasks();
  initFilters();
  initModal();
  displayCurrentDate();
  initWeatherModal();
});

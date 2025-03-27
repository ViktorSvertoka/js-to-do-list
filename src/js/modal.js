import { updateTask, resetTaskStatus } from './tasks.js';

const editModal = document.querySelector('.todo__modal');
const closeModal = document.querySelector('.todo__modal-close');
const editForm = document.querySelector('.todo__modal-form');

let currentTaskId = null;

export function openEditModal(task) {
  document.querySelector('.todo__modal-desc').value = task.description;
  document.querySelector('.todo__modal-priority').value = task.priority;
  currentTaskId = task.id;

  resetTaskStatus(task.id);
  editModal.style.display = 'flex';
  document.body.classList.add('no-scroll');
}

export function closeEditModal() {
  editModal.style.display = 'none';
  document.body.classList.remove('no-scroll');
}

export function initModal() {
  closeModal.addEventListener('click', closeEditModal);
  editModal.addEventListener('click', event => {
    if (event.target === editModal) closeEditModal();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeEditModal();
  });

  editForm.addEventListener('submit', event => {
    event.preventDefault();
    const description = event.target.elements.description.value.trim();
    const priority = event.target.elements.priority.value;

    if (!description) {
      alert('Please, fill the description field');
      return;
    }

    updateTask(currentTaskId, description, priority);
    closeEditModal();
  });
}

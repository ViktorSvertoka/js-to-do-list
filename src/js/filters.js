import { displayTasks } from './tasks.js';

export function initFilters() {
  const buttons = document.querySelectorAll('.todo__filter-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));

      button.classList.add('active');

      const filterText = button.textContent.trim();
      displayTasks(filterText);
    });
  });

  const defaultButton = Array.from(buttons).find(
    btn => btn.textContent.trim() === 'All'
  );
  if (defaultButton) defaultButton.classList.add('active');
}

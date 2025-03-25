import { displayTasks } from "./tasks.js";

export function initFilters() {
  document.querySelectorAll(".todo__filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const filterText = button.textContent.trim();
      console.log("Filter applied:", filterText);
      displayTasks(filterText);
    });
  });
}

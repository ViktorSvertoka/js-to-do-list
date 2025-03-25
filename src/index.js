import doneLogo from "./images/check.svg";
import editLogo from "./images/pause.svg";
import removeLogo from "./images/cross.svg";

// Отримуємо посилання на елементи
const form = document.querySelector(".todo__form");
const list = document.querySelector(".todo__list");
const filterButtons = document.querySelectorAll(".todo__filter-btn");

// Функція для отримання завдань з локального сховища
function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Функція для збереження завдань у локальному сховищі
function setTasksInLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Функція для створення розмітки HTML завдання
function createMarkup(taskObj) {
  const { id, description, priority, done } = taskObj;
  return `
    <li class="todo__item ${
      done ? "todo__item--bg-green" : ""
    }" data-task-id="${id}">
      <div class="todo__group">
        <article class="todo__description ${done ? "todo__text--done" : ""}">
          ${description}
        </article>
        <span class="todo__priority ${done ? "todo__text--done" : ""}">
          ${priority}
        </span>
      </div>
      <div class="todo__actions">
        <img class="todo__svg done" src="${doneLogo}" alt="Check button" />
        <img class="todo__svg edit" src="${editLogo}" alt="Pause button" />
        <img class="todo__svg remove" src="${removeLogo}" alt="Cross button" />
      </div>
    </li>`;
}

// Функція для відображення завдань
function displayTasks(filter = "All") {
  const tasks = getTasksFromLocalStorage();
  const normalizedFilter = filter.trim(); // Видаляємо зайві пробіли

  const filteredTasks = tasks.filter((task) => {
    if (normalizedFilter === "All") return true;
    if (normalizedFilter === "In progress") return task.done === false;
    if (normalizedFilter === "Done") return task.done === true;
    return task.priority === normalizedFilter;
  });

  list.innerHTML = ""; // Очищаємо список перед оновленням

  filteredTasks.forEach((taskObj) => {
    list.insertAdjacentHTML("beforeend", createMarkup(taskObj));
  });
}

// Функція для позначення завдання як виконаного
function markTaskAsDone(taskId) {
  const tasks = getTasksFromLocalStorage();
  const taskIndex = tasks.findIndex((task) => task.id == taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].done = true;
    setTasksInLocalStorage(tasks);
    displayTasks();
  }
}

// Функція для видалення завдання
function removeTask(taskId) {
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = tasks.filter((task) => task.id !== parseInt(taskId));
  setTasksInLocalStorage(updatedTasks);
  displayTasks();
}

// Функція для скидання статусу виконаного завдання
function resetTaskStatus(taskId) {
  const tasks = getTasksFromLocalStorage();
  const taskIndex = tasks.findIndex((task) => task.id == taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].done = false;
    setTasksInLocalStorage(tasks);
    displayTasks();
  }
}

// Обробник події відправки форми
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const description = event.target.elements.description.value.trim();
  const priority = event.target.elements.priority.value;

  if (description === "") {
    alert("Please, fill the main field");
    return;
  }

  const taskObj = {
    id: Date.now(),
    description,
    priority,
    done: false,
  };

  const tasks = getTasksFromLocalStorage();
  tasks.push(taskObj);
  setTasksInLocalStorage(tasks);

  displayTasks();
  event.target.reset();
});

// Обробник події кліку на елементах списку завдань
list.addEventListener("click", (event) => {
  const listItem = event.target.closest(".todo__item");
  if (!listItem) return;

  const taskId = listItem.dataset.taskId;

  if (event.target.classList.contains("done")) {
    markTaskAsDone(taskId);
  }

  if (event.target.classList.contains("remove")) {
    removeTask(taskId);
  }

  if (event.target.classList.contains("edit")) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find((task) => task.id == taskId);

    if (task) {
      document.querySelector(".todo__modal-desc").value = task.description;
      document.querySelector(".todo__modal-priority").value = task.priority;
      currentTaskId = taskId;

      // Скидаємо статус виконаного завдання та показуємо кнопку "Done"
      resetTaskStatus(taskId);

      editModal.style.display = "flex"; // Відкриваємо модальне вікно
    }
  }
});

// Обробник події для кнопок фільтрації
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    displayTasks(button.textContent);
  });
});

// Відновлення завдань при завантаженні сторінки
displayTasks();

const editModal = document.querySelector(".todo__modal");
const closeModal = document.querySelector(".todo__modal-close");
const editForm = document.querySelector(".todo__modal-form");
let currentTaskId = null;

// Закриваємо модальне вікно
closeModal.addEventListener("click", () => {
  editModal.style.display = "none";
});

// Закриваємо модальне вікно по кліку на бекдроп
editModal.addEventListener("click", (event) => {
  if (event.target === editModal) {
    editModal.style.display = "none";
  }
});

// Закриваємо модальне вікно при натисканні клавіші Esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    editModal.style.display = "none";
  }
});

// Оновлюємо завдання після редагування
editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const description = event.target.elements.description.value.trim();
  const priority = event.target.elements.priority.value;

  if (description === "") {
    alert("Please, fill the description field");
    return;
  }

  const tasks = getTasksFromLocalStorage();
  const taskIndex = tasks.findIndex((task) => task.id == currentTaskId);

  if (taskIndex !== -1) {
    tasks[taskIndex].description = description;
    tasks[taskIndex].priority = priority;
    setTasksInLocalStorage(tasks);
    displayTasks();
    editModal.style.display = "none";
  }
});

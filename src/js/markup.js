import doneLogo from "../images/check.svg";
import editLogo from "../images/pause.svg";
import removeLogo from "../images/cross.svg";

export function createMarkup({ id, description, priority, done }) {
  const priorityClass =
    {
      Easy: "todo__priority--green",
      Normal: "todo__priority--yellow",
      Hard: "todo__priority--red",
    }[priority] || "";

  return `
    <li class="todo__item ${priorityClass}" data-task-id="${id}">
      <div class="todo__group">
        <article class="todo__description ${done ? "todo__text--done" : ""}">
          ${description}
        </article>
        <span class="todo__priority ${priorityClass}">
          ${priority}
        </span>
      </div>
      <div class="todo__actions">
        <img class="todo__svg done" src="${doneLogo}" alt="Check button" title="Done task" />
        <img class="todo__svg edit" src="${editLogo}" alt="Pause button" title="Edit task" />
        <img class="todo__svg remove" src="${removeLogo}" alt="Cross button" title="Remove task" />
      </div>
    </li>`;
}

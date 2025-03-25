import doneLogo from "../images/check.svg";
import editLogo from "../images/pause.svg";
import removeLogo from "../images/cross.svg";

export function createMarkup({ id, description, priority, done }) {
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

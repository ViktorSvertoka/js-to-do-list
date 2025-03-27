// date.js
export function displayCurrentDate() {
  // Отримуємо елементи, в які будемо виводити дані
  const dayElement = document.querySelector('.todo__day');
  const monthElement = document.querySelector('.todo__month');
  const yearElement = document.querySelector('.todo__year');
  const weekDayElement = document.querySelector('.todo__week-day');

  // Створюємо новий об'єкт Date для поточної дати
  const currentDate = new Date();

  // Отримуємо день, місяць, рік та день тижня
  const day = currentDate.getDate(); // день місяця (1-31)
  const month = currentDate.toLocaleString('en', { month: 'short' }); // місяць (скорочена назва)
  const year = currentDate.getFullYear(); // рік
  const weekDay = currentDate.toLocaleString('en', { weekday: 'long' }); // день тижня

  // Виводимо ці значення в відповідні елементи
  dayElement.textContent = day;
  monthElement.textContent = month;
  yearElement.textContent = year;
  weekDayElement.textContent = weekDay;
}

export function displayCurrentDate() {
  const dayElement = document.querySelector('.todo__day');
  const monthElement = document.querySelector('.todo__month');
  const yearElement = document.querySelector('.todo__year');
  const weekDayElement = document.querySelector('.todo__week-day');

  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('en', { month: 'short' });
  const year = currentDate.getFullYear();
  const weekDay = currentDate.toLocaleString('en', { weekday: 'long' });

  dayElement.textContent = day;
  monthElement.textContent = month;
  yearElement.textContent = year;
  weekDayElement.textContent = weekDay;
}

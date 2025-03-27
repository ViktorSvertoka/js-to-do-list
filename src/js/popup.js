export function initWeatherModal() {
  const modalOverlay = document.querySelector('.todo__popup-overlay');
  const closeModalBtn = document.querySelector('.todo__popup-close');
  const weatherIcon = document.querySelector('.todo__weather-icon');

  function openModal() {
    modalOverlay.classList.add('active');
    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', closeOnEscape);
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', closeOnEscape);
  }

  function closeOnEscape(event) {
    if (event.key === 'Escape') closeModal();
  }

  weatherIcon.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', event => {
    if (event.target === modalOverlay) closeModal();
  });
}

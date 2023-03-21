import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

const buttonStartEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

buttonStartEl.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    buttonStartEl.disabled = false;
    buttonStartEl.addEventListener('click', () => {
      const countDown = setInterval(() => {
        buttonStartEl.disabled = true;
        const now = new Date();
        const difference = selectedDate - now;
        if (difference <= 0) {
          clearInterval(countDown);
          return;
        }
        const components = convertMs(difference);
        daysEl.textContent = components.days;
        hoursEl.textContent = components.hours;
        minutesEl.textContent = components.minutes;
        secondsEl.textContent = components.seconds;
      }, 1000);
    });
  },
};

flatpickr(inputEl, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

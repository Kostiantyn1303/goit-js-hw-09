const buttonStartEL = document.querySelector('button[data-start]');

const butoonStopEL = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let timerId = null;

buttonStartEL.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStartEL.disabled = true;
});

butoonStopEL.addEventListener('click', () => {
  clearInterval(timerId);
  buttonStartEL.disabled = false;
});

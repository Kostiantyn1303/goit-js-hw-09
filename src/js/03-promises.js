import { Notify } from 'notiflix';
const formEl = document.querySelector('.form');
function hendlecreatePromise(event) {
  event.preventDefault();

  const firstDelay = Number(
    document.querySelector('input[name="delay"]').value
  );
  const stepDelay = Number(document.querySelector('input[name="step"]').value);
  const amount = Number(document.querySelector('input[name="amount"]').value);
  let secondSteps = firstDelay;
  for (let number = 1; number <= amount; number += 1) {
    const promise = new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve();
        } else {
          reject();
        }
      }, secondSteps);
    });
    promise
      .then(() =>
        Notify.success(`✅ Fulfilled promise ${number} in ${secondSteps}ms`)
      )
      .catch(() =>
        Notify.failure(`❌ Rejected promise ${number} in ${secondSteps}ms`)
      );
    secondSteps += stepDelay;
  }
}
formEl.addEventListener('submit', hendlecreatePromise);

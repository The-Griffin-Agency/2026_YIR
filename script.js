const cards = [...document.querySelectorAll('article')];
const playAll = document.querySelector('#play-all');
const stop = document.querySelector('#stop');
const status = document.querySelector('#status');
let timer;
let active;
let run = 0;

function reset() {
  run += 1;
  clearTimeout(timer);
  if (active) { const image = active.querySelector('img'); image.onload = image.onerror = null; image.src = active.dataset.still; }
  active = null;
  stop.hidden = true;
}

function play(index, sequence, token) {
  const card = cards[index];
  const image = card.querySelector('img');
  if (active) { const image = active.querySelector('img'); image.onload = image.onerror = null; image.src = active.dataset.still; }
  active = card;
  stop.hidden = false;
  status.textContent = 'Playing ' + card.querySelector('h2').textContent;
  image.onload = () => {
    image.onload = null;
    if (token !== run) return;
    timer = setTimeout(() => {
      if (token !== run) return;
      image.src = card.dataset.still;
      active = null;
      if (sequence && index + 1 < cards.length) {
        play(index + 1, true, token);
      } else {
        stop.hidden = true;
        status.textContent = sequence ? 'Playback complete.' : '';
      }
    }, 7000);
  };
  image.onerror = () => {
    image.onerror = null;
    if (token !== run) return;
    image.onload = null;
    reset();
    status.textContent = 'The animation could not load. Please try again.';
  };
  image.src = card.dataset.motion + '&play=' + token;
}

playAll.addEventListener('click', () => { reset(); play(0, true, run); });
stop.addEventListener('click', () => { reset(); status.textContent = ''; });
cards.forEach((card, i) => {
  card.querySelector('button').addEventListener('click', () => { reset(); play(i, false, run); });
});

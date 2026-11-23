const studies = [["images/CARET_Court_Rules_POC_Frame.svg?v=1", "images/CARET_Court_Rules_POC_Motion.svg?v=1", "Court Rules"], ["images/CARET_Command_POC_Frame.svg?v=1", "images/CARET_Command_POC_Motion.svg?v=1", "Command"], ["images/CARET_General_Ledger_POC_Frame.svg?v=1", "images/CARET_General_Ledger_POC_Motion.svg?v=1", "Modernized General Ledger"]];
const selection = new URLSearchParams(location.search).get('study');
const playAll = selection === 'all';
const first = /^[012]$/.test(selection) ? Number(selection) : 0;
const image = document.querySelector('#animation');
const title = document.querySelector('#title');
const status = document.querySelector('#status');
const replay = document.querySelector('#replay');
let timer;
let run = 0;

function play(index) {
  clearTimeout(timer);
  const token = ++run;
  const [still, motion, name] = studies[index];
  title.textContent = name;
  image.alt = name + ' animation';
  status.textContent = playAll ? (index + 1) + ' of ' + studies.length : '';
  image.onload = () => {
    image.onload = image.onerror = null;
    timer = setTimeout(() => {
      if (token !== run) return;
      if (playAll && index < studies.length - 1) {
        play(index + 1);
      } else {
        image.src = still;
        status.textContent = 'Playback complete.';
      }
    }, 7000);
  };
  image.onerror = () => {
    image.onload = image.onerror = null;
    image.src = still;
    status.textContent = 'The animation could not load. Select Replay to try again.';
  };
  image.src = motion + '&play=' + token;
}
replay.textContent = playAll ? 'Replay all' : 'Replay';
replay.addEventListener('click', () => play(first));
play(first);

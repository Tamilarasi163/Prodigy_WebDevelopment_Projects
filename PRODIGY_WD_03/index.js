let timer;
let isRunning = false;
let [hours, minutes, seconds] = [0, 0, 0];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');

function updateDisplay() {
    const format = (num) => (num < 10 ? `0${num}` : num);
    display.innerText = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

function startStopTimer() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        timer = setInterval(() => {
            seconds++;
            if (seconds == 60) {
                seconds = 0;
                minutes++;
                if (minutes == 60) {
                    minutes = 0;
                    hours++;
                }
            }
            updateDisplay();
        }, 1000);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timer);
    [hours, minutes, seconds] = [0, 0, 0];
    isRunning = false;
    startStopBtn.textContent = 'Start';
    updateDisplay();
}

startStopBtn.addEventListener('click', startStopTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();

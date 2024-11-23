// script.js

let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;
let savedTime = 0;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("lapsList");

function startStop() {
  if (!running) {
    startTime = new Date().getTime() - savedTime;
    tInterval = setInterval(updateTime, 1);
    startStopButton.innerHTML = "Pause";
    startStopButton.classList.add("pause");
    running = true;
  } else {
    clearInterval(tInterval);
    savedTime = difference;
    startStopButton.innerHTML = "Start";
    startStopButton.classList.remove("pause");
    running = false;
  }
}

function reset() {
  clearInterval(tInterval);
  savedTime = 0;
  running = false;
  startStopButton.innerHTML = "Start";
  startStopButton.classList.remove("pause");
  display.innerHTML = "00:00:00";
  lapsList.innerHTML = "";
  lapCounter = 0;
}

function lap() {
  if (running) {
    lapCounter++;
    const li = document.createElement("li");
    li.innerText = `Lap ${lapCounter}: ${display.innerHTML}`;
    lapsList.appendChild(li);
  }
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num < 10 ? "0" + num : num;
}

startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);

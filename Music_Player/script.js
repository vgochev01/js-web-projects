const audioElement = document.getElementById("audio");
const playPauseBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentTimeSpan = document.getElementById("current-time");
const duration = document.getElementById("duration");

let currentTime = 0;

playPauseBtn.addEventListener("click", () => {
  if (audioElement.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

function playSong(ev) {
  audioElement.src = "./music/jacinto-1.mp3";
  audioElement.onloadedmetadata = () => {
    audioElement.currentTime = currentTime;
    console.log(audioElement.duration);
    audioElement.play();
    playPauseBtn.setAttribute("title", "Pause");
    playPauseBtn.classList.replace("fa-play", "fa-pause");
  };
}

function pauseSong() {
  audioElement.pause();
  currentTime = audioElement.currentTime;
  playPauseBtn.setAttribute("title", "Play");
  playPauseBtn.classList.replace("fa-pause", "fa-play");
}

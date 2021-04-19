const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');


attachEventListeners();

let videoDuration;

// Play & Pause ----------------------------------- //

function togglePlay(){
  if(video.paused){
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
  } else {
    video.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
  }
}

function updateProgress(){
  // Update Time
  console.log('2', video.currentTime);
  const time = video.currentTime;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  currentTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} / `;

  //Update Progress bar
  progressBar.style.width = `${(time / videoDuration) * 100}%`;
}

function setProgress(ev){
  video.currentTime = (ev.offsetX / ev.target.clientWidth) * videoDuration;
  console.log(video.currentTime);
  updateProgress();
}

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

/* View in fullscreen */

/* Close fullscreen */

// Toggle fullscreen

function setDuration() {
  videoDuration = Math.floor(video.duration);
  const minutes = Math.floor(videoDuration / 60);
  const seconds = Math.floor(videoDuration % 60);
  duration.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleMute(){
  video.muted = !video.muted;
  if(video.muted){
    volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
  } else {
    volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
  }
}

function changeVolume(ev){
  const selectedVolume = ev.offsetX / ev.target.clientWidth;
  video.volume = selectedVolume.toFixed(2);
  volumeBar.style.width = `${selectedVolume * 100}%`
}

function changeSpeed(ev){
  video.playbackRate = ev.target.value;
}

function toggleFullscreen(){
  video.requestFullscreen();
}

function onEnd(){
  video.currentTime = 0;
  playBtn.classList.replace('fa-pause', 'fa-play');
}

// Event Listeners
function attachEventListeners(){
  video.addEventListener('loadedmetadata', setDuration);
  video.addEventListener('click', togglePlay);
  video.addEventListener('timeupdate', updateProgress);
  video.addEventListener('ended', onEnd)
  progressRange.addEventListener('click', setProgress);
  playBtn.addEventListener('click', togglePlay);
  volumeRange.addEventListener('click', changeVolume);
  volumeIcon.addEventListener('click', toggleMute);
  speed.addEventListener('change', changeSpeed);
  fullscreenBtn.addEventListener('click', toggleFullscreen);
  // video.addEventListener('canplay', updateProgress);
}
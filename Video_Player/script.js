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
let lastVolume = 1;
let fullscreen = false;

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
  const time = video.currentTime;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  currentTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} / `;

  //Update Progress bar
  progressBar.style.width = `${(time / videoDuration) * 100}%`;
}

function setProgress(ev){
  video.currentTime = (ev.offsetX / progressRange.offsetWidth) * videoDuration;
  updateProgress();
}

function setDuration() {
  videoDuration = Math.floor(video.duration);
  const minutes = Math.floor(videoDuration / 60);
  const seconds = Math.floor(videoDuration % 60);
  duration.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleMute(){
  video.muted = !video.muted;
  if(video.muted){
    volumeIcon.className = 'fas fa-volume-mute';
    volumeIcon.setAttribute('title', 'Unmute');
  } else {
    changeVolumeIcon(lastVolume);
    volumeIcon.setAttribute('title', 'Mute');
  }
}

function changeVolume(ev){
  let selectedVolume = ev.offsetX / volumeRange.offsetWidth;
  if(selectedVolume < 0.1){
    selectedVolume = 0;
  } 
  if(selectedVolume > 0.9){
    selectedVolume = 1;
  }

  video.volume = selectedVolume;
  volumeBar.style.width = `${selectedVolume * 100}%`
  changeVolumeIcon(selectedVolume);

  lastVolume = selectedVolume;
}

function changeVolumeIcon(volume){
  volumeIcon.className = '';
  if(volume > 0.7){
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if(volume < 0.7 && volume > 0){
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
}

function openFullscreen() {
  if (player.requestFullscreen) {
    player.requestFullscreen();
  } else if (player.webkitRequestFullscreen) { /* Safari */
    player.webkitRequestFullscreen();
  } else if (player.msRequestFullscreen) { /* IE11 */
    player.msRequestFullscreen();
  }

  video.classList.add('video-fullscreen');
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

function toggleFullscreen(){
  if(!fullscreen){
    openFullscreen();
  } else {
    closeFullscreen();
  }

  fullscreen = !fullscreen;
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
  speed.addEventListener('change', ev => video.playbackRate = ev.target.value);
  fullscreenBtn.addEventListener('click', toggleFullscreen);
  // video.addEventListener('canplay', updateProgress);
}
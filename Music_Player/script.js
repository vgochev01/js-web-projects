const audioElement = document.getElementById("audio");
const playPauseBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentTimeSpan = document.getElementById("current-time");
const duration = document.getElementById("duration");
const image = document.getElementById('songImage');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

// Music
const songs = [
    {
        title: "Electric Chill Machine",
        artist: "Jacinto",
        imgSrc: './img/jacinto-1.jpg',
        src: "./music/jacinto-1.mp3"
    },
    {
        title: "Second Song",
        artist: "Jacinto 2",
        imgSrc: './img/jacinto-2.jpg',
        src: "./music/jacinto-2.mp3"
    },
    {
        title: "Third Song",
        artist: "Jacinto 3",
        imgSrc: './img/jacinto-3.jpg',
        src: "./music/jacinto-3.mp3"
    }
]

let currentTime = 0;
let currentSongIndex = 0;
let songDuration = 0;

switchSong();

playPauseBtn.addEventListener("click", () => {
  if (audioElement.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = currentSongIndex == 0 ? songs.length - 1 : currentSongIndex - 1;
    switchSong();
})

nextBtn.addEventListener('click', () => {
    currentSongIndex = currentSongIndex == songs.length - 1 ? 0 : currentSongIndex + 1;
    switchSong();
})

audioElement.addEventListener('loadedmetadata', () => {
    const songDuration = Math.floor(audioElement.duration);
    const minutes = Math.floor(songDuration / 60);
    const seconds = songDuration % 60;
    duration.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
})

audioElement.addEventListener('playing', () => {

})

function switchSong() {
    title.textContent = songs[currentSongIndex].title;
    artist.textContent = songs[currentSongIndex].artist;
    image.src = songs[currentSongIndex].imgSrc;
    audioElement.src = songs[currentSongIndex].src;
    currentTime = 0;
    playPauseBtn.classList.contains('fa-pause') ? playPauseBtn.classList.replace('fa-pause', 'fa-play') : '';
}

function playSong(ev) {
    audioElement.currentTime = currentTime;
    audioElement.play();
    playPauseBtn.setAttribute("title", "Pause");
    playPauseBtn.classList.replace("fa-play", "fa-pause");
}

function pauseSong() {
  audioElement.pause();
  currentTime = audioElement.currentTime;
  playPauseBtn.setAttribute("title", "Play");
  playPauseBtn.classList.replace("fa-pause", "fa-play");
}

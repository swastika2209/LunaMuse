
const songs = [
  {
    title: "Be My Baby",
    artist: "The Ronettes",
    src: "musics/bemybaby.mp3",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZlihuSkNKTYQQcC4h9_-jqHbuay7xAnq4Xzy42SwouA&s=10"
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    src: "musics/shapeofyou.mp3",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIuc60ex2PBsbCMnWa90Hkm_tBEA7ZGPlp3X8V9-VagQ&s=10"
  },
  {
    title: "Tum Se Hi",
    artist: "Mohit Chauhan",
    src: "musics/tumsehi.mp3",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJWpVi7ZuZF8PwaAIzZ66oRMx9oSwUOGZlBG4hZe05sg&s=10"
  },
  {
    title: "7 years",
    artist: "Lukas Graham",
    src: "musics/7years.mp3",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI3JOYYQ7nTvTw4p4uXoe-wHRmkx_u5oBz7rfH7SnQIw&s=10"
  },
  {
    title: "Without Me",
    artist: "Eminem",
    src: "musics/withoutme.mp3",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMjp8At41FycdbpIGKsFcPDDe2pu2MkLAWi7a49Dimw&s=10"
  },
  {
    title: "Love Story",
    artist: "Taylor Swift",
    src: "musics/lovestory.mp3",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw34n_z3TVDGIjFj6vjSBfH1uxfITIsU7QSkJgFSlCAQ&s"
  },
  {
    title: "Night Changes",
    artist: "One Direction",
    src: "musics/nightchanges.mp3",
    cover: "https://i1.sndcdn.com/artworks-000096575707-yun1l8-t500x500.jpg"
  },
  {
    title: "As It Was",
    artist: "Harry Styles",
    src: "musics/asitwas.mp3",
    cover: "https://m.media-amazon.com/images/I/6188VSO4vKL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "Ehsaas",
    artist: "Faheem Abdullah",
    src: "musics/ehsaas.mp3",
    cover: "https://i1.sndcdn.com/artworks-7NzBUzjVmXA9Iu92-UgFUNw-t500x500.png"
  }
  ,
  {
    title: "Charkha",
    artist: "Lakhwinder Wadali",
    src: "musics/charkha.mp3",
    cover:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCkzf-4LxToB5PrqgvP93eT9XV4QVvCvGQT9214d527w&s"
  },
   {
    title: "Dream Catcher",
    artist: "Lalisa fan",
    src: "musics/dreamcatcher.mp3",
    cover:"cover-dreamcatcher.jpeg"
  }
];
// DOM elements
const player = document.getElementById('player');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlistContainer = document.getElementById('playlist-items');

let currentSongIndex = 0;
let isPlaying = false;


function init() {
  lucide.createIcons();
  loadSong(songs[currentSongIndex]);
  renderPlaylist();
  audio.volume = volume.value / 100;
}

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  updateActivePlaylistItem();
}

// Play/Pause
function togglePlay() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function playSong() {
  isPlaying = true;
  player.classList.add('playing');
  playBtn.innerHTML = '<i data-lucide="pause"></i>'; // ||
  lucide.createIcons();
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  player.classList.remove('playing');
  playBtn.innerHTML = '<i data-lucide="play"></i>'; // ▶
  lucide.createIcons();
  audio.pause();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  if (isPlaying) audio.play();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  if (isPlaying) audio.play();
}

// Progress Bar Updates
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  if (isNaN(duration)) return;
  
  const progressPercent = (currentTime / duration) * 100;
  progress.value = progressPercent;

  // Time calculations
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
}

function setProgress(e) {
  const duration = audio.duration;
  audio.currentTime = (e.target.value / 100) * duration;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Volume Control
function setVolume(e) {
  audio.volume = e.target.value / 100;
}

// Playlist interaction
function renderPlaylist() {
  playlistContainer.innerHTML = '';
  songs.forEach((song, index) => {
    const item = document.createElement('div');
    item.classList.add('playlist-item');
    if (index === currentSongIndex) item.classList.add('active');
    
    item.innerHTML = `
      <div>
        <div>${song.title}</div>
        <div class="item-artist">${song.artist}</div>
      </div>
      <i data-lucide="disc" style="width:16px; opacity:0.6;"></i>
    `;

    item.addEventListener('click', () => {
      currentSongIndex = index;
      loadSong(songs[currentSongIndex]);
      playSong();
    });

    playlistContainer.appendChild(item);
  });
  lucide.createIcons();
}

function updateActivePlaylistItem() {
  const items = playlistContainer.querySelectorAll('.playlist-item');
  items.forEach((item, idx) => {
    if (idx === currentSongIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgress);
volume.addEventListener('input', setVolume);

// Autoplay Next Feature
audio.addEventListener('ended', nextSong);

init();

document.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    return;
  }

  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const volumeInput = document.getElementById('volume');

  switch (e.code) {
    case 'Space':
      e.preventDefault(); 
      playBtn.click();
      break;

    case 'ArrowLeft':
      e.preventDefault();
      // Skip to previous track
      prevBtn.click();
      
      // audio.currentTime = Math.max(0, audio.currentTime - 5);
      break;

    case 'ArrowRight':
      e.preventDefault();
      // Skip to next track
      nextBtn.click();
      // audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
      break;

    case 'ArrowUp':
      e.preventDefault();
      // Increase volume by 5%
      if (volumeInput) {
        volumeInput.value = Math.min(100, parseInt(volumeInput.value) + 5);
        volumeInput.dispatchEvent(new Event('input'));
      }
      break;

    case 'ArrowDown':
      e.preventDefault();
      // Decrease volume by 5%
      if (volumeInput) {
        volumeInput.value = Math.max(0, parseInt(volumeInput.value) - 5);
        volumeInput.dispatchEvent(new Event('input'));
      }
      break;
  }
});
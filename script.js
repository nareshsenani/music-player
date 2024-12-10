// Query selectors
const masterPlay = document.querySelector(".masterplay");
const videoElementPlay = document.getElementById("vedioPlay");
const play = document.getElementById("play");
const audioElementPlay = new Audio("songs/1.mp3");
const curTime = document.getElementById("curr-time");
const endedTime = document.getElementById("ended-time");
const myProgressBar = document.getElementById("myProgressBar");
const songItemplay = Array.from(document.querySelectorAll(".box"));
const previous = document.getElementById("previous");
const next = document.getElementById("next");

const showImage = document.getElementById("image");
const showName = document.getElementById("name");
const playing = document.querySelector(".playing");
const searchInput = document.getElementById("search-input");
const sonStatus = document.getElementById("songStatus");



// Initialize song index
let songIndex = 0;

// Song list
const songs = [
    { filepath: "songs/1.mp3", songName: "darkside", songImage: "image/1.jpg" },
    { filepath: "songs/2.mp3", songName: "alone alan walker", songImage: "image/2.jpg" },
    { filepath: "songs/3.mp3", songName: "warrioyar", songImage: "image/3.jpg" },
    { filepath: "songs/4.mp3", songName: "aaj ki rat artist", songImage: "image/4.jpg" },
    { filepath: "songs/5.mp3", songName: "maship2.0 alanwalker", songImage: "image/5.jpg" },
    { filepath: "songs/6.mp3", songName: "culture jerry", songImage: "image/6.jpg" },
    { filepath: "songs/7.mp3", songName: "ishq faheem abdul", songImage: "image/7.jpg" },
    { filepath: "songs/8.mp3", songName: "o mahi arijit singh", songImage: "image/8.jpg" },
    { filepath: "songs/9.mp3", songName: "o sajni re arijit singh", songImage: "image/9.jpg" },
    { filepath: "songs/10.mp3", songName: "stebin ben shahib", songImage: "image/10.jpg" }
];

// Play and pause functionality
play.addEventListener("click", () => {
    showStatus();
    if (audioElementPlay.paused && videoElementPlay.paused) {
        audioElementPlay.play();
        videoElementPlay.play();
        play.src = "icons/circle-pause.svg";
    } else {
        audioElementPlay.pause();
        videoElementPlay.pause();
        play.src = "icons/circle-play.svg";
    }
});

// Repeat video when audio ends
videoElementPlay.addEventListener("ended", () => {
    if (!audioElementPlay.paused) {
        videoElementPlay.currentTime = 0;
        videoElementPlay.play();
    }
});

// Format time in minutes and seconds
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secondsFormatted = Math.floor(seconds % 60);
    let minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    secondsFormatted = secondsFormatted < 10 ? `0${secondsFormatted}` : secondsFormatted;

    return `${minutesFormatted}:${secondsFormatted}`;
}

// Update current time and progress bar
audioElementPlay.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElementPlay.currentTime / audioElementPlay.duration) * 100);
    myProgressBar.value = progress;
    curTime.innerHTML = formatTime(audioElementPlay.currentTime);
    endedTime.innerHTML = formatTime(audioElementPlay.duration);
});

// Change audio current time when progress bar is adjusted
myProgressBar.addEventListener("change", () => {
    audioElementPlay.currentTime = audioElementPlay.duration * myProgressBar.value / 100;
});

// Play selected song
function playSong() {
    audioElementPlay.src = songs[songIndex].filepath;
    audioElementPlay.currentTime = 0;
    videoElementPlay.play();
    audioElementPlay.play();
    play.src = "icons/circle-pause.svg";
    showStatus();
}

// Event listeners for song items
let isPlaying = false;
songItemplay.forEach((element) => {
    element.addEventListener("click", () => {
        let clickedSongIndex = parseInt(element.id);
        if(isPlaying && songIndex === clickedSongIndex){
            audioElementPlay.pause();
            videoElementPlay.pause();
            isPlaying = false;
            play.src = "icons/circle-play.svg";
        } else {
            songIndex = clickedSongIndex;
            playSong();
            videoElementPlay.play();
            isPlaying = true;
            play.src = "icons/circle-pause.svg";
        }
        
    });
});

// Function to play the next song
function nextSongPlay() {
    songIndex += 1;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    playSong();

}

// Listen for audio end and play next song
audioElementPlay.addEventListener("ended", () => {
    nextSongPlay();
});

// Next button listener
next.addEventListener("click", () => {
    nextSongPlay();
});

// Previous button listener
previous.addEventListener("click", () => {
    songIndex -= 1;

    if (songIndex < 0) {
        songIndex = 0;
    }
    playSong();
});

//Display songinfo function
function showStatus() {
    let currentSong = songs[songIndex];
    let Image = currentSong.songImage;
    let Name = currentSong.songName;

    showImage.innerHTML = `<img  src="${Image}" alt="">`; 
    showName.innerText = `${Name}`;
    sonStatus.innerHTML = `${Name}`

}


//event listener for audioelement play and pause
audioElementPlay.addEventListener("play", () => {
    playing.style.display = "block";
});

audioElementPlay.addEventListener("pause", () => {
    playing.style.display = "none";
});

//search and play song 
searchInput.addEventListener("input", () => {
    const songContainer = document.querySelector(".search-result");
    songContainer.innerHTML = ""; 

    const searchValue = searchInput.value.toLowerCase().trim(); 
    songs.forEach((song,index) => {
        if (song.songName.toLowerCase().includes(searchValue)) { 
            const newChild = document.createElement("div");
            newChild.classList.add("box");
            newChild.innerHTML = `
                <img src="${song.songImage}" alt="Song Image">
                <div class="song-name">
                    <span>${song.songName}</span>
                </div>`;

            newChild.addEventListener("click",()=>{
                songIndex = index;
                playSong();
            });

            songContainer.prepend(newChild);
        }
    });
});































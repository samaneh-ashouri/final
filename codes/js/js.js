
// bmi calculat
document.addEventListener('DOMContentLoaded', function() {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const weightValue = document.getElementById('weight-value');
    const heightValue = document.getElementById('height-value');
    const bmiValue = document.getElementById('bmi-value');
    const bmiStatus = document.getElementById('bmi-status');

    function calculateBMI() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value) / 100; 
        const bmi = weight / (height * height);
        bmiValue.textContent = bmi.toFixed(1);

        let status = '';
        if (bmi < 18.5) {
            status = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            status = 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            status = 'Overweight';
        } else if(bmi >= 30 && bmi<34.9) {
            status = 'Obesity class 1';
        }else if(bmi>=35 && bmi< 39.9){
            status = 'Obesity class 2'
        }else{
            status = 'Obesity class 3'
        }
        bmiStatus.textContent = status;
    }

    weightInput.addEventListener('input', function() {
        weightValue.textContent = weightInput.value;
        calculateBMI();
    });

    heightInput.addEventListener('input', function() {
        heightValue.textContent = heightInput.value;
        calculateBMI();
    });


    calculateBMI();
});


// day counter


var timer;
var compareDate = new Date();
compareDate.setDate(compareDate.getDate() + 5);

timer = setInterval(function () {
    timeBetweenDates(compareDate);
}, 1000);

function timeBetweenDates(toDate){
    var dateEntered =toDate;
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();
    if (difference <= 0){
        clearInterval(timer);
    }else{
        var seconds = Math.floor(difference / 1000);
        var minutes =Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        hours %= 24;
        minutes %= 60;
        seconds %= 60;

        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;
    }
}


// form validaiton 

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
    }else {
        setSuccess(username);
    }

    if (usernameValue.length < 6){
        setError(username, 'Username must ba at least 6 characters');
    }else{
        setSuccess(username)
    }
    
    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }

};




// music player 

const songs = [
    {
        name: "I Will Survive",
        src: "./codes/music/song1.mp3",
        cover: "./codes/music/img/I-will-survive.jpg"
    },
    {
        name: "Bar Fraz Asemanha",
        src: "./codes/music/song2.mp3",
        cover: "./codes/music/img/bar-faraz-asemanha.jpg"
    }
];

let currentSongIndex = 0;

const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');
const timeSlider = document.getElementById('time-slider');
const elapsedTime = document.getElementById('elapsed-time');
const totalTime = document.getElementById('total-time');
const coverImage = document.getElementById('cover-image');
const songName = document.getElementById('song-name');

function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    coverImage.src = song.cover;
    songName.textContent = song.name;
}

playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.classList.remove('fa-play');
        playPauseBtn.classList.add('fa-pause');
    } else {
        audioPlayer.pause();
        playPauseBtn.classList.remove('fa-pause');
        playPauseBtn.classList.add('fa-play');
    }
});

backBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.classList.remove('fa-play');
    playPauseBtn.classList.add('fa-pause');
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.classList.remove('fa-play');
    playPauseBtn.classList.add('fa-pause');
});

audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    timeSlider.value = (currentTime / duration) * 100;
    elapsedTime.textContent = formatTime(currentTime);
    totalTime.textContent = formatTime(duration);
});

timeSlider.addEventListener('input', () => {
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (timeSlider.value / 100) * duration;
});

volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value / 100;
});

audioPlayer.addEventListener('ended', () => {
    nextBtn.click();
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Load the first song initially
loadSong(currentSongIndex);
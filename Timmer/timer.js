var seconds = document.getElementById("seconds");
var minutes = document.getElementById("minutes");
var hours = document.getElementById("hours");
var days = document.getElementById("days");

var startBtn = document.getElementById("startBtn");

var interval;

var sec, min, hr, day;

function timer() {
    if (sec > 0) {
        sec--;
    } else {
        if (min > 0) {
            min--;
            sec = 59;
        } else {
            if (hr > 0) {
                hr--;
                min = 59;
                sec = 59;
            } else {
                if (day > 0) {
                    day--;
                    hr = 23;
                    min = 59;
                    sec = 59;
                } else {
                    clearInterval(interval);
                    alert("Timer finished!");
                    return;
                }
            }
        }
    }

    // Update UI
    seconds.value = sec < 10 ? "0" + sec : sec;
    minutes.value = min < 10 ? "0" + min : min;
    hours.value = hr < 10 ? "0" + hr : hr;
    days.value = day < 10 ? "0" + day : day;
}

function startTimer() {
    // Read values from input fields only when the timer starts
    day = parseInt(days.value) || 0;
    hr = parseInt(hours.value) || 0;
    min = parseInt(minutes.value) || 0;
    sec = parseInt(seconds.value) || 0;

    interval = setInterval(timer, 1000);
    startBtn.disabled = true;
}

function stopTimer() {
    clearInterval(interval);
    startBtn.disabled = false;
}

function resetTimer() {
    clearInterval(interval);

    day = 0;
    hr = 0;
    min = 0;
    sec = 0;

    days.value = "00";
    hours.value = "00";
    minutes.value = "00";
    seconds.value = "00";

    startBtn.disabled = false;
}
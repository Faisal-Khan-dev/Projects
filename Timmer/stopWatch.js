var seconds = document.getElementById("seconds")
var minutes = document.getElementById("minutes")
var hours = document.getElementById("hours")
var days = document.getElementById("days")

var startBtn = document.getElementById("startBtn")

var day = 0
var hr = 0;
var min = 0;
var sec = 1;


function timer() {

    if (sec < 10) {
        seconds.innerHTML = "0" + sec
    } else {
        seconds.innerHTML = sec
    }

    sec++

    if (sec == 60) {

        console.log(`${sec} seconds completed`)
        sec = 0
        min++

        if (min < 10) {
        minutes.innerHTML = "0" + min
    } else {
        minutes.innerHTML = min
        }   
        
    }

    if (min == 60) {

        console.log(`${min} minutes completed`)
        min = 0
        hr++

       if (hr < 10) {
        hours.innerHTML = "0" + hr
    } else {
        hours.innerHTML = hr
        }   
    }

    if (hr == 24) {

        console.log(`${hr} hurs completed`)
        hr = 0
        day++

         if (day < 10) {
        days.innerHTML = "0" + day
    } else {
        days.innerHTML = day
        }  

    }

}

var interval

function startTimer() {

    interval = setInterval(timer, 1000)
    startBtn.disabled = true

}

function stopTimer() {

    clearInterval(interval)
    startBtn.disabled = false
}

function resetTimer() {
    
    clearInterval(interval)
    day = 0
    hr = 0
    min = 0
    sec = 0
    
    days.innerHTML = "00"
    hours.innerHTML = "00"
    minutes.innerHTML = "00"  
    seconds.innerHTML = "00"  

    startBtn.disabled = false
}
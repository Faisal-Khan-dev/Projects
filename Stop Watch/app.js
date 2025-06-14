var minHeading = document.getElementById("minHeading")
var secHeading = document.getElementById("secHeading")
var msecHeading = document.getElementById("msecHeading")
var startBtn = document.getElementById("startBtn")

var minute = 0;
var second = 0;
var milliSecond = 1;

function timer() {

    
    if (milliSecond < 10) {
        msecHeading.innerHTML = "0" + milliSecond
    } else {
        msecHeading.innerHTML = milliSecond
    }

    milliSecond++

    if (milliSecond == 100) {

        console.log(`${milliSecond} milli seconds completed`)
        milliSecond = 0
        second++

        if (second < 10) {
            secHeading.innerHTML = "0" + second
        } else {
            secHeading.innerHTML = second
        }
        
    }

    if (second == 60) {
        if (second == 1) {
            console.log(`${second} seconds completed`)
        }
        second = 0
        minute++
        if (minute < 10) {
            minHeading.innerHTML = "0" + minute
        } else {
            minHeading.innerHTML = minute
        }
        
        
    }

}

var interval

function startTimer() {

    interval = setInterval(timer, 10)
    startBtn.disabled = true

}

function stopTimer() {

    clearInterval(interval)
    startBtn.disabled = false
}

function resetTimer() {
    
    clearInterval(interval)
    minute = 0
    second = 0
    milliSecond = 0
    
    msecHeading.innerHTML = "00"
    secHeading.innerHTML = "00"
    minHeading.innerHTML = "00"  

    startBtn.disabled = false

}
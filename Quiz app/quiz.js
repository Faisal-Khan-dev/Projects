const quizQuestions = [
    {
        id: 1,
        question: "HTML stands for?",
        options: {
            a: "Hyper Text Markup Language",
            b: "Hyper Text Programming Language",
            c: "Hyper Text Styling Language",
            d: "Hyper Text Scripting Language"
        },
        answer: "Hyper Text Markup Language"
    },
    {
        id: 2,
        question: "Which language is used for styling web pages?",
        options: {
            a: "HTML",
            b: "CSS",
            c: "JavaScript",
            d: "PHP"
        },
        answer: "CSS"
    },
    {
        id: 3,
        question: "Which of these is a JavaScript framework?",
        options: {
            a: "Django",
            b: "React",
            c: "Laravel",
            d: "Bootstrap"
        },
        answer: "React"
    },
    {
        id: 4,
        question: "Which tag is used to define a hyperlink in HTML?",
        options: {
            a: "link",
            b: "a",
            c: "href",
            d: "url"
        },
        answer: "a"
    },
    {
        id: 5,
        question: "Which company developed JavaScript?",
        options: {
            a: "Microsoft",
            b: "Netscape",
            c: "Oracle",
            d: "Sun Microsystems"
        },
        answer: "Netscape"
    },
     {
        id: 6,
        question: "Which of these is not a programming language?",
        options: {
            a: "Python",
            b: "HTML",
            c: "Java",
            d: "C++"
        },
        answer: "HTML"
    },
    {
        id: 7,
        question: "What does CSS stand for?",
        options: {
            a: "Creative Style Sheets",
            b: "Cascading Style Sheets",
            c: "Colorful Style Sheets",
            d: "Cascading Script Sheets"
        },
        answer: "Cascading Style Sheets"
    },
    {
        id: 8,
        question: "Which HTML tag is used to display an image?",
        options: {
            a: "img",
            b: "image",
            c: "picture",
            d: "src"
        },
        answer: "img"
    },
    {
        id: 9,
        question: "Which HTML tag is used to define a table?",
        options: {
            a: "table",
            b: "thead",
            c: "tr",
            d: "tb"
        },
        answer: "table"
    },
    {
        id: 10,
        question: "Which one is not a JavaScript data type?",
        options: {
            a: "String",
            b: "Boolean",
            c: "Object",
            d: "Function"
        },
        answer: "Function"
    }
]


let indexNumber = 0
const count = document.getElementById("count")
const nextBtn = document.getElementById("nextBtn")
count.innerHTML = `${indexNumber + 1} / ${quizQuestions.length}`
let correctAnscount = 0
let wrongAnscount = 0
let quizStarted = false;


function renderUi() {
    const question = document.getElementById("question")
    const options = document.getElementById("options")
    
    


    question.innerHTML = `${indexNumber + 1}. ` +  quizQuestions[indexNumber].question
    // options.innerHTML = `<li>${quizQuestions[indexNumber].options.a}</li>
    //             <li>${quizQuestions[indexNumber].options.b}</li>
    //             <li>${quizQuestions[indexNumber].options.c}</li>
    //             <li>${quizQuestions[indexNumber].options.d}</li>`
    
    const optionsList = quizQuestions[indexNumber].options
    console.log(optionsList)
    
    options.innerHTML = ""
    for (var key in optionsList){
        options.innerHTML += `<li onclick="checkAns(this)">${optionsList[key]}</li>`
    }

}



function nextQues() {

    indexNumber++
    console.log(indexNumber);
    
    if (indexNumber == quizQuestions.length-1) {
        nextBtn.innerHTML = "submit"
        nextBtn.style.backgroundColor = "#8B80B6"
        nextBtn.style.padding="5px 10px"
    }
    if (indexNumber < quizQuestions.length) {
        renderUi()
        count.innerHTML = `${indexNumber + 1} / ${quizQuestions.length}`
    } else {
        console.log("SUbmit Quiz");

        const percentage = (correctAnscount / quizQuestions.length) * 100
        const attempt = (correctAnscount + wrongAnscount)
        let rank;
        let feedback;

        if (percentage > 80 && percentage < 100) {
            rank = "A+"
            feedback = "Excellent"
        } else if (percentage > 70 && percentage < 80) {
            rank = "A"
            feedback = "Good"
        } else if (percentage > 60 && percentage < 70) {
            rank = "B"
            feedback = "Better"
        } else {
            rank = "Fail"
            feedback = "Try Again"
        }

        if (correctAnscount < 10) {
            correctAnscount = "0" + correctAnscount
        }
        if (wrongAnscount < 10) {
            wrongAnscount = "0" + wrongAnscount
        }

        const reportObj = {
            total:quizQuestions.length,
            correctAnscount,
            wrongAnscount,
            percentage,
            rank,
            feedback,
            attempt,
        }
        
        localStorage.setItem("userReport" , JSON.stringify(reportObj))
        window.location.replace("./report.html")
    }

    nextBtn.disabled = true
    
}

function checkAns(ele) {
    if (!quizStarted) {
        alert("Start The Quiz First")
        return;
    }

    console.log(ele.innerHTML);
    const allLi = document.getElementById("options").children
    console.log(allLi);
    
    const userSelection = ele.innerHTML
    const correctAns = quizQuestions[indexNumber].answer

    if (userSelection === correctAns) {
        ele.style.background = "green"
        correctAnscount++
    } else {
        ele.style.background = "red"
        wrongAnscount++

        for (var i = 0; i < allLi.length; i++) {
            if (allLi[i].innerHTML === correctAns) {
                allLi[i].style.background = "green"
                break
            }
        }
    }

    for (var i = 0; i < allLi.length; i++){
        allLi[i].style.pointerEvents = "none"
    }

    nextBtn.disabled = false
    
}

function userLogin() {

    const header = document.getElementById("header")
    var userObj = JSON.parse(localStorage.getItem("user"))
    console.log(userObj);
    

    header.innerHTML = ` <div>
                <p>
                    <span class = "txtBold">Name:</span> ${userObj.name}
                </p>
                <p>
                    <span class = "txtBold">Email:</span> ${userObj.email}
                </p>
            </div>

            <div>
                <p class = "time">

                    <span class = "txtBold">Time:</span> <span id= "minutes">${5}</span>:<span id= "seconds">${"00"}</span>
                </p>
                <p>

                    <button id = "startBtn" onclick = "startTimer()">Start</button>
                </p>
            </div>
`
}

var min = 4;
var sec = 59
function timer() {
    const minutesElem = document.getElementById("minutes");
    const secondsElem = document.getElementById("seconds");
    if (sec > 0) {
       
        secondsElem.innerHTML = sec < 10 ? "0" + sec : sec;
        sec--;
        
    } else {
        if (min > 0) {
            min--;
            sec = 59;
             minutesElem.innerHTML = min < 10 ? "0" + min : min;
            secondsElem.innerHTML = "59";
        } else {
            clearInterval(interval);
            alert("Timer finished!");
            window.location.replace("./report.html")
        }
    }
    
}


function startTimer() {
    const minutesElem = document.getElementById("minutes");
    const secondsElem = document.getElementById("seconds");
    const startBtn = document.getElementById("startBtn");
    quizStarted = true;

    console.log("start")

    min = parseInt(minutesElem.innerText) || 0;
    sec = parseInt(secondsElem.innerText) || 0;

    interval = setInterval(timer, 1000);
    startBtn.disabled = true
}
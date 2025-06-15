
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
                <button onclick="logOut()" class="logOut">Logout</button>
            </div>
`
}

function userReport() {
    const userReport = JSON.parse(localStorage.getItem("userReport"))
    const report = document.getElementById("report")

    reportCard.innerHTML = `
        
        <h1 class="txtCenter">REPORT CARD</h1>

        <div>
            <h3>Total Question = <span class = "txtcolors">${userReport.total}</span></</h3>
        </div>
        <div>
            <h3>Attempt Question = <span class = "txtcolors">${userReport.attempt}</span></</h3>
        </div>
        <div>
            <h3>Correct Answers = <span class = "txtcolors">${userReport.correctAnscount}</span></</h3>
        </div>
        <div>
            <h3>Wrong Answers = <span class = "txtcolors">${userReport.wrongAnscount}</span></</h3>
        </div>
        <div>
            <h3>Percentage = <span class = "txtcolors">${userReport.percentage}%</span></</h3>
        </div>
        <div>
            <h3>Rank = <span class = "txtcolors">${userReport.rank}</span></</h3>
        </div>
        <div>
            <h3>Feedback = <span class = "txtcolor">${userReport.feedback}</span></h3>
        </div>`
    
    
}
userReport()

function logOut(){
    window.location.replace("./index.html")
}
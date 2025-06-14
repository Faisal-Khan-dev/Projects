const loginContainer = document.getElementById("loginContainer");

loginContainer.addEventListener("submit", loginHandler);


function loginHandler(event) {
    event.preventDefault();
    
    // console.log("login");
    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value

    if (name === "" || email === "") {
        alert("Enter both name and email")
    } else {
        const obj = {
            name,
            email,
        }

        console.log(obj);
        localStorage.setItem("user", JSON.stringify(obj));
        alert("Login Successfully");
        window.location.replace("./quiz.html")
    
    }
}
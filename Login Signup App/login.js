function loginHandler() {
    
    var email = document.getElementById("email")
    var password = document.getElementById("password")

    var getUsers = JSON.parse(localStorage.getItem("users"))
        console.log(getUsers, "getUsers")
    
    if (!getUsers) {
        alert("invalid email or password")
        return
    }

    for (var userObj of getUsers) {
        // console.log("email" , userObj.email)
        // console.log("password" , userObj.password)
        
        if (userObj.email === email.value && userObj.password === password.value) {
            localStorage.setItem("userLogin", JSON.stringify(userObj))
             alert("LOGIN Successfully!")
            window.location.href = "./todo.html"

            return
        }
    }
    alert("invalid email or password!")
}
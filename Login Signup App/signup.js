function signupHandler() {
    
    var firstName = document.getElementById("firstName")
    var lastName = document.getElementById("lastName")
    var email = document.getElementById("email")
    var password = document.getElementById("password")

    var userObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
    }
    // console.log(userObj);
    

    // var arr = [userObj]
    // localStorage.setItem("users", JSON.stringify(arr))

    var getUsers = localStorage.getItem("users")
    
    if (getUsers == null) {

        var arr = [userObj]
        localStorage.setItem("users", JSON.stringify(arr))
        alert("user successfully signup!")
        window.location.href = "./index.html"

    } else {
        
        var usersArr = JSON.parse(getUsers)

        for (var i = 0; i < usersArr.length; i++) {
            console.log(usersArr[i].email)
            if (userObj.email === usersArr[i].email) {
                alert("Email Address Already exist")
                return
            }
        }
        usersArr.push(userObj)
        // console.log("usersArr updated", usersArr)

        localStorage.setItem("users" , JSON.stringify(usersArr))
        alert("user successfully signup!")
        window.location.href = "./index.html"

    }

}


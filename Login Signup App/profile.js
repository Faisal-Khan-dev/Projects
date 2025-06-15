function RenderUI() {
    var firstName = document.getElementById("firstName")
    var lastName = document.getElementById("lastName")
    var email = document.getElementById("email")
    var password = document.getElementById("password")

    var getUser = JSON.parse(localStorage.getItem("userLogin"))

    firstName.value = getUser.firstName
    lastName.value = getUser.lastName
    email.value = getUser.email
    password.value = getUser.password
}

function profileHandler() {
     var firstName = document.getElementById("firstName")
    var lastName = document.getElementById("lastName")
    var email = document.getElementById("email")
    var password = document.getElementById("password")

    var user = JSON.parse(localStorage.getItem("userLogin"))
    var getUsers = JSON.parse(localStorage.getItem("users"))



    var updatedobj = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    }

    for (var i = 0; i < getUsers.length; i++){
        if (getUsers[i].email == user.email) {
            getUsers[i] = updatedobj
            }   
        }
  
    user = updatedobj
    localStorage.setItem("users" , JSON.stringify(getUsers))    
    localStorage.setItem("userLogin" , JSON.stringify(user))    
      
    
}
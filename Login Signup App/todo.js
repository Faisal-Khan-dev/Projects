function addTodo() {
    
    var todoInput = document.getElementById("todoInput")

    var userObj = JSON.parse(localStorage.getItem("userLogin"))

    var todoObj = {
        todo: todoInput.value,
        email: userObj.email
    }

    var todoArr = (localStorage.getItem("todos"))
    console.log("todoData", todoArr);
    
    if (todoArr == null) {
        var arr = [todoObj]
        localStorage.setItem("todos", JSON.stringify(arr))
        console.log("todoData" , todoArr)
        
    } else {
        var todoArr = JSON.parse(todoArr)
        todoArr.push(todoObj)
        console.log("todoArr", todoArr)
        localStorage.setItem("todos" , JSON.stringify(todoArr))
    }
    
        renderUI()

}

function renderUI() {
    
     var todoArr = JSON.parse(localStorage.getItem("todos"))
    console.log("renderUI", todoArr)

    var parent = document.getElementById("listContainerid")
    parent.innerHTML = ""

    if (todoArr == null) {
        return
    }

    for (var i = 0; i < todoArr.length; i++) {
        console.log(todoArr[i].todo)
        parent.innerHTML += `<div class="list">
            <h5>${todoArr[i].todo}</h5>
            <div class=${"listBtn"}>
                <button onclick = "editTodo(${i})">Edit</button>
                <button onclick = "delTodo(${i})">Delete</button>
            </div>
        </div>`
    }
    var todoInput = document.getElementById("todoInput")
    todoInput.value = ""

}



function editTodo(index) {

    var userLogin = JSON.parse(localStorage.getItem("userLogin"))
    // console.log(userLogin.email)

    var todoArr = JSON.parse(localStorage.getItem("todos"));
    // console.log("renderUI", todoArr)

    if (todoArr[index].email == userLogin.email) {
        
            // Prompt the user with current todo value
        var updateTodo = prompt("Edit your task:", todoArr[index].todo);

        // If user entered a new value (and didn't cancel or leave empty)
        if (updateTodo !== null && updateTodo !== "") {
            todoArr[index].todo = updateTodo;
            localStorage.setItem("todos", JSON.stringify(todoArr));
            renderUI(); // Re-render updated list
        }
    } else {
        alert("Email does not match,you can't edit this todo!")
    }
    
}

function delTodo(index) {

 var userLogin = JSON.parse(localStorage.getItem("userLogin"))
    // console.log(userLogin.email)

 var todoArr = JSON.parse(localStorage.getItem("todos"));
        // console.log("renderUI", todoArr)    
    
    if (todoArr[index].email == userLogin.email) {
        
        todoArr.splice(index, 1)
        
        localStorage.setItem("todos" , JSON.stringify(todoArr))
         renderUI();
         
    } else {
        alert("Email does not match,you can't delete this todo!")
    }
}

function delAllTodos() {

//  var todoArr = JSON.parse(localStorage.getItem("todos"));
    // console.log("renderUI", todoArr) 
    
    localStorage.removeItem("todos");
    // console.log("renderUI", todoArr)

    // localStorage.setItem()

    renderUI();
}
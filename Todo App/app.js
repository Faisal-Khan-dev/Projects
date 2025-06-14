
var listParent = document.getElementById("listParent")

function createNote() {
    var input = document.getElementById("input");
    console.log("createNote", input.value);

    if (!input.value) {
        alert("Message required!");
        return;
    }

    var liElement = document.createElement("li");
    liElement.className = "list"

    var hElement = document.createElement("h3");
    hElement.innerHTML = input.value;
    hElement.className = "txt"
    console.log("pElement", hElement);
    liElement.appendChild(hElement);

    var divElement = document.createElement("div")
    divElement.className = "divbtn"
    liElement.append(divElement)

    var editBtn = document.createElement("button")
    editBtn.innerHTML = "EDIT"
    editBtn.className = "btn1"
    editBtn.setAttribute("onclick" , "editTodo(this)")

    var deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = "Delete"
    deleteBtn.className = "btn2"
    deleteBtn.setAttribute("onclick", "deleteTodo(this)")

    var completebtn = document.createElement("button");
    completebtn.innerHTML = "complete";
    completebtn.className = "btn3"
    completebtn.setAttribute("onclick", "completeTodo(this)");

    divElement.append(editBtn)
    divElement.append(deleteBtn)
    divElement.append(completebtn)
    
    console.log("liElement", liElement);
    listParent.append(liElement);
    input.value = "";
}

function editTodo(editbtn) {
    var editValue = prompt("Enter edit value", editbtn.parentNode.previousSibling.textContent);

    if (!editValue) {
        alert("Enter edit value!")
        return;
    }

    editbtn.parentNode.previousSibling.textContent = editValue;
}

function deleteTodo(deletebtn) {
    console.log("deleteTodo()" , deletebtn.parentNode)
    deletebtn.parentNode.parentNode.remove();
}

function deleteAll() {
    listParent.innerHTML = ""
}

function completeTodo(completebtn) {
    console.log("btn", completebtn.parentNode);
    completebtn.parentNode.previousSibling.className = "liLine";
    
  }
import { app, db, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "./firebase.js"

const addBtn = document.getElementById("addBtn")
const input = document.getElementById("input") 
const parent = document.getElementById("listContainerid")
const todoCollection = collection(db, "todos")

// addBtn.addEventListener("click", addTodo)
window.addEventListener("load", renderUI)

async function addTodo() {
    try {
        if (!input.value) {
            alert("Enter todo value")
            return
        }

        const todoObj = {
            todo: input.value.trim()
        }

        const docRef = await addDoc(todoCollection, todoObj)
        // console.log("Document written with ID: ", docRef.id);
        input.value = ""

        await renderUI()

    } catch (error) {
        console.log("Error", error.message)
    }
}

async function renderUI() {
    try {
        const querySnapshot = await getDocs(todoCollection)
        const arr = []

        querySnapshot.forEach((doc) => {
            const updatedTodoobj = {
                ...doc.data(), // 
                id: doc.id
            }
            arr.push(updatedTodoobj)
            console.log("Array" , arr);
            
        })

        parent.innerHTML = ""

        for (var i = 0; i < arr.length; i++) {
            parent.innerHTML += `<div class="list">
                <h5>${arr[i].todo}</h5>
                <div class="listBtn">
                    <button class = "contAddbtn" onclick="editTodo('${arr[i].id}', '${arr[i].todo}')">Edit</button>
                    <button class = "contDelbtn" onclick="delTodo('${arr[i].id}')">Delete</button>
                </div>
            </div>`
        }

    } catch (error) {
        console.log("Error", error.message)
    }
}

async function editTodo(id , todo) {
    // console.log("hello world");

    try {

        
        // console.log(id, "id");
        
        var editTodo = prompt("enter todo", todo)
        if (!editTodo) return;
     
        const updatedObj = {
            todo: editTodo
        }
   

    await updateDoc(doc(db, "todos", id), updatedObj);
        alert("updated successfully");
        await renderUI()
  } catch (error) {
    alert(error.message);
  }
    
}

async function delTodo(id) {

     try {
    // await deleteDoc(doc(database , collectionName , docID - UID))
    await deleteDoc(doc(db, "todos", id));
         alert("Deleted Successfully");
         await renderUI()
         
  } catch (error) {
      console.log("error" , error.message); 
  }
}

async function delAllTodos() {
    try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        const array = [];

        querySnapshot.forEach((todo) => {
            const docRef = doc(db, "todos", todo.id);
            array.push(deleteDoc(docRef));
        });

        await Promise.all(array);
        alert("All todos deleted");
        await renderUI()
    } catch (error) {
        console.error("Error deleting documents: ", error.message);
    }
}


window.addTodo = addTodo;
window.renderUI = renderUI;
window.editTodo = editTodo;
window.delTodo = delTodo;
window.delAllTodos = delAllTodos;
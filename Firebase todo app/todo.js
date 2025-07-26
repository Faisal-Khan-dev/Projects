import { addDoc, collection, db, doc, getDoc, getDocs, deleteDoc, updateDoc } from "./firebase.js";

let userData;


const privateRouteCheck = () => {
  const uid = localStorage.getItem("uid");
  console.log("privateRouteCheck", uid);
  if(!uid){
    window.location.replace("./index.html")
  }

};


window.addEventListener("load" , privateRouteCheck)

const fetchUserData = async () => {
  const userUid = localStorage.getItem("uid");
  //   console.log("HELLO DASHBOARD", userUid);
  const user = await getDoc(doc(db, "users", userUid));
  console.log("user", user.data());
  userData = user.data();
};

const addTodo = async () => {
  try {
    const todoTitle = document.getElementById("todoTitle");
    // const todoDesc = document.getElementById("todoDesc");

    if (!todoTitle.value) {
      alert("required field missing!");
      return;
    }

    const todoObj = {
      title: todoTitle.value,
    //   desc: todoDesc.value,
      uid: userData.uid,
      userName: userData.firstName + " " + userData.lastName,
      userEmail: userData.email,
    };
    console.log("todoObj", todoObj);

    await addDoc(collection(db, "todos"), todoObj);
    alert("Todo Created!");
    fetchTodos()
  } catch (error) {
    alert(error.message);
  }
};

const fetchTodos = async () => {
  const querySnapShot = await getDocs(collection(db, "todos"));

  const tempArr = [];
  querySnapShot.forEach((doc) => {
    // console.log("doc", doc.data());
    // console.log("doc id", doc.id);
    const obj = {
      ...doc.data(),
      id: doc.id,
      };
        console.log("obj", obj);

    tempArr.push(obj);
  });
  console.log("tempArr", tempArr);

  const cardListing = document.getElementById("cardListing");
  cardListing.innerHTML = ""
//   for (const obj of tempArr) {
    // console.log("obj", obj);

    for (var i = 0; i < tempArr.length; i++) {
            cardListing.innerHTML += `<div class="list">
                <h5>${tempArr[i].title}</h5>
                <div class="listBtn">
                    <button class = "contAddbtn" onclick="editTodo('${tempArr[i].id}', '${tempArr[i].title}')">Edit</button>
                    <button class = "contDelbtn" onclick="delTodo('${tempArr[i].id}')">Delete</button>
                </div>
            </div>`
        }
};



async function editTodo(id , title) {
    // console.log("hello world");

    try {

        // console.log(id, "id");
        var editTodo = prompt("enter todo", title)
        if (!editTodo) return;
     
        const updatedObj = {
            title: editTodo
        }
   

    await updateDoc(doc(db, "todos", id), updatedObj);
        alert("updated successfully");
        await fetchTodos()
  } catch (error) {
    alert(error.message);
  }
    
}



async function delTodo(ele) {

     try {
    // await deleteDoc(doc(database , collectionName , docID - UID))
    await deleteDoc(doc(db, "todos", ele));
         alert("Deleted Successfully");
         await fetchTodos()
         
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
        await fetchTodos()
    } catch (error) {
        console.error("Error deleting documents: ", error.message);
    }
}

function logout() {
  window.location.replace("./index.html")
}



window.fetchUserData = fetchUserData;
window.addTodo = addTodo;
window.editTodo = editTodo;
window.fetchTodos = fetchTodos;
window.delTodo = delTodo;
window.delAllTodos = delAllTodos;
window.logout = logout;
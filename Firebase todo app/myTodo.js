
import {
  collection,
  db,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "./firebase.js";

const privateRouteCheck = () => {
  const uid = localStorage.getItem("uid");
  console.log("privateRouteCheck", uid);
  if(!uid){
    window.location.replace("./index.html")
  }

};


window.addEventListener("load" , privateRouteCheck)


const fetchMyTodos = async () => {
  //   console.log("fetchMyTodos");
  const userUid = localStorage.getItem("uid");

  //   const todoRef = collection(db, "todos");
  //   const q = query(todoRef, where("uid", "==", userUid));
  //   const querySnapShot = await getDocs(q);

  const querySnapShot = await getDocs(
    query(collection(db, "todos"), where("uid", "==", userUid))
  );

  console.log("querySnapShot", querySnapShot);
  const tempArr = [];
  querySnapShot.forEach((doc) => {
    console.log("doc data", doc.data());
    const obj = {
      ...doc.data(),
      id: doc.id,
    };
    tempArr.push(obj);
  });

  const cardListing = document.getElementById("cardListing");
  cardListing.innerHTML = "";

  for (var i = 0; i < tempArr.length; i++) {
            cardListing.innerHTML += `<div class="list">
                <h5>${tempArr[i].title}</h5>
                <div class="listBtn">
                    <button class = "contAddbtn" onclick="editTodo('${tempArr[i].id}', '${tempArr[i].title}')">Edit</button>
                    <button class = "contDelbtn" onclick="deleteTodo('${tempArr[i].id}')">Delete</button>
                </div>
            </div>`
        }
  }


const deleteTodo = async (ele) => {
  console.log("deleteTodo", ele);
  await deleteDoc(doc(db, "todos", ele));
  alert("deleted");
  fetchMyTodos();
};

const editTodo = async (ele , title) => {
  console.log("editTodo", ele);

  var editTitle = prompt("enter todo", title)
  if (!editTodo) return;
  

  const updateObj = {
    title: editTitle,
  };

  await updateDoc(doc(db, "todos", ele), updateObj);
  alert("todo udpated");
  fetchMyTodos()
};


function logout() {
  window.location.replace("./index.html")
}






window.fetchMyTodos = fetchMyTodos;
window.deleteTodo = deleteTodo;
window.editTodo = editTodo;
window.logout = logout;
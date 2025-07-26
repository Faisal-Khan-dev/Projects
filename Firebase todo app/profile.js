
import {
  db,
  doc,
  getDoc
} from "./firebase.js";

function logout() {
  window.location.replace("./index.html")
}

const renderUI = async() => {
  const firstName = document.getElementById("firstName")
  const lastName = document.getElementById("lastName")
  const email = document.getElementById("email")


   const userUid = localStorage.getItem("uid");

  const user = await getDoc(doc(db, "users", userUid));
  console.log("user", user.data());
  const userData = user.data();
  
  
}



window.logout = logout;
window.renderUI = renderUI;
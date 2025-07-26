import{ app, db, auth,signInWithEmailAndPassword, collection, addDoc, getDocs,doc,setDoc, deleteDoc, updateDoc } from "./firebase.js"


window.showPass = function (icon) {
  const passwordInput = document.getElementById("password");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
}
};

const authCheck = () => {
  console.log("authCheck");
  const uid = localStorage.getItem("uid");
  console.log("uid", uid);
  if(uid){
    window.location.replace("./dashboard.html")
  }

};

async function login() {
  
   // console.log("signup");

  try {

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email, password);
    
    const userLogin = await signInWithEmailAndPassword(auth, email, password)
    console.log(userLogin);

    localStorage.setItem("uid" , userLogin.user.uid)
    
    window.location.replace("./dashboard.html")
  
    
    

    
  } catch (error) {
    console.log("error", error.message);
    alert(error.message)
      
  }

}




window.login = login;
window.authCheck = authCheck;
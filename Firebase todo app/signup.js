import{ app, db, auth,createUserWithEmailAndPassword, collection, addDoc, getDocs,doc,setDoc, deleteDoc, updateDoc } from "./firebase.js"


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


async function signUp(e) {
  // console.log("signup");

  try {

     const firstName = document.getElementById("firstName").value
  const lastName = document.getElementById("lastName").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  
    
    const userAuth = await createUserWithEmailAndPassword(auth, email, password)
    // console.log("user" , user);
    console.log("user id", userAuth.user.uid);
    
    const uid = userAuth.user.uid

    const userObj = {
      firstName,
      lastName,
      email,
      accountActivate: true,
      uid,
    }
    // console.log("authObj" , userObj);

    const userRef = doc(db, "users", uid);
    const userDB = await setDoc(userRef, userObj);
    console.log("userDB" , userDB);
    
    window.location.assign("/")


    
  } catch (error) {
    console.log("error", error.message);
    alert(error.message)
      
  }

}

window.signUp = signUp;

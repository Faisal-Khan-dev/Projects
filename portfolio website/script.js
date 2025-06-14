
// menu burger icon functioning

var x = 1;
function menu() {
  if (x == 1) {
    document.querySelector(".mobile-pages").style.display = "flex";
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#close").style.display = "inline-block";


    x = 0;
  }
  else if (x == 0) {
    document.querySelector(".mobile-pages").style.display = "none";
    document.querySelector("#menu").style.display = "inline-block";
    document.querySelector("#close").style.display = "none";
    x = 1;
  }
}

// form data posting

  const scriptURL = 'https://script.google.com/macros/s/AKfycbxWnj9oSYX_kdCff0yVV_MQQcdWyEhnASaVQS_R-3hbKjjAw98ltX1wyu_HgPEyb6htdA/exec';
  const form = document.getElementById("contactForm");
const responseMsg = document.getElementById("responseMsg");
const btn = document.getElementById("submit");
btn.disabled = false;

form.addEventListener("submit", e => {
    btn.disabled
    e.preventDefault();
  const formData = new FormData(form);
  btn.disabled = true;

    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => {
        responseMsg.textContent = "Form submitted successfully!";
        form.reset();
      })
      .catch(error => {
        responseMsg.textContent = "Submission failed. Please email directly.";
        console.error('Error!', error.message);
      });
  });


  // about modal working

const aboutModal = document.getElementById("modalAbout");
const black = document.getElementById("black");

function modalOpening() {

  aboutModal.classList.add("open")
  black.style.display = "inline-block";
  aboutModal.style.display = "inline-block";
}
function modalClosing() {
  setTimeout(() => {
    black.style.display = "none";
  aboutModal.style.display = "none";
  },0)
}



// projects modal
const projectModal = document.getElementById("modalProject");

function modalProjectOpening() {

  projectModal.classList.add("open")
  black.style.display = "inline-block";
  projectModal.style.display = "inline-block";
}
function modalProjectClosing() {
  setTimeout(() => {
    black.style.display = "none";
  projectModal.style.display = "none";
  },0)
}



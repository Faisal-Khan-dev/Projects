let a = document.querySelectorAll("a")

a.forEach(element => {
    // element.addEventListener("click", () => {
    //     alert("You are going to redirect to netflix website")
    // })
    element.removeAttribute("href");
    element.href = "#";
    element.target = "";
});
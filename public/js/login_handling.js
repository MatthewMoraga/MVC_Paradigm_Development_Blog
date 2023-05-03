// a function for error handling that sends the user back an error
// then an alert is shown and sends them back to the root 

const loginFormHandling = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    if (email & password) {

        
    } else {
        alert("no user found");
        document.location.replace("/");
    }
}

const loginForm = document.querySelector(".loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", loginFormHandling);
}

// function that handles the register functionality of the register page
// when the user enters and email, username, and password the server responds
// then a button is pressed that initiates the function
// and checks to see if they are valid to store to the database 
// if the values are valid then store the values and send the user to their dashboard page
// otherwise throw the user an error 
// then the event listener below checks the form to see if the conditions are met

const registerFormHandling = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (email && username && password) {
        const registerResponse = await fetch("/auth/register", {
            method: "POST",
            body: JSON.stringify({ email, username, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (registerResponse.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("fields can't be registered");
        }
    }
};

const registerForm = document.querySelector(".register-form");
if (registerForm) {
    registerForm.addEventListener("submit", registerFormHandling);
}
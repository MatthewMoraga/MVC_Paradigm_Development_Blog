// function that handles the login functionality of the login page
// when the user enters their login with email and password the
// then a button is pressed that initiates the function
// server responds back with a post method that checks the users info
// if the user is successull then they are redirected to their dashboard
// otherwise throw the user an error
// then the event listener below checks the form to see if the conditions are met


const loginHandling = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value.trim();

    if (email && password) {
        
        const loginResponse = await fetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });
        
        if (loginResponse.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("no user found");
        }
    }
}

// login page form event listener for the submit button

const loginPageForm = document.querySelector(".login-form");
if (loginPageForm) {
    loginPageForm.addEventListener("submit", loginHandling)
}
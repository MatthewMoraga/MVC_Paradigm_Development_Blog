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
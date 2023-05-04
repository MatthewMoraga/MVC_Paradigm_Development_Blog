const loginHandling = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value.trim();

    if (email && password) {
        
        const loginResponse = await fetch("/api/auth/users", {
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

const loginPageForm = document.querySelector(".login-form");
if (loginPageForm) {
    loginPageForm.addEventListener("submit", loginHandling)
}
import { loginUser } from "./auth.js";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await loginUser(email, password);
        // Si sale bien, redirigimos al inventario
        window.location.href = "index.html"; 
    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        alert("Error: " + error.message);
    }
});
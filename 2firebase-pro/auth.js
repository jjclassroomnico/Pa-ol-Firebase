import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";
import { app } from "./conexion.js";

export const auth = getAuth(app);

// Función para registrar usuario
export const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// Función para iniciar sesión
export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Función para cerrar sesión
export const logoutUser = () => signOut(auth);

// Escuchador de estado de autenticación (esto es lo que protege tus páginas)
export const checkAuth = (callback) => onAuthStateChanged(auth, callback);
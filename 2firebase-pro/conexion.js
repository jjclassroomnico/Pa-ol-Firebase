// El nombre correcto es firebase-app.js (no firebase-firestore-app.js)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";

// Esta línea está perfecta, solo asegúrate de que no haya espacios raros
import { 
    getFirestore,
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw4XX96czHjxMPFayVAZZf3v1lsPYtS68",
  authDomain: "fir-nicoc.firebaseapp.com",
  projectId: "fir-nicoc",
  storageBucket: "fir-nicoc.firebasestorage.app",
  messagingSenderId: "626339561756",
  appId: "1:626339561756:web:1acbd9ce66dcb3bbd87ad9",
  measurementId: "G-E5Z4HP601D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveTool = (nombre, funcion) => {
         addDoc(collection(db, 'herramientas'), {nombre,funcion})

  }

  export const getTools = () => getDocs(collection(db,'herramientas'))

  export const onGetTools = (callback) => onSnapshot(collection(db,'herramientas'),callback)

  export const deleteTool = (id) => deleteDoc(doc(db,'herramientas',id))

  export const getTool = (id) => getDoc(doc(db,'herramientas', id))

  export const updateTool = (id, newFields) => updateDoc (doc(db,'herramientas',id),newFields)

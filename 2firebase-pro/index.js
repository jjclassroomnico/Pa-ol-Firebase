import {
  onGetTools,
  saveTool,
  deleteTool,
  getTool,
  updateTool
} from "./conexion.js";

import { checkAuth } from "./auth.js";

checkAuth((user) => {
    if (!user) {
        window.location.replace("login.html");
    } else {
        document.body.style.visibility = "visible";
        console.log("Acceso concedido");
    }
});

import { logoutUser } from "./auth.js";

const btnLogout = document.getElementById("btn-logout");

btnLogout.addEventListener("click", async () => {
    await logoutUser();
    window.location.href = "login.html"; // Redirigir al login al salir
});

const toolContainer = document.getElementById("tools-container");
const toolForm = document.getElementById("tool-form");

let estado = false;
let idEditando = "";

window.addEventListener("DOMContentLoaded", () => {

  onGetTools((querySnapshot) => {
    let html = "";
    querySnapshot.forEach((doc) => {
      const tool = doc.data();
      html += `
        <div class="card-tarea">
            <h3>${tool.nombre}</h3>
            <p>${tool.funcion}</p>
            <div class="card-botones">
                <button class='btn-delete' data-id="${doc.id}">Eliminar</button>
                <button class='btn-edit' data-id="${doc.id}">Editar</button>
            </div>
        </div>    
      `;
    });
    toolContainer.innerHTML = html;
  });
});


toolContainer.addEventListener("click", async (e) => {
  
  // Buscar el botón más cercano al clic (.closest soluciona el problema de tocar el texto)
  const btnDelete = e.target.closest('.btn-delete');
  const btnEdit = e.target.closest('.btn-edit');

  // Lógica de Eliminar
  if (btnDelete) {
    const id = btnDelete.dataset.id;
    if (confirm("¿Estás seguro de eliminar esta herramienta?")) {
      await deleteTool(id);
    }
    return;
  }

  // Lógica de Editar
  if (btnEdit) {
    const id = btnEdit.dataset.id;
    const doc = await getTool(id);
    const tool = doc.data();

    // Sincronizamos el nombre correcto del HTML
    toolForm["nombre"].value = tool.nombre;
    toolForm["funcion"].value = tool.funcion;

    estado = true;
    idEditando = id;

    // Usamos querySelector para buscar el botón de guardar sin depender del 'name'
    const btnGuardar = toolForm.querySelector('.btn-guardar');
    if (btnGuardar) btnGuardar.innerText = "Modificar";
  }
});

// 3. MANEJO DEL FORMULARIO
toolForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = toolForm["nombre"].value;
  const funcion = toolForm["funcion"].value;

  if (!estado) {
    await saveTool(nombre, funcion);
  } else {
    await updateTool(idEditando, { nombre, funcion });
    
    estado = false;
    idEditando = "";
    
    const btnGuardar = toolForm.querySelector('.btn-guardar');
    if (btnGuardar) btnGuardar.innerText = "Guardar";
  }

  toolForm.reset();
});
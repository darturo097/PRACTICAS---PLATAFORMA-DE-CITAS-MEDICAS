async function cargarComponente(ruta, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  const respuesta = await fetch(ruta);
  const texto = await respuesta.text();

  const temp = document.createElement("div");
  temp.innerHTML = texto;

  const template = temp.querySelector("template");
  const contenido = template.content.cloneNode(true);

  contenedor.appendChild(contenido);
}

// Cargar componente al iniciar
document.addEventListener("DOMContentLoaded", () => {
  cargarComponente("../componente/sidebar/sidebar.html", "sidebar");
});
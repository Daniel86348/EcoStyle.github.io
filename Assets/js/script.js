// Selecciona contenedores según cada página
const contenedorDestacados = document.getElementById("destacados-container");
const contenedorNormales = document.getElementById("no-destacados-container");
const contenedorProductos = document.getElementById("productos-container")
// Render genérico
function renderProductos(lista, contenedor) {
    contenedor.innerHTML = "";

    lista.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("col-sm-6", "col-lg-3", "mb-4");

        div.innerHTML = `
            <div class="card">
                <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${prod.nombre}</h5>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="card-text fw-bold">$${prod.precio}</p>
                        <a href="#" class="btn btn-success"><i class="bi bi-cart-plus"></i></a>
                    </div>
                    
                </div>
            </div>
        `;

        contenedor.appendChild(div);
    });
}

// Detectar ruta correcta
const ruta = window.location.pathname.includes("Pages")
    ? "../Assets/js/productos.json"
    : "Assets/js/productos.json";

// Fetch del JSON
fetch(ruta)
    .then(res => res.json())
    .then(productos => {

        // Filtrar destacados
        const destacados = productos.filter(p => p.destacado === true);

        // Filtrar NO destacados
        const noDestacados = productos.filter(p => p.destacado === false);

        // Todos los productos
        const todos = productos;

        // Render según contenedor disponible
        if (contenedorDestacados) {
            renderProductos(destacados, contenedorDestacados);
        }

        if (contenedorNormales) {
            renderProductos(noDestacados, contenedorNormales);
        }

        if (contenedorProductos) {
            renderProductos(todos, contenedorProductos);
        }
    })
    .catch(err => console.error("Error al cargar JSON:", err));

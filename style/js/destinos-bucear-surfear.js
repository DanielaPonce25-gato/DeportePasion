let destinos = []; // Se llenará con fetch

const botonesDiv = document.getElementById("botones");
const contenidoDiv = document.getElementById("contenido");
const btnInicio = document.getElementById("btnInicio");

// Carga de JSON
async function cargarDestinos() {
    try {
        const res = await fetch("/style/data/destinos.json");
        if (!res.ok) throw new Error("Error al cargar el archivo JSON");//si la promesa se cumple, corera el programa
        destinos = await res.json(); //respuesta (res) a formato json    // si no, mostrara mensaje "Error al cargar el archivo JSON"
    } catch (error) {
        
        Swal.fire({
            title: "Alerta, Error de la app ",
            text:  "Lo sentimos por el incomeniente, estaremos trabajando para solucionarlo",
            icon: "warning", // icono
            showCancelButton: true, // nos permite crear un boton de cancelación 
            cancelButtonText: "Canselar" // nos permite crear un boton de cancelación
        });

        console.error("Error capturado:", error);
    }
}


//
//al escribir return new Promese: ya le estamos avisando a javascrip de que vamos a estar 
//                                en precensia de una promesa.


function obtenerDestinosPorCategoria(categoria) {  // Categoria su parametro. Verifica si existe
    return new Promise((resolve, reject) => {
        //busca la categoria selecionada , verifica y devuelve el resultado
        const resultado = destinos.filter(destino => destino.categoria === categoria); 

        setTimeout(() => {         // mostrar destinos segun por su categoría
            if (resultado.length > 0) {

                resolve(resultado);  //si la promesa se resuelve visualiza el resultado
            } else {
                reject("No se accede a los datos de nuestro array");
            }
        }, 1000); // retrasa la promesa 1 segundo
    });
}




// Mostrar los destinos sugun por su categoría


async function mostrarDestinosPorCategoria(categoria) {  // envocamos la promesa 
    contenidoDiv.innerHTML = '<p style="font-size: 30px;">Cargando destinos...</p>';

    try {

        // si se cumple, muestra la categoria selecionada
        const filtrados = await obtenerDestinosPorCategoria(categoria);
        contenidoDiv.innerHTML = "";

        filtrados.forEach(destino => {  // Proceso de visualización  

            const div = document.createElement("div");  // Genera un container donde va a estar alojado los destinos
            div.className = "destino";

            const titulo = document.createElement("h2");
            titulo.textContent = destino.nombre;

            const img = document.createElement("img");
            img.src = destino.imagen;
            img.alt = destino.nombre;

            const descripcion = document.createElement("p");
            descripcion.textContent = destino.descripcion;

            div.appendChild(titulo);
            div.appendChild(img);
            div.appendChild(descripcion);

            contenidoDiv.appendChild(div);
        });

    } catch (error) {  // Captura el error
        contenidoDiv.innerHTML = `<p style="color:red;">Ocurrió un error al cargar destinos: ${error}</p>`;
        Swal.fire({
            title: "Alerta, Error de la app",
            text: "Lo sentimos por el inconveniente, estaremos trabajando para solucionarlo",
            icon: "warning",  // icono
            showCancelButton: true, // nos permite crear un boton de cancelación 
            cancelButtonText: "Canselar" // nos permite crear un boton de cancelación
        });
        console.error("Error capturado:", error);

    } finally { // Condición que se hace por que si. Condicion que es un hecho 
        setTimeout(() => {
            mostrarOpcionesVisualizacion();
        }, 10000); // Retrasa un 1 segundo , y muestra los botones si quieres seguir viendo
    }
}


// Muestra los botones de seguir o volver

function mostrarOpcionesVisualizacion() {

    const mensajeDiv = document.createElement("div");

    const texto = document.createElement("p");
    texto.textContent = "¿Quieres seguir mirando o volver al inicio?";

    const btnSeguir = document.createElement("button"); // Crea el boton seguir
    btnSeguir.textContent = "Seguir"; 
    btnSeguir.onclick = () => {  // Si haces click , el mensaje se va y sigues visualisando destinos
        mensajeDiv.remove();
    };

    const btnVolver = document.createElement("button"); // Crea el boton Volver
    btnVolver.textContent = "Volver al inicio";
    btnVolver.onclick = () => { // Si haces click , te yeba al inicio. 
        reiniciarAplicacion();
    };

    mensajeDiv.appendChild(texto);
    mensajeDiv.appendChild(btnSeguir);
    mensajeDiv.appendChild(btnVolver);

    contenidoDiv.appendChild(mensajeDiv);
}



// Vuelve al estado inicial

function reiniciarAplicacion() {
    botonesDiv.innerHTML = "";
    contenidoDiv.innerHTML = "";

    const nuevoInicio = document.createElement("button");
    nuevoInicio.id = "btnInicio";
    nuevoInicio.textContent = "Inicio";
    nuevoInicio.addEventListener("click", iniciarApp);
    botonesDiv.appendChild(nuevoInicio);
}


// Inicia la app

function iniciarApp() {
    const btnInicio = document.getElementById("btnInicio");
    btnInicio.remove();

    const btnBuceo = document.createElement("button");
    btnBuceo.textContent = "Destinos de Buceo";
    btnBuceo.addEventListener("click", () => mostrarDestinosPorCategoria("buceo"));

    const btnSurf = document.createElement("button");
    btnSurf.textContent = "Destinos para Surfear";
    btnSurf.addEventListener("click", () => mostrarDestinosPorCategoria("surf"));

    botonesDiv.appendChild(btnBuceo);
    botonesDiv.appendChild(btnSurf);
}


// Donde empieza todo .....
btnInicio.addEventListener("click", iniciarApp);


//carga el JSON antes de iniciar
cargarDestinos();

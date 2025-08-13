    let descuento = 0.1;
    let totalGeneral = 0;
    let productosSeleccionados = [];

  
    //Barra de busqueda
    const input = document.querySelector("#buscarProducto");
    const buscarBtn = document.querySelector("#buscar");
    const addBtn = document.querySelector("#add");
    const resultadosUl = document.querySelector("#busqueda");
    const listaUl = document.querySelector("#lista");
    const error = document.querySelector(".bg-danger");


    /* El método getElementById() es una función del objeto document que nos permite 
      obtener una referencia a un elemento HTML específico en el DOM mediante su atributo id.
      
      Este método devuelve una referencia al nodo del DOM, lo que nos permite 
      acceder y modificar sus propiedades.*/

    let resultadoElement = document.getElementById("resultado"); // visializa los productos generados en el html 
    let listaProductos = document.getElementById("lista-productos"); // visualiza los productos que seleciono el usuarrio en el carrito en el html
    let carritoVisible = false;  

   // Cargar productos desde localStorage 
    let productosGuardados = localStorage.getItem("productos");

    let productos = productosGuardados
    ? JSON.parse(productosGuardados)
    :[   //Array de productos generados 
      { nombre: "Pantalon Nike Negro", precio: 10000.99, imagen: "pantalon-nike-negro.jpg", stock: 7 },
      { nombre: "Zapatilla Azul", precio: 50000.45, imagen: "adidas-zapazul.jpg", stock: 6 },
      { nombre: "Pantalon corto Negro", precio: 5000.33, imagen: "pantalon-cortonegro.jpg", stock: 9  },
      { nombre: "Termo Azul", precio: 3000.45, imagen: "termo-azul.jpg", stock: 6},
      { nombre: "Termo Negro", precio: 3000.45, imagen: "termo-negro.jpg", stock: 7},
      { nombre: "Pantalon Nike Azul", precio: 12000, imagen: "pantalon-nike-azul.jpg", stock: 5  },
      { nombre: "Pantalon Nike Gris", precio: 14000, imagen: "pantalon-nike-gris.jpg", stock: 5 },
      { nombre: "Pantalon corto Gris", precio: 8000, imagen: "pantalon-corto-gris.jpg", stock: 4 },
      { nombre: "Zapatilla de correr Negra", precio: 43000, imagen: "zapatillas-correr-negra.jpg", stock: 8 },
      { nombre: "Zapatilla de correr celeste", precio: 52000, imagen: "zapatillas-correr-celeste.jpg", stock: 5  },
      { nombre: "Tabla de Surf Celeste ", precio: 319900, imagen: "tabla-surf-celeste.jpg", stock: 12  },
      { nombre: "Tabla de Surf con diceño", precio: 869000.30, imagen: "tabla-surf-dibujo.jpg" ,stock: 7 },
      { nombre: "Tabla de Surf Marron Claro", precio: 489000.20, imagen: "tabla-surf-marron-clarito.jpg",stock: 9 },
      { nombre: "Neopreno de Verano Azul", precio:415000.10, imagen: "neopreno-verano-azul.jpg" ,stock: 7},
      { nombre: "Neopreno de Verano Negro", precio: 243200.10, imagen: "neopreno-verano-negro.jpg",stock: 11 }, 
      { nombre: "Neopreno Seco Gris", precio: 634828.80, imagen: "neopreno-seco-gris.png", stock: 8 },
      { nombre: "Neopreno Seco Negras", precio: 396642.10, imagen: "neopreno-seco-negro.png", stock: 6 },
      { nombre: "Botas Nauticas Negras", precio: 7999.2, imagen: "botas-neopreno-negras.png", stock:  7 },
      { nombre: "Botas Nauticas Gris ", precio: 97123, imagen: "botas-neopreno-gris.png", stock:  5 },
      { nombre: "Botas Nauticas Gris Azulado", precio: 12020.0, imagen: "botas-neopreno-gris-asulada.png" ,stock: 10 },
      { nombre: "Mascara + Tubo Celeste", precio: 4679.96, imagen: "mascara+tubo-celeste.png",stock: 7},
      { nombre: "Mascara + Tubo Roja", precio: 2810.90, imagen: "mascara+tubo-roja.png" ,stock: 4},
      { nombre: "Mascara + Tubo Negra", precio: 4249.10, imagen: "mascara+tubo-negra.png",stock:  8},
      { nombre: "Cuchillo tobiyera Amariyo", precio: 1700.70, imagen: "cuchillo-tobillera-amarillo.png" ,stock: 6 },
      { nombre: "Cuchillo tobiyera Negro", precio: 1209.57, imagen: "cuchillo-tovillera-negro.png",stock: 9},
      { nombre: "Regulador Principal", precio: 677720.90, imagen: "regulador-principal.png" ,stock: 12},
      { nombre: "Regulador de Emergencia", precio: 878999.90, imagen: "regulador-seguridad.png",stock:  11},
      { nombre: "Manometro", precio: 170000.90, imagen: "manometro.png" ,stock: 9 }
    ];


// Guardar array en localStorage si es la primera vez
if (!productosGuardados) {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function guardarProductosEnLocalStorage() {  //Guarda el contenido del array productos en el localStorage del navegador.
  localStorage.setItem("productos", JSON.stringify(productos));
}
  

function resetearStock() {
  localStorage.removeItem("productos");
  location.reload(); // Recarga la página y se volverán a cargar los valores por defecto
}


// Barra de busqueda


const mostrarError = (mostrar) => {
  if (mostrar) {
    error.classList.remove("d-none"); // si mostrar es verdadero muestra el mensaje
  } else {
    error.classList.add("d-none"); // si mostrar es falso , oculta el mensaje
  }
};



const handleAdd = () => {
  if (!input.value.trim()) {  // Verifica si input está vacío o contiene solo espacios.
    error.classList.remove("d-none"); // si el input está vacío , muestra  el mensaje oculto 
    return;
  }



  const li = document.createElement("li"); // si el usuario escribio, crea un li (iten)
  const span = document.createElement("span"); // crea un espacio , donde va alvergar li
  span.textContent = input.value;
  li.appendChild(span);

  const borrar = document.createElement("img");
  borrar.src = "./img/elimina.png"
  borrar.alt = "Eliminar tarea";
  borrar.onclick = () => li.remove();
  li.appendChild(borrar);  // Agrega la imagen 

  listaUl.appendChild(li); 
  input.value = "";
};


    

// Buscar producto 

const buscarProducto = () => {
  resultadosUl.innerHTML = ""; // borra lo navegado por el usuario
  const texto = input.value.trim().toLowerCase();

  if (!texto) {  //si el usuario no escribió nada, muestra el mensaje oculto
    mostrarError(true);
    return;
  }

  mostrarError(false);  // si escribio el usuario, oculta mensaje

  const encontrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) // a lo buscado verifica si coencide con los objetos del array (productos)
  );

  if (encontrados.length === 0) { // si no coenside
    const li = document.createElement("li");  // el li creado , mostrara el mensaje "no se encontro producto"
    li.textContent = "No se encontró ningún producto.";
    resultadosUl.appendChild(li);
    return;
  }

  
  encontrados.forEach(p => {  // si lo buscado coenside 
    const li = document.createElement("li"); // con el li creado
      li.textContent = `${p.nombre} |Precio: $${p.precio.toFixed(2)} | Stock: ${p.stock}`; // muestra
    resultadosUl.appendChild(li);
  });
};


const handleReset = () => error.classList.add("d-none"); // cada vez que el usuario escribe algo, el mensaje de error se oculta automáticamente.



buscarBtn.addEventListener("click", buscarProducto);
addBtn.addEventListener("click", handleAdd);
input.addEventListener("keydown", handleReset);

    
//seguridad de acceso de stock

const codigoEmpleado = "1234"; // código de acceso

function accederComoEmpleado() {
  const intento = prompt("🔐 Ingrese el código de acceso de empleado:");

  if (intento === codigoEmpleado) {

    Swal.fire({
      title: "Acceso concedido.",
      icon: "éxito", // icono
      showCancelButton: true, // nos permite crear un boton de cancelación      
    });

    document.getElementById("panel-stock").style.display = "block"; 

  } else {

    Swal.fire({
      title: "Acceso Denegado",
      text:  "Código incorrecto.",
      icon: "advertencia", // icono
      showCancelButton: true, // nos permite crear un boton de cancelación 
    });
  }
}



//Gestion de Stock

function mostrarStockTotal() {
  const total = productos.reduce((acc, p) => {   //recorre el array productos, y va acumulando (acc) el stock de cada producto (p). 
    const stock = isNaN(p.stock) ? 0 : p.stock;  // Verifica si stock es NaN, y en ese caso le asigna 0
    return acc + stock;
  }, 0);
  

  Swal.fire({
    title: `Stock total disponible: ${total} unidades`,
    showCancelButton: true, // nos permite crear un boton de cancelación 
  });

}

function listarStockPorProducto() {
  let mensaje = "Stock por producto:\n\n";
  productos.forEach(p => {
    mensaje += `${p.nombre}: ${p.stock} unidades\n`;
  });
  alert(mensaje);
}

function buscarProductoPorNombre() {
  const nombre = prompt("Ingrese el nombre del producto a buscar:").toLowerCase();   
  const resultados = productos.filter(p => p.nombre.toLowerCase().includes(nombre));

  // toLowerCase Convierte el texto a minúsculas para que la búsqueda no sea sensible a mayúsculas/minúsculas.

  // includes se utiliza para verificar si un texto (string) o un elemento de un array contiene cierto valor.
  
  if (resultados.length === 0) {


    Swal.fire({
      title: " No se encontró ningún producto con ese nombre.",
      showCancelButton: true, // nos permite crear un boton de cancelación 
    });

    return;
  }

  let mensaje = "Productos encontrados:\n\n";
  resultados.forEach(p => {                       // forEach() para iterar sobre los elementos de un array
    mensaje += `${p.nombre} | Precio: $${p.precio.toFixed(2)} | Stock: ${p.stock}\n`;
  });

  alert(mensaje);
}

function mostrarProductosAgotados() {
  const agotados = productos.filter(p => p.stock <= 0); // verifica la cantidad de stock si ay 0
  if (agotados.length === 0) {

    Swal.fire({
      title: " No hay productos agotados.",
      showCancelButton: true, // nos permite crear un boton de cancelación 
    });

    return;
  }

  let mensaje = "Productos sin stock:\n\n";
  agotados.forEach(p => mensaje += `${p.nombre}\n`);
  alert(mensaje);
}

function mostrarStockBajo() {
  const limite = 4;
  const bajos = productos.filter(p => p.stock > 0 && p.stock <= limite);

  if (bajos.length === 0) {

    Swal.fire({
      title: "Todos los productos tienen stock suficiente.",
      showCancelButton: true, // nos permite crear un boton de cancelación 
    });
    
    return;
  }

  let mensaje = "Productos con stock bajo (≤ 4):\n\n";
  bajos.forEach(p => mensaje += ` ${p.nombre}: ${p.stock} unidades\n`);
  alert(mensaje);
}


    function mostrarProductos() { //Funcion de mostrar producto selecionado y el boton agregar al carrito
      let productosHTML = "";
      productos.forEach((producto, index) => {  // forEach() para iterar sobre los elementos de un array  
      /* toFixed se utiliza para redondear un número a una cantidad */
      productosHTML += `
      <div class="producto">
        <h2>${producto.nombre}</h2>
        <p>Precio: $${producto.precio.toFixed(2)}</p> 
        <img src="./style/imagen/productos/${producto.imagen}" alt="${producto.nombre}" width="100">
        <br>
        <button onclick="agregarCarrito(${index})" ${producto.stock <= 0 ? 'disabled' : ''}>
          ${producto.stock <= 0 ? 'Sin stock' : 'Agregar al carrito'}
        </button>
      </div>
      `;
      });
      resultadoElement.innerHTML = productosHTML;  // La innerHTML , propiedad  que establece o devuelve el contenido HTML (HTML interno) de un elemento.
    } 

    function agregarCarrito(index) {  //Función de hacer la suma de los productos selecionados e incorporar el descuento
      let producto = productos[index];

      if (producto.stock <= 0) {
        alert(`No hay stock disponible para: ${producto.nombre}`);
        return;
      }

      
      producto.stock--;  // Descunta una unidad de stock
      
      guardarProductosEnLocalStorage();

      let precioConDescuento = producto.precio * (1 - descuento);
      totalGeneral += precioConDescuento;

      productosSeleccionados.push({ // agregar producto al carrito . push = agregar
        nombre: producto.nombre,
        precio: precioConDescuento
      });
      alert(`Producto agregado: ${producto.nombre}`); // aviso de que producto agregado
      actualizarCarrito();
      document.getElementById("contador-carrito").textContent = productosSeleccionados.length; // cueta producto  // longitud exacta

      mostrarProductos(); //Muestra el stock disponible
    }

    function actualizarCarrito() { // propósito actualizar visualmente el contenido del carrito de compras en la página 


      listaProductos.innerHTML = ""; //Carrito vacio

      productosSeleccionados.forEach(produc => { //forEach recorre Array y ejecuta la función

        const item = document.createElement("li");//Genera un nuevo item a la lista de carriro. // createElement () crea un elemento HTML
        item.innerHTML = `<span>${produc.nombre} - $${produc.precio.toFixed(2)}</span>`;


        listaProductos.appendChild(item); //Lo agrega al contenedor de la lista del carrito. // appendchild para adjuntar elementos a un elemento padre

      });
      document.getElementById("total").textContent = `Total: $${totalGeneral.toFixed(2)}`; // textContent  acceder y modificar el contenido a texto puro del elemento HTML
    }

    function cancelar() {

      Swal.fire({
        title: "Compra cancelada",
        showCancelButton: true, // nos permite crear un boton de cancelación 
      });

      // Restaurar stock
      productosSeleccionados.forEach(seleccionado => {  //forEach recorre Array y ejecuta la función
      let producto = productos.find(p => p.nombre === seleccionado.nombre);
      if (producto) {
        producto.stock++;
      }
      });


      guardarProductosEnLocalStorage();

      productosSeleccionados = [];
      totalGeneral = 0;
      actualizarCarrito();
      document.getElementById("carrito-lista").style.display = "none" ;
      document.getElementById("contador-carrito").textContent = "0";
      carritoVisible = false; // se cierra el carrito

      mostrarProductos(); // Actualiza stock 
    }

    function compra() {
      
      productosSeleccionados = [];
      actualizarCarrito();
      document.getElementById("carrito-lista").style.display = "none";
      document.getElementById("contador-carrito").textContent = "0";

      let metodoPago = prompt("Seleccione el método de pago:\n1 - Transferencia Bancaria\n2 - Tarjeta de Crédito");

      switch (metodoPago) {
        case "1":
          sessionStorage.setItem("metodoPago", "transferencia");
          alert(`Has elegido pagar por transferencia bancaria.\n\nTotal: $${totalGeneral.toFixed(2)}\nCBU: 1234567890123456789012\nAlias: tienda.deportiva.ocean`);
          finalizarCompra();
        break;

        case "2":
          sessionStorage.setItem("metodoPago", "tarjeta");
          document.getElementById("formulario-tarjeta").style.display = "block";

          // Muestra el total a pagar
          document.getElementById("total-tarjeta").textContent = `Total: $${totalGeneral.toFixed(2)}`;
        break;

        default:

          Swal.fire({
            title: "Opción no válida. Se cancela la compra.",
            icon: "error", // icono
            showCancelButton: true, // nos permite crear un boton de cancelación 
          });

        return;
      }
      
    }

    function procesarPagoTarjeta() {
      const numero = document.getElementById("numero-tarjeta").value.trim();
      const nombre = document.getElementById("nombre-tarjeta").value.trim();
      const vencimiento = document.getElementById("vencimiento-tarjeta").value;
      const cvv = document.getElementById("cvv-tarjeta").value.trim();

      if (!numero || !nombre || !vencimiento || !cvv) {
        alert("Por favor, complete todos los campos.");
        return;
      }

      if (numero.length !== 16 || isNaN(numero)) {
        alert("Número de tarjeta inválido.");
        return;
      }

      if (cvv.length !== 3 || isNaN(cvv)) {
        alert("CVV inválido.");
        return;
      }

      sessionStorage.setItem("tarjeta", JSON.stringify({
        numero,
        nombre,
        vencimiento,
        cvv
      }));


      Swal.fire({
        title: "Pago con tarjeta procesado correctamente.",
        text:  "Compra finalizada con éxito",
        icon: "éxito", // icono
        showCancelButton: true, // nos permite crear un boton de cancelación 
      });

      finalizarCompra();
    }

    function finalizarCompra() {
      productosSeleccionados = [];
      totalGeneral = 0;
      actualizarCarrito();
      document.getElementById("carrito-lista").style.display = "none";
      document.getElementById("contador-carrito").textContent = "0";
      carritoVisible = false; // se cierra el carrito
      document.getElementById("formulario-tarjeta").style.display = "none";
      
      const metodo = sessionStorage.getItem("metodoPago");

      alert(`Compra finalizada con éxito usando ${metodo === "tarjeta" ? "tarjeta de crédito" : "transferencia bancaria"}.`);

      // 🧹 Limpiar toda la sessionStorage
      sessionStorage.clear();

      guardarProductosEnLocalStorage();

      mostrarProductos();

      
    }



    let operacion = (op) => { // respuesta
      switch (op) {
        case 1:
          compra();
          break;
        case 2:
          cancelar();
          break;
        default:

          Swal.fire({
            title: "Por favor, ingrese solo estas opciones:  1.COMPRAR o 2.CALCELAR",
            showCancelButton: true, // nos permite crear un boton de cancelación 
          });

          principal(); 
      }
    };

    function llamarAction() { 
      let pregunta = prompt(`¿Desea realizar la compra?\n\n1 - COMPRAR\n2 - CANCELAR`); // Aviso pregunta de confirmación
      operacion(Number(pregunta)); // Respuesta usuario
    }

    function principal() {
      llamarAction();
      console.log("Proceso en la compra");
    }

    document.getElementById("abrir-carrito").addEventListener("click", () => { //Fución de abrir el carrito o cerrar carrito
      carritoVisible = !carritoVisible;
      document.getElementById("carrito-lista").style.display = carritoVisible ? "block" : "none"; //si es true block mostra. si es false none ocultalo
    });

    document.getElementById("btn-operacion").addEventListener("click", () => { //Función de acción del boton de compra
      principal(); //declaración a la función 
    });

mostrarProductos();  // Donde comiensa la acción. inovamos la función mostrarProductos

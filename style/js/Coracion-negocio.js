    let descuento = 0.3;
    let totalGeneral = 0;
    let productosSeleccionados = [];

    let resultadoElement = document.getElementById("resultado"); // visializa los productos generados en el html 
    let listaProductos = document.getElementById("lista-productos"); // visualiza los productos que seleciono el usuarrio en el carrito en el html
    let carritoVisible = false;  

    let productos = [   //Array de productos generados 
      { nombre: "Producto 1", precio: 10.99, imagen: "pantalon-nike-negro.jpg" },
      { nombre: "Producto 2", precio: 5.99, imagen: "imagen3.jpg" },
      { nombre: "Producto 3", precio: 15.49, imagen: "imagen3.jpg" },
      { nombre: "Producto 2", precio: 5.99, imagen: "imagen3.jpg" },
      { nombre: "Producto 3", precio: 15.49, imagen: "imagen3.jpg" },
      { nombre: "Producto 2", precio: 5.99, imagen: "imagen3.jpg" },
      { nombre: "Producto 3", precio: 15.49, imagen: "imagen3.jpg" },
      { nombre: "Producto 2", precio: 5.99, imagen: "imagen3.jpg" },
      { nombre: "Producto 3", precio: 15.49, imagen: "imagen3.jpg" },
      { nombre: "Producto 2", precio: 5.99, imagen: "imagen3.jpg" },
      { nombre: "Producto 3", precio: 15.49, imagen: "imagen3.jpg" },
      { nombre: "Producto 2", precio: 5.99, imagen: "imagen3.jpg" },
      { nombre: "Producto 3", precio: 15.49, imagen: "imagen3.jpg" },
      { nombre: "Producto 2", precio: 5.99, imagen: "imagen3.jpg" },
      { nombre: "Producto 3", precio: 15.49, imagen: "imagen3.jpg" }
    ];

    function mostrarProductos() { //Funcion de mostrar producto selecionado y el boton agregar al carrito
      let productosHTML = "";
      productos.forEach((producto, index) => {
      productosHTML += `
      <div class="producto">
        <h2>${producto.nombre}</h2>
        <p>Precio: $${producto.precio.toFixed(2)}</p>
        <img src="./style/imagen/productos/${producto.imagen}" alt="${producto.nombre}" width="100">
        <br>
        <button onclick="agregarCarrito(${index})">Agregar al carrito</button>
      </div>
      `;
      });
      resultadoElement.innerHTML = productosHTML;
    } 

    function agregarCarrito(index) {  //Función de hacer la suma de los productos selecionados e incorporar el descuento
      let producto = productos[index];
      let precioConDescuento = producto.precio * (1 - descuento);
      totalGeneral += precioConDescuento;
      productosSeleccionados.push({ // agregar producto al carrito . push = agregar
        nombre: producto.nombre,
        precio: precioConDescuento
      });
      alert(`Producto agregado: ${producto.nombre}`); // aviso de que producto agregado
      actualizarCarrito();
      document.getElementById("contador-carrito").textContent = productosSeleccionados.length; // cueta producto
    }

    function actualizarCarrito() { // propósito actualizar visualmente el contenido del carrito de compras en la página 


      listaProductos.innerHTML = ""; //Carrito vacio

      productosSeleccionados.forEach(produc => { //forEach recorre Array y ejecuta la función

        const item = document.createElement("li"); //Genera un nuevo item a la lista de carriro. 
        item.textContent = `${produc.nombre} - $${produc.precio}`; 

        listaProductos.appendChild(item); //Lo agrega al contenedor de la lista del carrito.
      });
      document.getElementById("total").textContent = `Total: $${totalGeneral}`;
    }

    function cancelar() {
      alert("Compra cancelada");
      productosSeleccionados = [];
      totalGeneral = 0;
      actualizarCarrito();
      document.getElementById("carrito-lista").style.display = "none";
      document.getElementById("contador-carrito").textContent = "0";
      carritoVisible = false; // se cierra el carrito
    }

    function compra() {
      alert("¡Compra realizada con éxito!");
      productosSeleccionados = [];
      totalGeneral = 0;
      actualizarCarrito();
      document.getElementById("carrito-lista").style.display = "none";
      document.getElementById("contador-carrito").textContent = "0";
      carritoVisible = false; // se cierra el carrito
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
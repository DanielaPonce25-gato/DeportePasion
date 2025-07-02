    let descuento = 0.1;
    let totalGeneral = 0;
    let productosSeleccionados = [];

    /* El método getElementById() es una función del objeto document que nos permite 
      obtener una referencia a un elemento HTML específico en el DOM mediante su atributo id.
      
      Este método devuelve una referencia al nodo del DOM, lo que nos permite 
      acceder y modificar sus propiedades.*/

    let resultadoElement = document.getElementById("resultado"); // visializa los productos generados en el html 
    let listaProductos = document.getElementById("lista-productos"); // visualiza los productos que seleciono el usuarrio en el carrito en el html
    let carritoVisible = false;  

    let productos = [   //Array de productos generados 
      { nombre: "Pantalon Nike Negro", precio: 10000.99, imagen: "pantalon-nike-negro.jpg" },
      { nombre: "Zapatilla Azul", precio: 50000.45, imagen: "adidas-zapazul.jpg" },
      { nombre: "Patalon corto Negro", precio: 5000.33, imagen: "pantalon-cortonegro.jpg" },
      { nombre: "Termo Azul", precio: 3000.50, imagen: "termo-azul.jpg"},
      { nombre: "Termo Azul", precio: 3000.50, imagen: "termo-negro.jpg"},
      { nombre: "Pantalon Nike Azul", precio: 12000.40, imagen: "pantalon-nike-azul.jpg" },
      { nombre: "Pantalon Nike Gris", precio: 14000.25, imagen: "pantalon-nike-gris.jpg" },
      { nombre: "Patalon corto Gris", precio: 8000.17, imagen: "pantalon-corto-gris.jpg" },
      { nombre: "Zapatilla de correr Negra", precio: 43000.30, imagen: "zapatillas-correr-negra.jpg" },
      { nombre: "Zapatilla de correr celeste", precio: 52000.30, imagen: "zapatillas-correr-celeste.jpg" },
      { nombre: "Producto 3", precio: 15.49, imagen: "imagen3.jpg" },
      { nombre: "Producto 2", precio: 5.99, imagen: "imagen3.jpg" },
      { nombre: "Producto 3", precio: 15.49, imagen: "imagen3.jpg" },
      { nombre: "Producto 2", precio: 5.99, imagen: "imagen3.jpg" },
      { nombre: "Producto 3", precio: 15.49, imagen: "imagen3.jpg" }
    ];

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
        <button onclick="agregarCarrito(${index})">Agregar al carrito</button>
      </div>
      `;
      });
      resultadoElement.innerHTML = productosHTML;  // La innerHTML , propiedad  que establece o devuelve el contenido HTML (HTML interno) de un elemento.
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
      document.getElementById("contador-carrito").textContent = productosSeleccionados.length; // cueta producto  // longitud exacta
    }

    function actualizarCarrito() { // propósito actualizar visualmente el contenido del carrito de compras en la página 


      listaProductos.innerHTML = ""; //Carrito vacio

      productosSeleccionados.forEach(produc => { //forEach recorre Array y ejecuta la función

        const item = document.createElement("li");//Genera un nuevo item a la lista de carriro. // createElement () crea un elemento HTML
        item.innerHTML = `<span>${produc.nombre} - $${produc.precio.toFixed(2)}</span>`;


        listaProductos.appendChild(item); //Lo agrega al contenedor de la lista del carrito. // appendchild para adjuntar elementos a un elemento padre

      });
      document.getElementById("total").textContent = `Total: $${totalGeneral}`; // textContent  acceder y modificar el contenido a texto puro del elemento HTML
    }

    function cancelar() {
      alert("Compra cancelada");
      productosSeleccionados = [];
      totalGeneral = 0;
      actualizarCarrito();
      document.getElementById("carrito-lista").style.display = "none" ;
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




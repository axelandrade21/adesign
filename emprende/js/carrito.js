let carritoCompras = document.getElementById("carrito");
let canasta = JSON.parse(localStorage.getItem("datos")) || [];
let total = document.getElementById("totalproductos");
let label = document.getElementById("label");


let llenarCarrito = ()=>{
	if (canasta.length !== 0) {
    return (carritoCompras.innerHTML = canasta
      .map((x) => {
        let { id, item } = x;
        
        let buscar = shopItemsData.find((y) => y.id === id) || [];
        
        return `<tr>
                                    <td>${buscar.id}</td>
                                    <td> <img style="width: 50%;" src="${buscar.img}"></td>
                                    <td>${buscar.nombre}</td>
                                    <td>${buscar.precio}</td>
                                    <td>${item}</td>

                                </tr>
      `;
      })
      .join(""));
  } else {
    carritoCompras.innerHTML = ``;
    label.innerHTML = `
    <h2>Carrito vacio</h2>
    <a href="index.html">
      <button class="HomeBtn">Regresar a inicio</button>
    </a>
    `;
  }
}

llenarCarrito();
let realizarCalculo = (id)=>{
	let iconoBolsa = document.getElementById("cantidad");
	iconoBolsa.innerHTML = "<strong>" +canasta.map((x)=>x.item).reduce((x,y)=>x+y,0)+"</strong>";
}

realizarCalculo();
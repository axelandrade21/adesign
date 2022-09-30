let shop = document.getElementById("tienda");

let canasta = JSON.parse(localStorage.getItem("datos")) ||[];

console.log(shop);

// let llenarTienda = ()=>{
// 	return (shop.innerHTML = `<div class="row item">
//                         <div class="col-lg-4 col-md-6 col-sm-6">
//                             <div class="product__item ">
//                                 <div class="product__item__pic set-bg" data-setbg=src=${img} >
                                   
//                                 </div>
//                                 <div class="product__item__text">
//                                     <h6>${nombre}</h6>
//                                     <a href="#" class="add-cart">+ Agregar al carrito</a>
                                   
//                                     <h5>${precio}</h5>
//                                     <a href="" class="btn btn-block btn-primary agregar-carrito" data-id="1">Comprar</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>`);

// }
 //let search = basket.find((x) => x.id === id) || [];


let llenarTienda = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, nombre, precio, img } = x;
      let busqueda = canasta.find((x) => x.id === id) || [];
      return `<div class="row">
                        <div class="col-lg-12 col-md-6 col-sm-6" >
                            <div class="product__item " id="${id} " style="padding: 1rem;">
                                <div class="product__item__pic set-bg" >
                                   <div class="product__item__pic set-bg" >
                                  	 <center><img  src=${img} > </center>
                                </div>
                                </div>
                                <div class="product__item__text">
                                    <h6>${nombre}</h6>
                                    <a  style="color:white;" class="add-cart btn btn-block btn-primary agregar-carrito" onclick="incrementar(${id} )">+ Agregar al carrito</a>
                                   
                                    <h5>${precio}</h5>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
    `;
    })
    .join(""));
};
llenarTienda();

let incrementar = (id) =>{
	let seleccionado = id;
	let buscar = canasta.find((x)=> x.id === seleccionado);
	if(buscar === undefined){
		canasta.push({
			id: seleccionado,
			item: 1

		});
	}else{
		buscar.item +=1;
	}
	localStorage.setItem("datos", JSON.stringify(canasta) );
	realizarCalculo();
	console.log(canasta);
}

let disminuir = (id) =>{
	let seleccionado = id;
	let buscar = canasta.find((x)=> x.id === seleccionado);
	if(buscar.item === 0){
		return;
	}else{
		buscar.item -=1;
	}
	
	console.log(canasta);
}

let actualizar = (id)=>{
	let buscar = canasta.find((x)=> x.id === id);
}

let realizarCalculo = (id)=>{
	let iconoBolsa = document.getElementById("cantidad");
	iconoBolsa.innerHTML = "<strong>" +canasta.map((x)=>x.item).reduce((x,y)=>x+y,0)+"</strong>";
}

realizarCalculo();
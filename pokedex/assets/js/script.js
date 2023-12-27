


//Evento para el botón del menú para visitar la pokédex
document.getElementById('pokedex-completa').addEventListener('click',function(){
	window.location = "pokedex.html";
})



//------------------------------------------------------------------------------
//Para levantar el modal, es necesario jquery para usar la librería
$('.buscar-poke').modaal({
	content_source: '#buscar-poke-container'
});

//------------------------------------------------------------------------------

//Lógica y componentes para realizar la búsqueda un pokémon en específico


//Componentes html
const btnBuscarPokemon = document.getElementById('buscar');
const nombrePokemon = document.getElementById('pokemon-nombre');
const indicadorProgreso = document.getElementById('progreso');

//Se le establece el evento click al botón de búsqueda
btnBuscarPokemon.addEventListener('click', async () => {
  try {
    sound.play();
    indicadorProgreso.innerHTML = 'Recibiendo datos...';

    //Se le pasa el valor del input y se obtienen los datos desde la API
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.value.toLowerCase()}`);
    const data = await response.json();

    //Se cierra el modal de búsqueda
    $('.buscar-poke').modaal('close');

    //Se construye un div con la info del pokémon
	const datosPokemon = `
			        <div id="pokemon-info">
			            <div id="info">
			                <p><strong>Number:</strong> ${data.id}</p>
			                <p><strong>Name:</strong> ${data.name}</p>
			                <p><strong>Type:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
			                <p><strong>Abilities:</strong> ${data.abilities.map(ability => ability.ability.name)}</p>
			            </div>
			            <div id="picture" >
			                <img id="pok-img" class="animate__animated animate__bounce" src="${data.sprites.other['official-artwork'].front_default}">
			            </div>
			        </div>    `;
				            
	//Se utiliza la librería Notie para mostrar la alerta :)
	notie.alert({ type: 2, text:  datosPokemon, time: 8, position: 'center' })
    indicadorProgreso.innerHTML = '';
  } catch (error) {
    console.error(error);
  }
});

//--------------------------------------------------------------------------------

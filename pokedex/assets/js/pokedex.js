//Pókedex

    //Sonido

    var context = new AudioContext();
        var sound = new Howl({
        src: ['assets/optionmenu.mp3']
        });

        

	const botonFiltro = document.querySelector('#boton-filtro');
    const filtroInput = document.querySelector('#filtro-input');
    
    //Evento para filtrar el pokémon que se busca
    botonFiltro.addEventListener('click', () => {
         context.resume().then(() => {
      
            sound.play();
        });
        const filtroNombre= filtroInput.value.toLowerCase(); //obtengo el nombre del pokémon
        const pokemonGaleria = document.querySelectorAll('.gallery-item'); //obtengo todos los
        //pokemones de la galería
        
        //recorro cada uno y comparo el nombre que tienen con el del filtro,
        //si coinciden en algo, se ocultan los demás y solo quedan en la vista
        //los de la búsqueda
        pokemonGaleria.forEach(pokemon => {
            const pokemonNombre = pokemon.querySelector('p').textContent.toLowerCase();
            if (pokemonNombre.includes(filtroNombre)) {
                pokemon.style.display = 'inline;';
            } else {
                pokemon.style.display = 'none';
            }
        });
    });

    //Evento para el input, si se presiona enter, se resetea todo y
    //se vuelven a mostrar los pokemones
    filtroInput.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            filtroInput.value = '';
            const pokemonGaleria = document.querySelectorAll('.gallery-item');
            pokemonGaleria.forEach(pokemon => {
                pokemon.style.display = 'block';
            });

              context.resume().then(() => {
      
            sound.play();
        });

        }
    });

    const pokemonGaleria = document.querySelector('.gallery-container'); //Contenedor principal
    //que va contener todas imágenes y datos de los pokemones
    const loader = document.querySelector('.loader');

    //Se usa Axios para realizar la petición a la API
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=1280')
        .then(response => {
            loader.style.display = 'none'; //Se oculta el mensaje
            const pokemones = response.data.results; //obtengo los datos de todos los 1280 pokemones

            //recorro cada pokemon para crear cada item de la galería
            pokemones.forEach(pokemon => {
                //Creo un item para el pokemon
                const pokemonItem = document.createElement('div');
                pokemonItem.classList.add('gallery-item');

                //Vuelvo a usar Axios para obtener los datos del pokemon desda la URL 
				axios.get(pokemon.url)
				    .then(response => {
				        const pokemonDatos = response.data; //Aquí tengo todos los datos
                        //Obtengo la imagen
				        const pokemonImagen = pokemonDatos.sprites.other['official-artwork'].front_default;

				        // Creo un elemento html de tipo img para agregar la imagen
				        const pokemonImg = document.createElement('img');
				        pokemonImg.src = pokemonImagen;
				        pokemonItem.appendChild(pokemonImg);

				        //Obtengo los datos del id, el nombre y se los paso al item también
				        const pokemonNombre = document.createElement('p');
				        pokemonNombre.textContent = `${pokemonDatos.id} - ${pokemonDatos.name} `.toUpperCase();
				        pokemonItem.appendChild(pokemonNombre);

				        //Agrego un evento de click para mostrar la información del pokémon
				        pokemonItem.addEventListener('click', () => {
				            
                            //Construyo los datos en un div
				            const datosPokemon = `
        				        <div id="pokemon-info">
        				            <div id="info">
        				                <p><strong>Number:</strong> ${pokemonDatos.id}</p>
        				                <p><strong>Name:</strong> ${pokemonDatos.name}</p>
        				                <p><strong>Type:</strong> ${pokemonDatos.types.map(type => type.type.name).join(', ')}</p>
        				            </div>
        				            <div id="picture">
        				                <img class="animate__animated animate__bounce" src="${pokemonDatos.sprites.other['official-artwork'].front_default}">
        				            </div>
        				        </div>    `;
                           context.resume().then(() => {
      
                                sound.play();
                            });
                         //Los muestro con un alert de la librería Notie :)				            				            
				           notie.alert({ type: 2, text:  datosPokemon, time: 5 })
				        });

                      
				    })
				    .catch(error => console.error(error));


                //Agrego cada pokemon a la galería pokedex
                pokemonGaleria.appendChild(pokemonItem);
            });
        })
        .catch(error => console.error(error));
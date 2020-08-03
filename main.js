const searchInput = document.querySelector('#search'),
      searchButton = document.querySelector('#searchButton'),
      resultsDiv = document.querySelector('#results');

const searchPokemon = async (pokemonId) => {
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    addFoundPokemon(data);
};    

searchButton.addEventListener('click', () => {searchPokemon(searchInput.value)});

function addFoundPokemon(pokeData) {
    let htmlText = `
      <div class="pokemonContainer">
        <div>Name: ${pokeData.name}</div>
        <div>Height: ${pokeData.height}</div>
        <div>Weight: ${pokeData.weight}</div>
        <div>Picture: <br><img src="${pokeData.sprites.front_default}"
          onmouseover="src='${pokeData.sprites.back_default}'"
          onmouseout="src='${pokeData.sprites.front_default}'"/></div>
      </div>
    `;
    htmlText = addTypesList(pokeData, htmlText);
    resultsDiv.innerHTML = htmlText;
}

function addTypesList(fullData, dataText) {
  dataText += `<div>Types: <br><ul>`;
  fullData.types.forEach(type => {
    dataText += `<li id='${type.type.name}' onclick="searchTypesPokemon('${type.type.name}')">${type.type.name}</li>`;
  });
  dataText += `</ul></div>`;
  return dataText;
}

const searchTypesPokemon = async (typeName) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/type/${typeName}`);
  const type = document.querySelector(`#${typeName}`);
  if(type.childElementCount === 0) {
    type.appendChild(addTypesPokemons(data));
  }
};    

function addTypesPokemons(typeData, event) {
  let pokeList = document.createElement('ul');
  typeData.pokemon.forEach(pokemon => {
    pokeList.innerHTML += `<li>${pokemon.pokemon.name}</li>`;
  });
  return pokeList;
}
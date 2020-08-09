// getting document elements
const searchInput = document.querySelector('#search'),
      searchButton = document.querySelector('#searchButton'),
      resultsDiv = document.querySelector('#results');

// data for pokemon search
const searchPokemon = async (pokemonId) => {
    try {
      const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      addFoundPokemon(data);
    } catch {
      resultsDiv.innerHTML = "Pokemon not found";
    }
};    

// when clicking on searchButton
searchButton.addEventListener('click', () => {searchPokemon(searchInput.value)});

// when pressing Enter in the input
searchInput.addEventListener('keyup', enterFoundPokemon);

function enterFoundPokemon(event) {
  if(event.keyCode === 13) {
    searchPokemon(searchInput.value);
  }
}

// add pokemon data to page context
function addFoundPokemon(pokeData) {
  let htmlText = `
  <div class="pokemonContainer">
  <div>Name: ${pokeData.name}</div>
  <div>Height: ${pokeData.height}</div>
  <div>Weight: ${pokeData.weight}</div>`;
  if(pokeData.sprites.front_default) { // only if has front photo
    htmlText += `<div>Picture: <br><img alt="${pokeData.name}" src="${pokeData.sprites.front_default}"`;
    if(pokeData.sprites.back_default) { // only if has back photo
      htmlText += ` 
          onmouseover="src='${pokeData.sprites.back_default}'"
          onmouseout="src='${pokeData.sprites.front_default}'"
        `;
    }
    htmlText += `/></div>`;
  }
  htmlText = addTypesList(pokeData, htmlText);
  htmlText = addAbilitiesList(pokeData, htmlText);
  htmlText += `</div>`;
  resultsDiv.innerHTML = htmlText;
}

// add the types to the pokemon data
function addTypesList(fullData, dataText) {
  dataText += `<div>Types: <br><ul>`;
  fullData.types.forEach(type => {
    dataText += `<li id='${type.type.name}' onclick="searchTypesPokemon('${type.type.name}')">${type.type.name}</li>`;
  });
  dataText += `</ul></div>`;
  return dataText;
}

// data for pokemon search per type, append mini list
const searchTypesPokemon = async (typeName) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/type/${typeName}`);
  const type = document.querySelector(`#${typeName}`);
  if(type.childElementCount === 0) {
    type.appendChild(addTypesPokemons(data));
  } else {
      type.removeChild(type.lastChild);
  }
};    

// add pokemon names to type list
function addTypesPokemons(typeData) {
  let pokeList = document.createElement('ul');
  typeData.pokemon.forEach(pokemon => {
    pokeList.innerHTML += `<li id='${pokemon.pokemon.name}' onclick="showTypedPokemon('${pokemon.pokemon.name}')">${pokemon.pokemon.name}</li>`;
  });
  return pokeList;
}

// // data for a new pokemon from type list ------ axios
// const showTypedPokemon = async (pokemonName) => {
//     const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonName}`);
//     searchInput.value = data.id;
//     addFoundPokemon(data);
// };

// data for a new pokemon from type list ------ fetch
const showTypedPokemon = async pokemonName => {
    return await fetch(`http://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(res => res.json())
    .then(data => {
      searchInput.value = data.id;
      addFoundPokemon(data);
    });
};

// add the abilities to the pokemon data
function addAbilitiesList(fullData, dataText) {
  dataText += `<div>Abilities: <br><ul>`;
  fullData.abilities.forEach(ability => {
    dataText += `<li id='${ability.ability.name}' onclick="searchAbilitiesPokemon('${ability.ability.name}')">${ability.ability.name}</li>`;
  });
  dataText += `</ul></div>`;
  return dataText;
}

// data for pokemon search per ability, append mini list
const searchAbilitiesPokemon = async (abilityName) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/ability/${abilityName}`);
  const ability = document.querySelector(`#${abilityName}`);
  if(ability.childElementCount === 0) {
    ability.appendChild(addAbilitiesPokemons(data));
  } else {
      ability.removeChild(ability.lastChild);
  }
};    

// add pokemon names to ability list
function addAbilitiesPokemons(abilityData) {
  let pokeList = document.createElement('ul');
  abilityData.pokemon.forEach(pokemon => {
    pokeList.innerHTML += `<li id='${pokemon.pokemon.name}' onclick="showAbilitiedPokemon('${pokemon.pokemon.name}')">${pokemon.pokemon.name}</li>`;
  });
  return pokeList;
}

// data for a new pokemon from type list
const showAbilitiedPokemon = async (pokemonName) => {
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    searchInput.value = data.id;
    addFoundPokemon(data);
};
const searchInput = document.querySelector('#search'),
      searchButton = document.querySelector('#searchButton'),
      resultsDiv = document.querySelector('#results');

const searchPokemon = async (pokemonId) => {
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    addFoundPokemon(data);
};    

searchButton.addEventListener('click', () => {searchPokemon(searchInput.value)});

function addFoundPokemon(pokeData) {
    const htmlText = `
      <div class="pokemonContainer">
        <div>Name: ${pokeData.name}</div>
        <div>height: ${pokeData.height}</div>
        <div>weight: ${pokeData.weight}</div>
        <div>picture: <img src="${pokeData.sprites.front_default}" /></div>
      </div>
    `;
    resultsDiv.innerHTML = htmlText;
}
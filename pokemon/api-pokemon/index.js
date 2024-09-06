async function getPokemon() {
    // Evitar recarregar a página
    event.preventDefault();
    
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Pokémon não encontrado');
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        document.getElementById('pokemonInfo').innerHTML = `<p>${error.message}</p>`;
    }
}

function displayPokemon(pokemon) {
    const pokemonInfo = document.getElementById('pokemonInfo');
    pokemonInfo.innerHTML = `
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
        <p><strong>Tipo(s):</strong> ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    `;
}


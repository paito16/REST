document.getElementById('characterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const characterNameOrId = document.getElementById('characterName').value;
    fetchCharacter(characterNameOrId);
});

async function fetchCharacter(nameOrId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`);
        if (response.ok) {
            const data = await response.json();
            displayCharacter(data);
        } else {
            document.getElementById('result').innerText = 'Pokemon not found';
        }
    } catch (error) {
        document.getElementById('result').innerText = 'Error fetching pokemon';
    }
}

function displayCharacter(character) {
    if (character) {
        const types = character.types.map(typeInfo => typeInfo.type.name).join(', ');
        document.getElementById('result').innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.sprites.front_default}" alt="${character.name}">
            <p>Type: ${types}</p>
        `;
    } else {
        document.getElementById('result').innerText = 'Pokemon not found';
    }
}

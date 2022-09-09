const pokeForm = document.querySelector(".poke-form");
const pokeList = document.querySelector(".poke-list");

function addPokemon(pokemon) {
  const liEl = document.createElement("li");
  const imgEl = document.createElement("img");
  const h2El = document.createElement("h2");

  liEl.classList.add("pokemon");
  imgEl.src = pokemon.image;

  h2El.innerText = pokemon.name;

  liEl.append(imgEl, h2El);
  pokeList.append(liEl);
}

function addPokemons(pokemons) {
  pokeList.innerHTML = ''
  pokemons.forEach((pokemon) => addPokemon(pokemon));
}

function listenToAddPokemonForm() {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value,
    };

    // CREATE
    fetch("http://localhost:3000/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon),
    })
      .then((res) => res.json())
      .then((pokemon) => addPokemon(pokemon));
  });

  pokeForm.reset();
}

function init() {
  listenToAddPokemonForm();

  fetchAndRender();
}

function fetchAndRender() {
  fetch("http://localhost:3000/pokemons")
    .then((res) => res.json())
    .then((pokemons) => addPokemons(pokemons));
}

init();

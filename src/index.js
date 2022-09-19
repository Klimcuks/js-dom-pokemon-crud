const pokeForm = document.querySelector(".poke-form");
const pokeList = document.querySelector(".poke-list");
let likeButtonSwitch = false



function addPokemon(pokemon) {
  const liEl = document.createElement("li");
  const imgEl = document.createElement("img");
  const h2El = document.createElement("h2");
  const deleteButton = document.createElement("button");
  const likeButton = document.createElement('img')


  liEl.classList.add("pokemon");
  imgEl.src = pokemon.image;
  h2El.innerText = pokemon.name;
  likeButton.src = "src/img/heart (4).png"
  likeButton.classList.add("pokemon-like");


  deleteButton.innerHTML = 'Remove Pokemon'
  deleteButton.addEventListener('click', () => {
  fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
    method: 'DELETE'
  })
})

likeButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Like Pokemon");
  likeButton.src = getLikeButtonSrc(!likeButtonSwitch);
});


  liEl.append(imgEl, h2El, deleteButton, likeButton);
  pokeList.append(liEl);
}

function getLikeButtonSrc(likeButton) {
  likeButtonSwitch = likeButton
  if (likeButton) {
    return "src/img/heart (3).png";
  }   
  return "src/img/heart (4).png"; 
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
  pokeList.innerHTML = ""

  listenToAddPokemonForm();

  fetchAndRender();
}

function fetchAndRender() {
  fetch("http://localhost:3000/pokemons")
    .then((res) => res.json())
    .then((pokemons) => addPokemons(pokemons));
}

init();

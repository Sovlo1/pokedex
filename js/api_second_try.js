// API related stuff here

let pokemonName = document.getElementById("pokemon__name");
let pokemonType1 = document.getElementById("pokemon__type__1");
let pokemonType2 = document.getElementById("pokemon__type__2");
let pokemonSprite = document.getElementById("pokemon__sprite");
let pokemonSearchInput = document.getElementById("search__bar__input");
let pokemonSearchButton = document.getElementById("search__bar__button");
let pokemonAbout = document.getElementById("pokemon__about");
let img = document.createElement("img");

const clear = function () {
  pokemonName.textContent = "";
  pokemonType1.textContent = "";
  pokemonType2.textContent = "";
  pokemonAbout.textContent = "";
  if (pokemonSprite.hasChildNodes()) {
    pokemonSprite.removeChild(img);
  }
};

const searchPokemon = function () {
  fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonSearchInput.value.toLowerCase()}`
  )
    .then((res) => res.json())
    .then((pkmnInfo) => {
      if (!pkmnInfo.types[1]) {
        pokemonName.textContent = pkmnInfo.name;
        pokemonType1.textContent = pkmnInfo.types[0].type.name;
        pokemonSprite.appendChild(img);
        img.src = pkmnInfo.sprites.front_default;
      } else {
        pokemonName.textContent = pkmnInfo.name;
        pokemonType1.textContent = pkmnInfo.types[0].type.name;
        pokemonType2.textContent = pkmnInfo.types[1].type.name;
        pokemonSprite.appendChild(img);
        img.src = pkmnInfo.sprites.front_default;
      }
    })
    .catch((err) => {
      pokemonAbout.textContent = "This pokemon does not exist";
      pokemonSprite.appendChild(img);
      img.src = "img/missingno.png";
    });
};

pokemonSearchButton.addEventListener("click", function () {
  clear();
  searchPokemon();
});

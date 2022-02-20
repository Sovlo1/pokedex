// API related stuff here

let pokemonName = document.getElementById("pokemon__name");
let pokemonType1 = document.getElementById("pokemon__type__1");
let pokemonType2 = document.getElementById("pokemon__type__2");
let pokemonSprite = document.getElementById("pokemon__sprite");
let pokemonSearchInput = document.getElementById("search__bar__input");
let pokemonSearchButton = document.getElementById("search__bar__button");
let pokemonAbout = document.getElementById("pokemon__about")
let img = document.createElement("img");

const clear = async function () {
  pokemonName.textContent = "";
  pokemonType1.textContent = "";
  pokemonType2.textContent = "";
  pokemonAbout.textContent = "";
  if (pokemonSprite.hasChildNodes()) {
  pokemonSprite.removeChild(img);
  }
};

const pokemonCall = function () {
  fetch("https://pokeapi.co/api/v2/pokemon/?limit=1126")
    .then((res) => res.json())
    .then((pokemonNames) => {
      for (i = 0; i < pokemonNames.results.length; i += 1) {
        if (
          pokemonSearchInput.value.toLowerCase() == pokemonNames.results[i].name
        ) {
          pokemonName.textContent = pokemonNames.results[i].name;
          fetch(pokemonNames.results[i].url)
            .then((pkmnInfo) => pkmnInfo.json())
            .then((pkmnTypes) => {
              if (pkmnTypes.types.length < 2) {
                pokemonType1.textContent = pkmnTypes.types[0].type.name;
              } else if (pkmnTypes.types.length === 2) {
                pokemonType1.textContent = pkmnTypes.types[0].type.name;
                pokemonType2.textContent = pkmnTypes.types[1].type.name;
              }
            });
          fetch(pokemonNames.results[i].url)
            .then((pkmnSprite) => {
              return pkmnSprite.json();
            })
            //.then((test) => console.log(test))
            .then((pokemonImage) => {
              pokemonSprite.appendChild(img);
              img.src = pokemonImage.sprites.front_default;
            });
          break;
        } else if (
          i == pokemonNames.results.length - 1 &&
          pokemonSearchInput.value.toLowerCase() !=
            pokemonNames.results[i - 1].name
        ) {
          pokemonAbout.textContent = "This pokemon does not exist"
          pokemonSprite.appendChild(img);
          img.src = "img/missingno.png";
        }
      }
    });
};

pokemonSearchButton.addEventListener("click", function () {
  clear();
  pokemonCall();
});

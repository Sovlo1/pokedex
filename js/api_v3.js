//Déclarer tous les éléments à remplir/créer
let pokemonName = document.getElementById("pokemon__name");
let pokemonType1 = document.getElementById("pokemon__type__1");
let pokemonType2 = document.getElementById("pokemon__type__2");
let pokemonSprite = document.getElementById("pokemon__sprite");
let pokemonHeight = document.getElementById("pokemon__height");
let pokemonWeight = document.getElementById("pokemon__weight");
let pokemonSearchInput = document.getElementById("search__bar__input");
let pokemonSearchButton = document.getElementById("search__bar__button");
let pokemonAbout = document.getElementById("pokemon__about");
let previousNextPokemon = document.getElementById("previous__next__buttons");
let img = document.createElement("img");
let button = document.createElement("div");

/*Fonction pour effacer chaque élément pour éviter les fausses informations
Par exemple : afficher deux types sur un pokemon n'en ayant qu'un*/
const clear = function () {
  pokemonName.textContent = "";
  pokemonType1.textContent = "";
  pokemonType2.textContent = "";
  pokemonAbout.textContent = "";
  pokemonHeight.textContent = "";
  pokemonWeight.textContent = "";
  if (pokemonSprite.hasChildNodes()) {
    pokemonSprite.removeChild(img);
  }
  if (previousNextPokemon.hasChildNodes()) {
    previousNextPokemon.removeChild(button);
  }
};

let fetchedResults;

const searchPokemon = async function () {
  await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonSearchInput.value.toLowerCase()}`
  )
    .then((res) => res.json())
    .then((base) => (fetchedResults = base))
    .then((pkmnInfo) => {
      pokemonName.textContent = pkmnInfo.name.toUpperCase();
      pokemonType1.textContent = pkmnInfo.types[0].type.name.toUpperCase();
      if (pkmnInfo.types[1]) {
        pokemonType2.textContent = pkmnInfo.types[1].type.name.toUpperCase();
      }
      pokemonHeight.textContent = pkmnInfo.height / 10 + " m";
      pokemonWeight.textContent = pkmnInfo.weight / 10 + " kg";
      pokemonSprite.appendChild(img);
      img.src = pkmnInfo.sprites.front_default;
    })
    .catch((err) => {
      pokemonAbout.textContent = "This pokemon does not exist.";
      pokemonSprite.appendChild(img);
      img.src = "img/missingno.png";
    });
};

pokemonSearchButton.addEventListener("click", async function () {
  clear();
  await searchPokemon();
  console.log(fetchedResults);
  if (pokemonAbout.textContent != "This pokemon does not exist.") {
    previousNextPokemon.appendChild(button);
    button.innerHTML = `<button class="previous__button" id="previous__button">Previous pokemon</button>
    <button class="next__button" id="next__button">Next pokemon</button>`;
    addButtons();
  }
});

const addButtons = function () {
  let pokemonPrevious = document.getElementById("previous__button");
  let pokemonNext = document.getElementById("next__button");
  let grabId;
  pokemonPrevious.addEventListener("click", async function () {
    clear();
    await previousButtonClick();
    if (pokemonAbout.textContent != "This pokemon does not exist.") {
      previousNextPokemon.appendChild(button);
      button.innerHTML = `<button class="previous__button" id="previous__button">Previous pokemon</button>
      <button class="next__button" id="next__button">Next pokemon</button>`;
    }
  });
};

const previousButtonClick = async function () {
  grabId = fetchedResults.id;
  console.log(grabId);
  for (grabId; grabId > 0; grabId--) {
  await fetch(`https://pokeapi.co/api/v2/pokemon/${grabId}`)
    .then((res) => res.json())
    .then((pkmnInfo) => {
      console.log(grabId);
      pokemonName.textContent = pkmnInfo.name.toUpperCase();
      pokemonType1.textContent = pkmnInfo.types[0].type.name.toUpperCase();
      if (pkmnInfo.types[1]) {
        pokemonType2.textContent = pkmnInfo.types[1].type.name.toUpperCase();
      }
      pokemonHeight.textContent = pkmnInfo.height / 10 + " m";
      pokemonWeight.textContent = pkmnInfo.weight / 10 + " kg";
      pokemonSprite.appendChild(img);
      img.src = pkmnInfo.sprites.front_default;
    })
    .catch((err) => {
      pokemonAbout.textContent = "This pokemon does not exist.";
      pokemonSprite.appendChild(img);
      img.src = "img/missingno.png";
    });
  }
};

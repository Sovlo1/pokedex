// API related stuff here


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
let img = document.createElement("img");

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
};


const searchPokemon = function () {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSearchInput.value.toLowerCase()}`)
    .then((res) => res.json())
    //.then((test) => console.log(test))
    .then((pkmnInfo) => {
        pokemonName.textContent = pkmnInfo.name.toUpperCase();
        pokemonType1.textContent = pkmnInfo.types[0].type.name.toUpperCase();
        if (pkmnInfo.types[1]) {
        pokemonType2.textContent = pkmnInfo.types[1].type.name.toUpperCase();  
        }
        pokemonHeight.textContent = pkmnInfo.height / 10 + " m"
        pokemonWeight.textContent = pkmnInfo.weight / 10 + " kg"
        pokemonSprite.appendChild(img);
        img.src = pkmnInfo.sprites.front_default;
    })
    .catch((err) => {
      pokemonAbout.textContent = "This pokemon does not exist.";
      pokemonSprite.appendChild(img);
      img.src = "img/missingno.png";
    });
};

pokemonSearchButton.addEventListener("click", function () {
  clear();
  searchPokemon();
});

/*let fetchedResults

const searchPokemon = async function () {
  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSearchInput.value.toLowerCase()}`)
    .then((res) => res.json())
    .then((test) => fetchedResults = test)
}

pokemonSearchButton.addEventListener("click", async function () {
    await searchPokemon();
    console.log(fetchedResults);
})*/
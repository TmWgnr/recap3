import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

console.log(cardContainer);

async function fetchCharacters() {
  cardContainer.innerHTML = "";
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      const results = data.results;
      console.log(results);
      results.forEach((result) => {
        createCharacterCard(
          result.name,
          result.image,
          result.status,
          result.type,
          result.episode.length
        );
      });
    } else {
      console.error("bad Response");
    }
  } catch {
    console.error("error occured");
  }
}

fetchCharacters();

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
let maxPage = 1;
let page = 1;
let searchQuery = "";

console.log(maxPage);

async function fetchCharacters() {
  cardContainer.innerHTML = "";
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${currentPage}&name${searchQuery}`
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      const results = data.results;
      maxPage = data.info.pages;
      console.log(maxPage);
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

prevButton.addEventListener("click", () => {
  if (page >= 1) {
    page--;
    fetchCharacters(page);
    pagination.textContent = `${page} / ${maxPage}`;
  }
  console.log(page);
  return page;
});
nextButton.addEventListener("click", () => {
  if (page <= maxPage) {
    page++;
    fetchCharacters(page);
    pagination.textContent = `${page} / ${maxPage}`;
  }
  console.log(page);
  return page;
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;

  console.log(searchQuery);
  fetchCharacters();
});

fetchCharacters();

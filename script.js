const siteComponent = document.getElementById("site-component");
const searchInput = document.getElementById("pokemon-search");
const POKEMON_COUNT = 20;

async function loadPokedex() {
  for (let i = 1; i <= POKEMON_COUNT; i++) {
    await fetchPokemon(i);
  }
}

async function fetchPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  const typeResponse = await fetch(data.types[0].type.url);
  const typeData = await typeResponse.json();

  const strengths = typeData.damage_relations.double_damage_to
    .map((t) => t.name)
    .slice(0, 2)
    .join(", ");
  const weaknesses = typeData.damage_relations.double_damage_from
    .map((t) => t.name)
    .slice(0, 2)
    .join(", ");

  createCard(data, strengths, weaknesses);
}

function createCard(pokemon, strengths, weaknesses) {
  const card = document.createElement("article");
  card.classList.add("pokemon-card");

  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const typesHTML = pokemon.types
    .map((t) => `<span class="type ${t.type.name}">${t.type.name}</span>`)
    .join("");

  const hp = pokemon.stats[0].base_stat;
  const atk = pokemon.stats[1].base_stat;
  const def = pokemon.stats[2].base_stat;

  card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <figure class="pokemon-figure">
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${name}" />
                    <figcaption class="pokemon-caption">
                        <h2 class="pokemon-name">${name}</h2>
                        <div class="pokemon-types">${typesHTML}</div>
                    </figcaption>
                </figure>
            </div>
            <div class="card-back">
                <h3>${name} Stats</h3>
                <div class="stats-container">
                    <div class="stats-row"><span>HP</span> <span>${hp}</span></div>
                    <div class="stats-row"><span>Attack</span> <span>${atk}</span></div>
                    <div class="stats-row"><span>Defense</span> <span>${def}</span></div>
                </div>
                <div class="combat-relations">
                    <div class="relation-block">
                        <span class="rel-title strong-vs">Strong vs:</span>
                        <p>${strengths || "None"}</p>
                    </div>
                    <div class="relation-block text-right">
                        <span class="rel-title weak-vs">Weak vs:</span>
                        <p>${weaknesses || "None"}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
  siteComponent.appendChild(card);
}

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".pokemon-card");

  cards.forEach((card) => {
    const name = card.querySelector(".pokemon-name").innerText.toLowerCase();
    const types = card.querySelector(".pokemon-types").innerText.toLowerCase();
    if (name.includes(value) || types.includes(value)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

loadPokedex();

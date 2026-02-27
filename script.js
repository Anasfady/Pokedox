//Search Bar /.

const searchInput = document.getElementById("pokemon-search");
const cards = document.querySelectorAll(".pokemon-card");

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();

  cards.forEach((card) => {
    const name = card.querySelector(".pokemon-name").innerText.toLowerCase();
    const types = card.querySelector(".pokemon-types").innerText.toLowerCase();

    if (name.includes(searchTerm) || types.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

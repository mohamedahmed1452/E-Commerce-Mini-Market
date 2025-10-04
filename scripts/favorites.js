document.addEventListener("DOMContentLoaded", initFavoritesPage);

function initFavoritesPage() {
  main();
  let favoritesContainer = document.getElementById("favorites-container");
  let favoritesEmpty = document.getElementById("favorites-empty");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  let products = JSON.parse(localStorage.getItem("allProducts")) || [];
  if (favorites.length === 0) {
    if (favoritesEmpty) favoritesEmpty.style.display = "block";
    favoritesContainer.style.display = "none";
    return;
  }

  if (favoritesEmpty) favoritesEmpty.style.display = "none";
  favoritesContainer.style.display = "flex";

  let favoriteProducts = [];
  for (let product of products) {
    if (favorites.includes(product.id)) {
      favoriteProducts.push(product);
    }
  }

  renderProducts(favoriteProducts, "favorites-container");
}

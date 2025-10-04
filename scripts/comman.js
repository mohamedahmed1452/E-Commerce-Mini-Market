let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function mobileMenu() {
  let mobileMenuBtn = document.getElementById("btn-menu");
  let navLinks = document.getElementById("nav-links");
  mobileMenuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
}

function updateFavoritesCount() {
  favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  let favoritesCount = document.getElementById("favorites-count");
  favoritesCount.innerHTML = favorites.length;
}

function updateCartCount() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartCount = document.getElementById("cart-count");
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    count += cart[i].quantity;
  }

  cartCount.innerHTML = count;
}

function renderProducts(products, containerId) {
  let container = document.getElementById(containerId);
  let cartona = "";
  for (let i = 0; i < products.length; i++) {
    let activeFavorites = "",
      activeCart = "";

    if (favorites.includes(products[i].id)) activeFavorites = "active";

    for (let j = 0; j < cart.length; j++) {
      if (products[i].id === cart[j].id) {
        activeCart = "active";
        break;
      }
    }
    cartona += `<div class="product-card">
  <img src="${products[i].image}" alt="${products[i].title}" class="product-image">

  <div class="product-info">
    <h3 class="product-title">${products[i].title}</h3>
    <p class="product-price">$${products[i].price}</p>
    <p class="product-category">${products[i].category}</p>
  </div>

  <div class="product-actions">
      <button onclick="toggleCart(${products[i].id},this)" class="btn-cart ${activeCart}">
        <i class="fas fa-shopping-cart"></i>
      </button>
      <button onclick="toggleFavorite(${products[i].id},this)" class="btn-favorite ${activeFavorites}">
        <i class="fas fa-heart"></i>
      </button>
  </div>
</div>

`;
  }

  container.innerHTML = cartona;
}

function toggleFavorite(productId, button) {
  if (favorites.includes(productId)) {
    favorites = favorites.filter((id) => id !== productId);
    showNotification("Removed successfully", false);
  } else {
    favorites.push(productId);
    showNotification("Added successfully", true);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  button.classList.toggle("active", favorites.includes(productId));
  updateFavoritesCount();
  if (location.pathname.includes("favorites.html")) {
    loadFavorites();
  }
}
function toggleCart(productId, button) {
  let flag = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      cart.splice(i, 1);
      showNotification("Removed successfully", false);
      flag = true;
      break;
    }
  }
  if (!flag) {
    let newItem = { id: productId, quantity: 1 };
    cart.push(newItem);
    showNotification("Added successfully", true);
  }
  button.classList.toggle("active", !flag);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function showNotification(message, flag) {
  let notification = document.getElementById("notification");
  if (flag) {
    notification.classList.add("add");
    notification.classList.remove("remove");
  } else {
    notification.classList.add("remove");
    notification.classList.remove("add");
  }
  notification.innerHTML = message;
  notification.style.display = "block";
  setTimeout(() => (notification.style.display = "none"), 3000);
}

function main() {
  mobileMenu();
  updateCartCount();
  updateFavoritesCount();
}

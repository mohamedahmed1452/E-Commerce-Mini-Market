document.addEventListener("DOMContentLoaded", initCartPage);

function initCartPage() {
  main();
  loadCart();
}

function loadCart() {
  let cartEmpty = document.getElementById("cart-empty");
  let cartContent = document.getElementById("cart-content");

  if (cart.length === 0) {
    cartEmpty.style.display = "block";
    cartContent.style.display = "none";
  } else {
    cartEmpty.style.display = "none";
    cartContent.style.display = "block";

    let products = JSON.parse(localStorage.getItem("allProducts"));
    renderCartItems(cart, products);
    updateCartTotals(cart, products);
  }
}

function renderCartItems(cart, products) {
  let container = document.getElementById("cart-items-container");
  let cartona = "";

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let product = null;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == item.id) {
        product = products[i];
        break;
      }
    }
    if (product) {
      cartona += `
        <div class="cart-item">
          <img src="${product.image}" alt="${
        product.title
      }" class="cart-item-image">
          <div class="cart-item-details">
            <h3 class="cart-item-title">${product.title}</h3>
            <div class="cart-item-actions">
              <div class="cart-item-price">$${(
                product.price * item.quantity
              ).toFixed(2)}</div>
              <div class="quantity-control">
                <button class="quantity-btn" onclick="changeQuantity(${
                  product.id
                }, -1)">-</button>
                <p>${item.quantity}</p>
                <button class="quantity-btn" onclick="changeQuantity(${
                  product.id
                }, 1)">+</button>
              </div>
              <button class="remove-btn" onclick="removeFromCart(${
                product.id
              })">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }
  container.innerHTML = cartona;
}

function changeQuantity(productId, change) {
  for (let i = 0; i < cart.length; i++) {
    if (productId === cart[i].id) {
      cart[i].quantity += change;
      if (cart[i].quantity === 0) {
        removeFromCart(productId);
      }
      break;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  loadCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification("removed successfully", false);
  loadCart();
}

function updateCartTotals(cart, products) {
  let cartSubtotal = document.getElementById("cart-subtotal");
  let cartTotal = document.getElementById("cart-total");
  let Shipping = document.getElementById("Shipping");

  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) {
    for (let j = 0; j < products.length; j++) {
      if (cart[i].id === products[j].id) {
        subtotal += products[j].price * cart[i].quantity;
      }
    }
  }
  let Ship = 5.0;
  let total = subtotal + Ship;
  Shipping.innerHTML = `$${Ship.toFixed(2)}`;
  cartSubtotal.innerHTML = `$${subtotal.toFixed(2)}`;
  cartTotal.innerHTML = `$${total.toFixed(2)}`;
}

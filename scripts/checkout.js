document.addEventListener("DOMContentLoaded", initChackoutPage);

function initChackoutPage() {
  main();
  let form = document.getElementById("checkout-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    processOrder();
  });
}

function processOrder() {
  localStorage.removeItem("cart");
  document.getElementById("checkout-content").style.display = "none";
  document.getElementById("order-success").style.display = "block";
  updateCartCount();
}

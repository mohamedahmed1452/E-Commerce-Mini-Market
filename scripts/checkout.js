document.addEventListener("DOMContentLoaded", initChackoutPage);

function initChackoutPage() {
  main();
  updateCartTotals(cart, allProducts);
  let form = document.getElementById("checkout-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let validFirst = validateInput(
      "first-name",
      /^[A-Za-z]{5,10}$/,
      "Enter 5-10 letters"
    );
    let validLast = validateInput(
      "last-name",
      /^[A-Za-z]{5,15}$/,
      "Enter 5-10 letters"
    );
    let validEmail = validateInput(
      "email",
      /^[A-Za-z][A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+$/,
      "email must constain @ and .com"
    );
    let validAddress = validateInput(
      "address",
      /^[A-Za-z].{5,20}$/,
      "Address must be at least 5 characters"
    );
    let validCity = validateInput(
      "city",
      /^[A-Za-z]{5,20}$/,
      "Enter 5-20 letters"
    );
    let validZip = validateInput(
      "zipcode",
      /^[0-9]{3,10}$/,
      "Enter 5-10 digits"
    );

    if (
      validFirst &&
      validLast &&
      validEmail &&
      validAddress &&
      validCity &&
      validZip
    ) {
      processOrder();
    } else {
      alert("Please correct the errors in the form.");
    }
  });
}

function processOrder() {
  localStorage.removeItem("cart");
  document.getElementById("checkout-content").style.display = "none";
  document.getElementById("order-success").style.display = "block";
  updateCartCount();
}

function validateInput(id, regex, message) {
  let input = document.getElementById(id);
  let error = document.getElementById(id + "-error");
  if (regex.test(input.value.trim())) {
    error.innerHTML = "";
    return true;
  } else {
    error.innerHTML = message;
    return false;
  }
}

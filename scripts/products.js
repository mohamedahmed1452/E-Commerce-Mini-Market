document.addEventListener("DOMContentLoaded", initProductPage);
let ProductCategories = new Map();
function initProductPage() {
  main();
  renderProducts(allProducts, "products-container");
  createDropDownList(allProducts);
  let search = document.getElementById("search-input");
  let category = document.getElementById("category-filter");
  search.addEventListener("input", filterBySearch);
  category.addEventListener("change", filterByCategory);
}

function filterBySearch() {
  let search = document.getElementById("search-input").value.toLowerCase();
  let productsFiltered = [];
  for (let i = 0; i < allProducts.length; i++) {

    if (allProducts[i].title.toLowerCase().includes(search)) {
      productsFiltered.push(allProducts[i]);
    }
  }
  renderProducts(productsFiltered, "products-container");
}

function filterByCategory() {
  let category = document.getElementById("category-filter").value;
  if (category === "") productsFiltered = allProducts;
  else productsFiltered = ProductCategories.get(category);

  renderProducts(productsFiltered, "products-container");
}

function createDropDownList(products) {
  let categoryFilter = document.getElementById("category-filter");

  for (let i = 0; i < products.length; i++) {
    if (ProductCategories.has(products[i].category)) {
      ProductCategories.get(products[i].category).push(products[i]);
    } else {
      ProductCategories.set(products[i].category, [products[i]]);
    }
  }

  let cartona = `<option value="">all categories</option>`;
  for (let category of ProductCategories.keys()) {
    cartona += `<option value="${category}">${category}</option>`;
  }
  categoryFilter.innerHTML = cartona;
}

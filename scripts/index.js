document.addEventListener("DOMContentLoaded", initIndexPage());

async function initIndexPage() {
  main();
  let importantProducts = new Set();
  for (let id of favorites) {
    importantProducts.add(id);
  }
  for (let item of cart) {
    importantProducts.add(item.id);
  }
  if (allProducts.length == 0) {
    let productsFeatched = await fetch("https://fakestoreapi.com/products");
    allProducts = await productsFeatched.json();
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
  }

  let favoriteProducts = allProducts.filter((product) =>
    importantProducts.has(product.id)
  );

  if (favoriteProducts.length < 6) {
    let topProducts = Array.from(
      allProducts.filter((product) => !importantProducts.has(product.id))
    );
    favoriteProducts.push(...topProducts);
  }
  favoriteProducts = favoriteProducts.slice(0, 6);

  renderProducts(favoriteProducts, "featured-products");
}


(async () => {

  const product_storeEl = document.getElementById("product_store")
  const searchInputEl = document.getElementById("searchInput")

  const fetchProduct = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const result = await res.json();
      return result
    } catch (error) {
      return error;
    }
  };

  const products = await fetchProduct();
  const productGerater = (product) => {
    return `<div class="product_card">
    <div class="image_container">
      <img src="${product.image}" alt="" />
    </div>
    <div class="product_content">
      <h1 class="product_heading">
       ${product.title}
      </h1>
      <p class="product_discription">
        ${product.description.split(" ").slice(0, 20).join(" ")}
      </p>
      <div class="product_price_container">
        <p class="product_price">${product.price}$</p>
      </div>
    </div>
  </div>`;
  };

  const renderProduct = (products) => {
    product_storeEl.innerHTML = ''
    products.forEach((product) => {
      product_storeEl.innerHTML += productGerater(product) 
    })
  }
  renderProduct(products)

  const checkTextContent = (text, value) => {
    return text.toString().toLowerCase().includes(value)
  }

  const fetchSearch = (event) => {
    const inputvalue = event.target.value.toLowerCase()
    const filteredProducts = products.filter((product) => {
      return checkTextContent(product.title, inputvalue) ||
      checkTextContent(product.description, inputvalue) ||
      checkTextContent(product.price, inputvalue) 
    })

    renderProduct(filteredProducts)
  }

  searchInputEl.addEventListener("keyup", fetchSearch)

})();

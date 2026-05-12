const cartSidebar =
  document.getElementById("cart-sidebar");

const cartBtn =
  document.getElementById("cart-btn");

const closeCart =
  document.getElementById("close-cart");

cartBtn.addEventListener("click", () => {

  cartSidebar.classList.add("active");

});

closeCart.addEventListener("click", () => {

  cartSidebar.classList.remove("active");

});

let cart =
  JSON.parse(localStorage.getItem("cart"))
  || [];

const buttons =
  document.querySelectorAll(".product-card button");

const cartDisplay =
  document.getElementById("cart-count");

const cartItems =
  document.getElementById("cart-items");

const cartTotal =
  document.getElementById("cart-total");

buttons.forEach((button) => {

  button.addEventListener("click", () => {

    const productCard =
      button.parentElement;

    const productName =
      productCard.querySelector("h3").innerText;

    const productPrice =
      parseInt(
        productCard
          .querySelector("p")
          .innerText.replace("$", "")
      );

    const existingProduct =
  cart.find((item) =>
    item.name === productName
  );

if (existingProduct) {

  existingProduct.quantity++;

} else {

  const product = {
    name: productName,
    price: productPrice,
    quantity: 1
  };

  cart.push(product);

}

  updateCart();

  });

});

function updateCart() {

  cartDisplay.innerText = cart.length;

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    total += item.price * item.quantity;

    cartItems.innerHTML += `
  <div class="cart-item">

    <h4>${item.name}</h4>

    <p>$${item.price}</p>

    <p>Quantity: ${item.quantity}</p>

    <div class="quantity-buttons">

      <button onclick="increaseQuantity(${index})">
        +
      </button>

      <button onclick="decreaseQuantity(${index})">
        -
      </button>

    </div>

    <button onclick="removeItem(${index})">
      Remove
    </button>

  </div>
`;

  });

  cartTotal.innerText = total;

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}

function removeItem(index) {

  cart.splice(index, 1);

  updateCart();

}

updateCart();

const searchInput =
  document.getElementById("search-input");

const products =
  document.querySelectorAll(".product");

searchInput.addEventListener("keyup", () => {

  const searchValue =
    searchInput.value.toLowerCase();

  products.forEach((product) => {

    const productName =
      product.querySelector("h3")
      .innerText
      .toLowerCase();

    if (productName.includes(searchValue)) {

      product.style.display = "block";

    } else {

      product.style.display = "none";

    }

  });

});

function increaseQuantity(index) {

  cart[index].quantity++;

  updateCart();

}

function decreaseQuantity(index) {

  if (cart[index].quantity > 1) {

    cart[index].quantity--;

  } else {

    cart.splice(index, 1);

  }

  updateCart();

}

const darkModeToggle =
  document.getElementById("dark-mode-toggle");

if (
  localStorage.getItem("darkMode") === "enabled"
) {

  document.body.classList.add("dark-mode");

}

darkModeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode");

  if (
    document.body.classList.contains("dark-mode")
  ) {

    localStorage.setItem(
      "darkMode",
      "enabled"
    );

  } else {

    localStorage.setItem(
      "darkMode",
      "disabled"
    );

  }

});
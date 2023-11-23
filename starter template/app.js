// SELECT ELEMENT
const productsElement = document.querySelector(".products");
// console.log (productsElement);
const cartItemsElement = document.querySelector(".cart-items");
// console.log (cartItemsElement);
const subtotalElements = document.querySelector(".subtotal");
// console.log (subtotalElements);
const totalItemsInCartElement = document.querySelector(".total-items-in-cart");

// RENDER SELECTORS
function renderProducts() {
    products.forEach( (product) => {
        productsElement.innerHTML += `
        <div class="item">
        <div class="item-container">
            <div class="item-img">
                <img src=${product.imgSrc}>
            </div>
            <div class="desc">
                <h2>T-shirt 1</h2>
                <h2><small>$</small>${product.price}</h2>
                <p>
                ${product.description}
                </p>
            </div>
            <div class="add-to-wishlist">
                <img src="./icons/heart.png" alt="add to wish list">
            </div>
            <div class="add-to-cart" onClick="addToCart(${product.id})">
                <img src="./icons/bag-plus.png" alt="add to cart">
            </div>
        </div>
    </div>
        `;
    });
}
renderProducts();


// cart array
let cart = [];

// ADD TO CART 
function addToCart(id) {
    //  check if product already exist in cart
    if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits("plus", id);
    } else {
        const item = products.find((product) => product.id === id);

        cart.push({
            ...item,
            numberOfUnits: 1,
        });
    }
     updateCart();
}
//  update cart
function updateCart() {
    renderCartItems();
    renderSubTotal();

    // save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render sub total 
function renderSubTotal() {
    let totalPrice = 0,
      totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

    subtotalElements.innerHTML = `subtotal: (${totalItems} items): ${totalPrice.toFixed(
        2
    )}`
    totalItemsInCartElement.innerHTML = totalItems;
}

// render  cart items
function renderCartItems() {
    cartItemsElement.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsElement.innerHTML += `
      <div class="cart-item">
        <div class="item-info" onclick = "removeItemFromCart(${item.id})">
          <img src="${item.imgSrc}" alt="${item.name}" />
          <h4>${item.name}</h4>
        </div>
        <div class="unit-price"><small>$</small>${item.price}</div>
        <div class="units">
          <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
          <div class="number">${item.numberOfUnits}</div>
          <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
        </div>
      </div>
    `;
  });
}

// remove item from cart
function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);

    updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
      let numberOfUnits = item.numberOfUnits;
      
      if (item.id === id) {
        if (action === "minus" && numberOfUnits > 1) {
            numberOfUnits--;
        }else if (action === "plus" && numberOfUnits < item.instock) {
            numberOfUnits++;
      }
    }
    return {
       ...item,
       numberOfUnits, 
    };
    });

    updateCart();
}
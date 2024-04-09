//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//menu hamburguesa
const ham = document.querySelector('.ham');
const enlace = document.querySelector('.enlaces-menu');
const barras = document.querySelectorAll('.ham span');

ham.addEventListener('click', () => {
    enlace.classList.toggle('activado');
    barras.forEach(child => {child.classList.toggle('animado')});
});


//Open Cart
cartIcon.onclick = () =>{
    cart.classList.add("active")
};
//Close Cart
closeCart.onclick = () =>{
    cart.classList.remove("active")
};

//Cart WorKing JS
if (document.readyState =="loading") {
  document.addEventListener("DOMContentLoaded", ready);
}else{
  ready();
} 

function ready(){
    var removeCartButtons = document.getElementsByClassName("cart-remove")
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener("change", quantitychanged);
    }
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener("click", addCartClicked);
    }   
    document
    .getElementsByClassName('btn-buy')[0]
    .addEventListener('click', buyButtonclickend);
}

function buyButtonclickend(){
    alert('tu pedido está realizado');
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal(); 
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updatetotal();
}
function quantitychanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}
function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var producImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, producImg);
    updatetotal();
}

function  addProductToCart(title, price, producImg){
   var cartShopBox = document.createElement("div");
   cartShopBox.classList.add("cart-box");
   var cartItems = document.getElementsByClassName("cart-content")[0];
   var cartItemsNames =document.getElementsByClassName("cart-product-title");
   for  (var i = 0; i < cartItemsNames.length; i++){
    if (cartItemsNames[i].innerHTML == title){
        alert("ya has añadido este artículo al carrito");
        return;
    }
   }
   
   var cartBoxContent = `

   <img src="${producImg}" alt="" class="cart-img">
  <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
  </div>
  <!--Remove cart-->
  <i class='bx bxs-trash-alt cart-remove'></i>`;

         cartShopBox.innerHTML = cartBoxContent;
         cartItems.append(cartShopBox);
         cartShopBox
             .getElementsByClassName("cart-remove")[0]
             .addEventListener("click", removeCartItem); 
         cartShopBox
             .getElementsByClassName("cart-quantity")[0]
             .addEventListener("change", quantitychanged);

}

function updatetotal() {
    var cartContent = document.querySelector(".cart-content");
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector(".cart-price");
        var quantityElement = cartBox.querySelector(".cart-quantity");

        // Parsear el precio y la cantidad como números
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = parseInt(quantityElement.value);

        // Verificar si el precio y la cantidad son números válidos
        if (!isNaN(price) && !isNaN(quantity)) {
            total += price * quantity;
        }
    }

    // Redondear el total a 2 decimales y formatear como moneda
    total = Math.round(total * 10) / 10;
    var formattedTotal = total.toLocaleString("en-US", { style: "currency", currency: "USD" });

    var totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.innerText = formattedTotal;
    }
}

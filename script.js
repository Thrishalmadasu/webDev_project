const product = [
    {
        id: 0,
        image: 'image/iphone.jpeg',
        title: 'iPhone 15',
        price: 800,
    },
    {
        id: 1,
        image: 'image/mac.jpeg',
        title: 'MacBook air M1',
        price: 1200,
    },
    {
        id: 2,
        image: 'image/pods.jpeg',
        title: 'Apple Air pods',
        price: 250,
    },
    {
        id: 3,
        image: 'image/vision-pro.jpeg',
        title: 'Apple Vision Pro',
        price: 3000,
    },
    {
        id: 4,
        image: 'image/ipod.jpeg',
        title: 'iPod',
        price: 100,
    },
    {
        id: 5,
        image: 'image/MacBook-pro.jpg',
        title: 'MacBook Pro',
        price: 1200,
    },
    {
        id: 6,
        image: 'image/pods-pro.webp',
        title: 'Air pods pro',
        price: 350,
    },
    {
        id: 7,
        image: 'image/15-pro-max.jpeg',
        title: 'iPhone 15 Pro Max',
        price: 1500,
    },
    {
        id: 8,
        image: 'image/15-pro-max.jpeg',
        title: 'iPhone 12',
        price: 700,
    },
    {
        id: 9,
        image: 'image/mac2.jpeg',
        title: 'Mac',
        price: 2000,
    },
    {
        id: 10,
        image: 'image/MQ052.jpeg',
        title: 'Apple key board',
        price: 200,
    },
    {
        id: 11,
        image: 'image/mouse.jpeg',
        title: 'Apple mouse',
        price: 120,
    }
];



const categories = [...new Set(product.map((item)=>{return item}))]

let i=0;

document.getElementById('root').innerHTML = categories.map((item)=>
 {
    var {image, title, price} = item;
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>$ ${price}.00</h2>`+
        "<button class='button' onclick='addtocart("+(i++)+")'>Add to cart</button>"+
        `</div>
        </div>`
    )
 }).join('')


const open = document.querySelector('.open');
const modal_container = document.querySelector('.modal-container');
const close = document.querySelector('.close');

open.addEventListener('click', () => {
    modal_container.classList.add('show');
});

close.addEventListener('click', () => {
    modal_container.classList.remove('show');
});

let cart = [];

// Function to retrieve cart data from local storage
function getCartFromStorage() {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
}

// Function to save cart data to local storage
function saveCartToStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Initialize cart from local storage
cart = getCartFromStorage();

function addtocart(productId) {
    const clickedProduct = product.find(item => item.id === productId);
    const existingCartItem = cart.find(item => item.id === productId);
    if (existingCartItem) {
        // Increment quantity if item already exists in the cart
        existingCartItem.quantity++;
    } else {
        // Add the item to cart with quantity 1
        cart.push({ ...clickedProduct, quantity: 1 });
    }
    saveCartToStorage(cart);
    displaycart();
}

function delElement(index) {
    cart.splice(index, 1);
    saveCartToStorage(cart);
    displaycart();
}

function displaycart() {
    let total = 0;
    document.getElementById("count").innerHTML = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartItemContainer = document.getElementById("cartItem");
    if (cart.length === 0) {
        cartItemContainer.innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ 0.00";
    } else {
        cartItemContainer.innerHTML = cart.map((item, index) => {
            total += item.price * item.quantity;
            return `
                <div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${item.image}>
                    </div>
                    <p style='font-size:12px;'>${item.title}</p>
                    <div class='quantity-buttons'>
                        <button onclick='decrementQuantity(${index})'>-</button>
                        <span>${item.quantity}</span>
                        <button onclick='incrementQuantity(${index})'>+</button>
                    </div>
                    <h2 style='font-size: 15px;'>$ ${item.price * item.quantity}.00</h2>
                    <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
                </div>`;
        }).join('');
        document.getElementById("total").innerHTML = `$ ${total.toFixed(2)}`;
    }
}

function incrementQuantity(index) {
    cart[index].quantity++;
    saveCartToStorage(cart);
    displaycart();
}

function decrementQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    saveCartToStorage(cart);
    displaycart();
}

function clearAll() {
    cart = [];
    saveCartToStorage(cart);
    displaycart();
}

const clearAllButton = document.querySelector('.clear-all');
clearAllButton.addEventListener('click', clearAll);

// Initial display of the cart
displaycart();

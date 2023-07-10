//  import addToCart from "./firebase.js"
        
    let openShopping = document.querySelector('.shopping');
    let closeShopping = document.querySelector('.closeShopping');
    let list = document.querySelector('.list');
    let listCard = document.querySelector('.listCard');
    let body = document.querySelector('body');
    let total = document.querySelector('.total');
    let quantity = document.querySelector('.quantity');
    
    openShopping.addEventListener('click', ()=>{
        body.classList.add('active');
    })
    closeShopping.addEventListener('click', ()=>{
        body.classList.remove('active');
    })
    
    

    const products = [
        {
            id:0,
            image: 'external/image47195-p483-300h.png',
            title: "Stir Fry Eggplant",
            price: 10,
            number: 0
        },
        
        {
            id:1,
            image: 'external/image87199-q9w5-300h.png',
            title: "Hebal Lala Soup",
            price: 16,
            number: 1
        },
        {
            id:2,
            image: 'external/image37203-68ga-300h.png',
            title: "Logan Sweet & Sour Pork",
            price: 16,
            number: 2
        },
        {
            id:3,
            image: 'external/image77207-9hk8-300h.png',
            title: "Black Pepper Crab",
            price: 42,
            number: 3
        },
        {
            id:4,
            image: 'external/image67212-vbaa-300h.png',
            title: "Ginseng Herbal Soup",
            price: 16,
            number: 4
        },
        {
            id:5,
            image: 'external/image27216-tfc-300h.png',
            title: "Signature Garlic Prawns",
            price: 42,
            number: 5
        },
        {
            id:6,
            image: 'external/image17220-ed6-300h.png',
            title: "Signature Tofu",
            price: 12,
            number: 6
        },
        {
            id:7,
            image: 'external/image57224-tsee-300h.png',
            title: "3 Eggs Spinach",
            price: 12,
            number: 7
        }
        ];


    let listCards  = [];
    function initApp(){
        products.forEach((value, key) =>{
            let newDiv = document.createElement('div');
            newDiv.classList.add('item');
            // newDiv.innerHTML = `
                // <img src="${value.image}">
                // <div class="title">${value.title}</div>
                // <div class="price">$${value.price.toLocaleString()}</div>
                // <button class='buttonAdd${value.number}' onclick="addToCard(${key})" name="subject" type="click" value="${value.title}">Add To Cart</button>
                // `;
            {/* list.appendChild(newDiv); */}
        })
    }
    initApp();
    function addToCard(key){
        if(listCards[key] == null){
            // copy product form list to list card
            listCards[key] = JSON.parse(JSON.stringify(products[key]));
            listCards[key].quantity = 1;
        }
        reloadCard();
        // orderList()
        
    }

    function removeAll(){
        listCards.length=0;
        reloadCard()
        // orderList()
    }
    


    function reloadCard(){
        listCard.innerHTML = '';
        let count = 0;
        let totalPrice = 0;
        listCards.forEach((value, key)=>{
            totalPrice = totalPrice + value.price;
            count = count + value.quantity;
            if(value != null){
                let newDiv = document.createElement('li');
                newDiv.innerHTML = `
                    <div><img src="${value.image}"/></div>
                    <div class="titleThing">${value.title}</div>
                    <div class="titleThing">$${value.price.toLocaleString()}</div>
                    <div>
                        <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                        <div class="count">${value.quantity}</div>
                        <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                    </div>`;
                    listCard.appendChild(newDiv);
            }
        })
        


        total.innerText = "$"+totalPrice.toLocaleString();
        quantity.innerText = count;
        console.log(listCards)
        
        orderList()
    



    // // Create a new HTML element
    // var newElement = document.createElement('div');
    // newElement.className = 'newElementClass';
    // newElement.innerHTML = `<button name="subject" type="click" value="${myJson}">Proceed To Check Out</button>`;
    
    // // Append the new element to the parent element
    // parentElement.appendChild(newElement);
    
    }

    function changeQuantity(key, quantity){
        if(quantity == 0){
            delete listCards[key];
        }else{
            listCards[key].quantity = quantity;
            listCards[key].price = quantity * products[key].price;
        }
        reloadCard();
    }


// var array = ['apple','ball']; //In this i have 2 items

// document.getElementById('parentElementId').innerHTML = listCards.toString();

// addToCart(listCards)

function orderList(){

      var names = listCards.map(function(item) {
        return item['title'] + ': '+item['quantity'];
      });
      console.log(names)
    var parentElement = document.getElementById('parentElementId');
    var newElement = document.createElement('div');
    // newElement.className = 'newElementClass';
    newElement.innerHTML = `<button class='buttonAdd' name="subject" type="click" value="${names}">Proceed To Check Out</button>`;
    parentElement.replaceChildren(newElement);
}
orderList()



// Append the new element to the parent element
// parentElement.appendChild(newElement);

// var newElement = document.createElement("div");

// // Set attributes or properties for the new element
// newElement.id = "childElementId";
// newElement.className = "proceedToCheckOut";

// // Find the parent element where you want to append the new element
// var parentElement = document.getElementById("parentElementId");

// // Append the new element to the parent element
// 
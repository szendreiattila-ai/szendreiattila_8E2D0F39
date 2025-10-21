const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const listOfBooks = document.getElementsByClassName('book');
const homeLink = document.getElementById('Home');
const noResultsMsg = document.getElementById('no-results-msg');
const cartToggle = document.getElementById('cart-toggle');
const cartCountEl = document.getElementById('cart-count');

function getCart(){
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
}

function setCart(items){
    localStorage.setItem('cart', JSON.stringify(items));
    updateCartCount();
}

function updateCartCount(){
    const items = getCart();
    let count = 0;
    items.forEach(i=> count += (i.qty||1));
    cartCountEl.textContent = count;
}

function addToCart(id, title, img, price){
    const items = getCart();
    
    const existing = items.find(i=>i.id===id);
    if(existing){ existing.qty = (existing.qty||1) + 1; }
    else { items.push({id, title, img, price: price||0, qty: 1}); }
    setCart(items);
 
    try{
        const toastBody = document.getElementById('cart-toast-body');
        if(toastBody) toastBody.textContent = title + ' hozzáadva';
        const toastEl = document.getElementById('cart-toast');
        if(toastEl){
            const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 1500 });
            toast.show();
        }
    }catch(e){ console.warn('Toast show failed', e); }
}

function showCartPanel(){
    const items = getCart();
    const modalEl = document.getElementById('cartModal');
    const body = document.getElementById('cart-modal-body');
    if(items.length===0){
        body.innerHTML = '<p>A kosarad üres.</p>';
    } else {
        let html = '<table class="table"><thead><tr><th>Termék</th><th>Egységár</th><th>Mennyiség</th><th>Összeg</th><th></th></tr></thead><tbody>';
        items.forEach((it, idx) => {
            const subtotal = (it.price||0) * (it.qty||1);
            html += `<tr><td><img src="${it.img}" style="width:50px; margin-right:8px;">${it.title}</td><td>${(it.price||0).toLocaleString()} Ft</td><td><button class="btn btn-sm btn-outline-secondary me-1" onclick="changeQty(${idx}, -1)">-</button>${it.qty||1}<button class="btn btn-sm btn-outline-secondary ms-1" onclick="changeQty(${idx}, 1)">+</button></td><td>${subtotal.toLocaleString()} Ft</td><td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${idx}); showCartPanel();">Eltávolít</button></td></tr>`;
        });
        const total = items.reduce((s,it)=> s + (it.price||0)*(it.qty||1), 0);
        html += `</tbody></table><div class="d-flex justify-content-between align-items-center"><strong>Végösszeg: ${total.toLocaleString()} Ft</strong><div><button id="modal-purchase" class="btn btn-success">Megvásárlás</button> <button id="modal-close" class="btn btn-secondary ms-2">Bezár</button></div></div>`;
        body.innerHTML = html;
        document.getElementById('modal-purchase').addEventListener('click', proceedToPurchase);
        document.getElementById('modal-close').addEventListener('click', closeCartModal);
    }
   
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
}

function changeQty(index, delta){
    const items = getCart();
    items[index].qty = Math.max(1, (items[index].qty||1) + delta);
    setCart(items);
  
    const modalEl = document.getElementById('cartModal');
    if(modalEl){
        
        showCartPanel();
    }
}

function removeFromCart(index){
    const items = getCart();
    items.splice(index,1);
    setCart(items);
    
    const modalEl = document.getElementById('cartModal');
    if(modalEl){ showCartPanel(); }
}

function closeCartModal(){
    const modalEl = document.getElementById('cartModal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.hide();
}

function proceedToPurchase(){
   
    window.open('purchase.html','_blank');
}

homeLink.addEventListener('click', function() {
    searchBox.value = ''; 

    for (let i = 0; i < listOfBooks.length; i++) {
      listOfBooks[i].style.display = 'block'; 
    }
});


searchBtn.addEventListener('click', function(){
    const searchText = searchBox.value.toLowerCase();
    console.log(searchText);
    let matchFound = false;

    for(let i =0; i<listOfBooks.length; i++){
        const bookTitle = listOfBooks[i].getElementsByTagName('h2')[0].textContent.toLowerCase();
    
        if(bookTitle.includes(searchText)){
            listOfBooks[i].style.display='block';
            matchFound = true;
        }
        else{
            listOfBooks[i].style.display='none';
        }
    }
    
    if(!matchFound){
        noResultsMsg.style.display = 'block';
    }
    else{
        noResultsMsg.style.display ='none';
    }
});

if(cartToggle){
    cartToggle.addEventListener('click', showCartPanel);
}

updateCartCount();
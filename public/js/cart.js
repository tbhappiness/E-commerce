let cartList = document.querySelector('.cartItems');


cartList.addEventListener("click", ev => {
    ev.preventDefault();
    let item = ev.target;
    btntouch = item;
    if(item.classList.contains('inc')){
        item = item.parentElement.parentElement;
        item = item.lastElementChild;
        let id = item.getAttribute('id');
        axios.get(`/shop/cart/increase/${id}`).then(({data}) => {
            cart = data;
            let quant = document.querySelector('.quant'); 
            let price = document.querySelector('.price');
            price = +(price.innerText);
            price += data.totalPrice;
            let c = +(quant.innerText);
            c += 1;
            quant.innerText = `${c}`;
            document.querySelector('.totalPrice').innerText = `Total Price: ${data.totalPrice}`;
        }).catch(err => {
            console.log(err);
            alert(err.message);
        }) 
        
    }
    else if(item.classList.contains('dec')){
        item = item.parentElement.parentElement;
        item = item.lastElementChild;
        let id = item.getAttribute('id');
        axios.get(`/shop/cart/decrease/${id}`).then(({data}) => {
            let quant = document.querySelector('.quant');   
            let c = +(quant.innerText);
            let price = document.querySelector('.price');
            price = +(price.innerText);
            price = data.totalPrice - price;
            if(c == 1){
                quant.parentElement.parentElement.parentElement.remove();
            }else{
                c -= 1;
                quant.innerText = `${c}`;
            }
            document.querySelector('.totalPrice').innerText = `Total Price : ${data.totalPrice}`;
        }).catch(err => {
            console.log(err);
            alert(err.message);
        })  
    }
})

// try{
        //     let {data} = await axios.get(`/shop/cart/increase/${id}`);
        // cart = data;
        // updateCart(cart.id);
        // }
        // catch(eerr){
        //     console.log(eerr);
        // }
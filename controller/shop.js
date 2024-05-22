const products = require('../models/products');
const Users = require('../models/users');

module.exports.getHome = async (req, res, next)=>{
    try{
        let allProducts = await products.find({});
        const {getProductsCategoryWise} = require('../utils/library');
        let categoryProducts = getProductsCategoryWise(allProducts);
        res.render('shop/home', {
            products: categoryProducts,
        })
    }
    catch(err){
        console.log(err, 'in getProductsAll');
        res.send(err);
    }
}

module.exports.getProductsAll = async(req, res, next) => {
    try{
        const products = await Products.find({});
        const {getProductsCategoryWise} = require('../utils/library');
        const categoryProducts = getProductsCategoryWise(products);
        
    }
    catch(err){
        console.log(err, "in getProductsAll");
        res.send(err);
    }
}

module.exports.getProductsById = async(req, res, next) => {
    try{
        const {id} = req.params;
        const product = await Products.findById(id);
        res.render('shop/productDetails', {
            product
        })
    }
    catch(err){
        console.log(err, 'getProductsById');
        res.send(err);
    }
}

module.exports.getCart = async(req, res, next) => {
    try{
        let user = await req.user.populate('cart.id');
        let totalPrice = 0;    
        user.cart.forEach((item) => {
            totalPrice += item.id.price * item.quantity;
        });
        res.render('shop/cart', {
            cart: user.cart,
            totalPrice
        })
    }
    catch(err){
        next(err);
    }
}


module.exports.getAddToCartById = async (req, res, next) => {
    try {
        const { id } = req.params;
        let cart = req.user.cart;
        let indx = -1;
        cart.forEach((item, i) => {
            if (item.id == id) {
                indx = i;
            }
        })
        console.log(indx);
        if (indx == -1) {
            cart.unshift({
                id: id,
                quantity: 1
            })
        }
        else {
            cart[indx].quantity++;
        }
        await req.user.save();
        res.redirect('/shop/cart');
    } catch (err) {
        next(err);
    }
}

module.exports.getQuantityInc = async(req, res, next) => {
   
    const {id} = req.params;
    let cart = req.user.cart; 
    let indx = -1;
    cart.forEach((item, i) => {
        if(item.id == id) indx = i;
    })
    cart[indx].quantity++;
    
    await req.user.save();
    try{
        let user = await Users.findOne({_id: req.user._id}).populate('cart.id');
        let totalPrice = 0;
        user.cart.forEach((item) => {
            totalPrice += item.id.price * item.quantity;
        })
        res.send({
            id: user.cart,
            totalPrice,
            indx
        });
    }
    catch(err){
        console.log(err, 'in getQuantity Inc, user find');
        next(err);
    }
    
}

module.exports.getQuantityDec = async(req, res, next) => {

    const {id} = req.params;
    let cart = req.user.cart; 
    let indx = -1;
    cart.forEach((item, i) => {
        if(item.id == id) indx = i;
    })

    if(cart[indx].quantity > 1){
        cart[indx].quantity --;
    }
    else if(cart[indx].quantity == 1){
        cart[indx].quantity--;
        cart.splice(indx, 1);
    }    
    await req.user.save();
    try{
        let user = await Users.findOne({_id: req.user._id}).populate('cart.id');
        let totalPrice = 0;
        user.cart.forEach((item) => {
            totalPrice += item.id.price * item.quantity;
        })
        res.send({
            id: user.cart,
            totalPrice,
            indx
        });
    }
    catch(err){
        console.log(err, 'in getQuantity Dnc, user find');
        next(err);
    }
    
}

module.exports.getCartBuy = (req, res, next) => {

}
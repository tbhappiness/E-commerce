const Products = require('../models/products');

module.exports.getHome = (req, res, next) => {
    res.render('admin/home');
}

module.exports.postProductsAdd = async (req, res, next)=>{
    let {name, price, description, image_url, seller, category} = req.body;
    try{
        let newProduct = await Products.create({
            name,
            price,
            category,
            description,
            image_url,
            seller
        });
        res.redirect('/admin/products/all');
    }
    catch(err){
        
        console.log(err, 'error in postProductsAdd');
        res.send(err);
    }
}

module.exports.getProductsAll = async (req, res, next)=>{
    try{
        let products = await Products.find({});
        let data = {};
        products.forEach((product) => {
            let arr = data[product.category] || [];
            arr.push(product);
            data[product.category] = arr;
        });

        res.render('admin/products-list', {
            products: data
        })
    }
    catch(err){
        console.log(err, 'error in getProductsAll');
        res.send(err);
    }
}

module.exports.getProductsAdd = (req, res, next) => {
    res.render('admin/addProduct');
}

module.exports.getProductsDelete = async(req, res, next) => {
    const {id} = req.params;
    try{
        await Products.findOneAndDelete({ _id: id });
        res.redirect('/admin/products/all');
        
    }
    catch(err){
        console.log(err, 'getProductsDelete');
        res.send(err);
    }
}

module.exports.getProductsUpdate = async(req, res, next) => {
    const {id} = req.params;
    try{
        const p = await Products.findById(id);
        res.render('admin/updateProduct', {
            p
        });
    }
    catch(err){
        console.log(err, "getProductsUpdate");
        res.send(err);
    }
}

module.exports.postProductsUpdate = async(req, res, next) => {
    try{
        const {name , price, seller, category, description, image_url, id} = req.body;
        const updatedProduct = await Products.updateOne({_id: id}, {
            name,
            seller, 
            price, 
            category,
            image_url,
            description
        })
        res.redirect('/admin/products/all');
    }
    catch(err){
        console.log(err, "erroor in postProductsSample");
        res.send(err);
    }

}   
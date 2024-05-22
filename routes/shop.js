const path = require('path')
const express = require('express');
const router = express.Router();
const shopController = require('../controller/shop');

router.get('/', shopController.getHome);
router.get('/products/all', shopController.getProductsAll);
router.get('/products/:id', shopController.getProductsById);
router.get('/cart', shopController.getCart);
router.get('/cart/add/:id', shopController.getAddToCartById);
router.get('/cart/increase/:id', shopController.getQuantityInc);
router.get('/cart/decrease/:id', shopController.getQuantityDec);
router.get('/cart/buy', shopController.getCartBuy);



module.exports = router;
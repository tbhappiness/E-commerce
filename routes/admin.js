const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin');

router.get('/', adminController.getHome)
router.get('/products/all', adminController.getProductsAll);
router.post('/products/add', adminController.postProductsAdd);
router.get('/products/add', adminController.getProductsAdd);
router.get('/products/delete/:id', adminController.getProductsDelete);
router.get('/products/update/:id', adminController.getProductsUpdate);
router.post('/products/update', adminController.postProductsUpdate);

module.exports = router;
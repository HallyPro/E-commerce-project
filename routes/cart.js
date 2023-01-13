const express = require('express');
const router = express.Router();

const { getAllCarts, getCart, createCart, updateCart, deleteCart } = require('../controllers/cart');

router.route('/').get(getAllCarts).post(createCart);
router.route('/:id').get(getCart).delete(deleteCart);



module.exports = router;
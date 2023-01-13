const Product = require('../models/product');
const Cart = require('../models/cart');

const getAllCarts = async (req, res) => {
    const cart = await Cart.find({ createdBy: req.user.userId });

//Getting total price of products in the cart
    let totalAmount = 0; 
    cart.forEach((item) => { totalAmount += item.price});

    res.status(200).json({cart, totalAmount});
}

const getCart = async (req, res) => {
    const { user: {userId}, params:{id: cartId}} = req;
    
    const cart = await Cart.findOne({ _id: cartId, createdBy: userId});

    if(!cart){
       return res.status(400).json({ error : 'Unfortunately, we are out of stocks for this product :('});
    }

    res.status(200).json({cart});
}

const createCart = async (req, res) => {
    const {user:{userId}, body:{productName, colors, size}} = req;

    const products = await Product.findOne({productName, colors, size});

//Validate product
    if(!products) {
        return res.status(400).json({
            error: 'Oops! Seems like we ran out of stocks for this product :('
        });
    }

    const cart = await Cart.create({
        product: productName,
        productColor: colors,
        price: products.price,
        productSize: size,
        section: products.section,
        category: products.category,
        createdBy: userId
    });

    const carts = {
        product: cart.product,
        color: cart.productColor,
        size: cart.productSize,
        section: cart.section,
        category: cart.category,
        price: cart.price
    }
    res.status(201).json({ carts });

}

const deleteCart = async (req, res) => {
    const { user: {userId}, params:{id: cartId}} = req;
    
    const cart = await Cart.findByIdAndRemove({ _id: cartId, createdBy: userId});

    if(!cart){
       return res.status(400).json({ error : 'This product does not exist in your cart :('});
    }

    res.status(200)
}



module.exports =  {
                    getAllCarts,
                    getCart,
                    createCart, 
                    deleteCart
}
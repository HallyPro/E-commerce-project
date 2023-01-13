const mongoose = require('mongoose');
const user = require('./auth');

const cartSchema = new mongoose.Schema({
    product: {
        type: String, 
        required: [true, 'Please provide productName']
    },
    productColor: {
        type: String,
        required: [true, 'Color missing for this product, please product']
    },
    price: {
        type: Number, 
        required: true
    },
    productSize: {
        type: String, 
        required: [true, 'Please provide the size for thus product']
    },
    section: {
        type: String,
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:[true, 'Please provide user']
    }
}, {timestamps: true})


module.exports = mongoose.model('Cart', cartSchema);
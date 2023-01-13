const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Please proviide product name']
    },
    colors: {
        type: [ String ],
        required: [true, 'Please select a color for your product']
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price']
    },
    size: {
        type: [String],
        required: [true, 'Please provide the size of product']
    },
    section: {
        type: String, 
        required: [true, 'Please specify the section for this product']
    },
    category: {
        type: String,
        requred: [true, 'Please specify a category this product belongs']
    }
}, { timestamps: true})


module.exports = mongoose.model('Product', productSchema);
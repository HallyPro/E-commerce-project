const Product = require('../models/product');

const getAllProducts = async (req, res) => {
    const { productName, section, category, filter, sort} = req.query;
    const queryObject = {};

    if(productName) {
        queryObject.productName = { $regex: productName, $options: 'i'}; 
    }

    if(section) {
        queryObject.section = { $regex: section, $options: 'i'};
    }

    if(category) {
        queryObject.category = category; 
    }
    
    let result = Product.find(queryObject);

    if(filter) {
        const filterList = filter.split(',').join(' ');
        result = result.select(filterList);
    }

    if(sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('productName'); 
    }

    //Pagination 
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);
    const products = await result;
    res.status(200).json({product: products, productCounts: products.length});
}

module.exports = getAllProducts;
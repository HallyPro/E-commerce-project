const connectDB = require('./db/connect')
const jsonProduct = require('./product.json');
const Product = require('./models/product');
require('dotenv').config();

const populateDB = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        await Product.deleteMany();
        await Product.create(jsonProduct);
        console.log('Populate product successful!!');
    } catch (error) {
        console.error(`Error connecting to database : ${error}`);
    } finally {
        process.exit(0);
    }
} 

populateDB();
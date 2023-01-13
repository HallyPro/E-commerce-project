const express= require('express');
require('express-async-errors');
require('dotenv').config();

//security import
const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');

const app = express();

//local imports
const {connectDB} = require('./db/connect');
const authRouter = require('./routes/auth');
const cartRouter = require('./routes/cart');
const productRouter = require('./routes/product');
const authMiddleware = require('./middlewares/authenticate');
const notFoundMiddleware = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');

// security packages 
app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs : 15 * 60 * 1000,
    max: 100
}));
app.use(helmet());
app.use(cors());

app.use(express.json());

//routes 
app.get('/', (req, res) => {
    res.send('Welcome to E-commerce API');
})
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', authMiddleware, cartRouter);

//middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const PORT = process.env.PORT || 3000;

const start = async() => {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log(`server is listening on port ${PORT}`);
        })
}

start();

module.exports = app;
const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

mongoose.connection.on('error', (err) => {
    console.error(`There's an error connecting to the database ${err}`);
})

const connectDB = async (uri) => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri);
}

const disconnectDB = async () => {
    await mongoose.disconnect(); 
}

module.exports = { connectDB, disconnectDB};
const mongoose = require('mongoose');
const color = require('colors');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        console.log(`MongoDB Error: ${error.message}`.red.bold);
        process.exit();
    }
};

module.exports = connectDB;
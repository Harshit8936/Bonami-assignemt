const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;

const db = async()=>{
    try {
        await mongoose.connect(URI,
            console.log('MONGODB is connected '))
    } catch (error) {
        console.error(error);
        process.exit(0);
    }
}

module.exports = db;
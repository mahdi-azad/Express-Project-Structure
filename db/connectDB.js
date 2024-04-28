
const mongoose = require('mongoose');
require('dotenv').config("../.env");
console.log(process.env.DB_USER);
// const connectDB = async () => {
//     const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1bkzvbb.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority&appName=Cluster0`

//     try {
//         await mongoose.connect(MONGO_URI);
//         console.log('Database is connected!!')
//     } catch (error) {
//         console.log(error.message)
//     }
   
// }

const connectDB = async () => {
        const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1bkzvbb.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority&appName=Cluster0`

        try {
                await mongoose.connect(MONGO_URI);
                console.log('Database is connected!!');
        } catch (error) {
                console.log(error.message)
        }
}

module.exports = connectDB;
import mongoose from "mongoose";


const connectDB = async () => {

    try {

        await mongoose.connect(`${process.env.MONGODB_URI}`,{
            serverSelectionTimeoutMS:30000,
        })
        console.log('\n Connected to MongoDB database. \n');
    } catch (err) {

        console.log("Error connecting to MongoDB:", err)

    }
}

export default connectDB;
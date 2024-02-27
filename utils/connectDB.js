import mongoose from "mongoose";

let isConnected = false;

const connectToDB = async() =>{
    mongoose.set('strictQuery',true);
    try {
        if(isConnected){
            console.log("Already connected to DB");
            return;
        }
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:'budget-app'
        });

        isConnected = true;

        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
} 

export default connectToDB;
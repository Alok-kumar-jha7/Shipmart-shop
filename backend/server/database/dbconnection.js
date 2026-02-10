import mongoose from "mongoose";

export const connectToDatabase = async () =>{
    await mongoose.connect(process.env.MONGODB_URL,{
        dbName:"SHIPMART_AUTHENTICATION"
    }).then(()=>{
        console.log("Database connected succesfully");
    }).catch((err)=>{
        console.log(`Something went wrong with database:${err.message}`);
    })
}
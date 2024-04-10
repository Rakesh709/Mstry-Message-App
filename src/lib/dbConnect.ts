import mongoose from "mongoose";

type ConnectionObject ={
    isConnected?: number
}

const connection:ConnectionObject= {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected){
        console.log("Already connected to database")
        return
    }
    try {
       const db =  await mongoose.connect(process.env.MONGODB_URI || '',{})

       
       connection.isConnected= db.connections[0].readyState

       console.log('DB connected Successfully',db.connection.host);
    } catch(error){

        console.log("Database connection  failed",error);
        //if db failed to connect exit the process like complete application will fail
        process.exit(1)

    }
}

export default dbConnect;
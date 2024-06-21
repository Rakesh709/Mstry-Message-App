//mostly backend is the always run that is why wee use aws etc 
//next js is diffrent that is edge time framework


import mongoose from "mongoose";

type ConnectionObject ={
    isConnected?: number
}

const connection:ConnectionObject= {};
//FIRST CHECK THE CONNECTION THE MAKE CONNECTION
async function dbConnect(): Promise<void> {
    if (connection.isConnected){
        console.log("Already connected to database")
        return
    }
    try {
       const db =  await mongoose.connect(process.env.MONGODB_URI || '',{})

       console.log(db)
       
       connection.isConnected= db.connections[0].readyState

       console.log('DB Connected Successfully',db.connection.host);
    } catch(error){

        console.log("Database Connection  failed",error);
        //if db failed to connect exit the process like complete application will fail
        process.exit(1)

    }
}

export default dbConnect;
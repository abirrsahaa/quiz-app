import mongoose from "mongoose"


const connectToMongo=async ()=>{
    try {

        await mongoose.connect("mongodb+srv://abir:abir@cluster0.ode8e.mongodb.net/chatapp");
        console.log("connected to mongo")
        
    } catch (error) {
        console.log("there was problem in connecting to mongo",error)
    }
}

export default connectToMongo;
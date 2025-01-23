import mongoose from "mongoose"


const connectToMongo=async ()=>{
    try {

        const something=await mongoose.connect("mongodb+srv://abir:abir@cluster0.ode8e.mongodb.net/chatapp");
        console.log("connected to mongo")
        console.log("things that i am getting here ",something.models);
        console.log("the model names are ",something.modelNames());
        
    } catch (error) {
        console.log("there was problem in connecting to mongo",error)
    }
}

export default connectToMongo;
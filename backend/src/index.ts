import express from 'express';
import { createServer } from 'http';
import {  WebSocket, WebSocketServer } from 'ws';
import { QuizManager } from './QuizManager';
import Question, { IQuestion } from './db/question';
import cors from 'cors';
import User, { IUser } from './db/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import connectToMongo from './mongoose';



const app=express();
app.use(express.json());
dotenv.config();
app.use(cors(
    {
        origin:'http://localhost:5173',
        credentials:true
    }
))
const server=createServer(app);

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.post('/question',async(req,res)=>{
    // console.log("the body received is",req);
    try{
    const {questions}=req.body as {questions:IQuestion[]};
    console.log("the body received is",questions);


    questions.forEach(async(question:IQuestion)=>{
        const naya=await new Question(question);
        console.log("the question is",naya);
        await naya.save();
    })

    res.status(200).send("Question created successfully");

}catch(err){
        console.log("there was an error in creating the question",err);
        res.status(500).send(err);
    }
    
});


connectToMongo();

// @ts-ignore
app.get("/user",async(req,res)=>{
    try {

        const header=req.headers.authorization;
        if(!header || !header.startsWith('Bearer ')){
            return res.status(401).send("Unauthorization header missing or invalid");
        }

        const token=header.split(' ')[1];
        console.log("the token received is",token);
        

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };
        } catch (err) {
            console.error('Error verifying token:', err);
            return res.status(401).send('Invalid token');
        }
        console.log("the decoded token is",decoded);
        // @ts-ignore
        const email=decoded.email;
        console.log("the email received here is ",email);
        const user =await User.findOne({
            email:email
        })
       if(!user){
        return res.status(404).send("User not found");
       }
       const user_response={
        id:user._id,
        first_name:user.first_name,
        last_name:user.last_name,
        email:user.email
       }

       return res.status(200).json({
        user:user_response
       });
        
    } catch (error) {

        console.log("there was an error in getting the user",error);
        return res.status(500).send("There was an error in getting the user");
        
    }
})

// @ts-ignore   
app.post('/signup',async(req,res)=>{
    try {

        console.log("the body received is",req.body);

        // !check kar ke iss email ka koi aur nahi hai na 
        const existing =await User.findOne({
            email:req.body.email
        })
        if(existing){
            return res.status(400).send("User already exists with the same email please include another email");
        }

        const hash=await bcrypt.hash(req.body.password,10);
        console.log("the hash generated is",hash);
        const user:IUser=await new User({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            password:hash
        });
        console.log("the user created is",user);
        await user.save();
        // !jwt create karna hai for token management and seamless login 
        // !jwt mai email rakh dunga wese bhi woh unique hai 
        console.log("the secret key is",process.env.JWT_SECRET);
        const token=jwt.sign({email:user.email},process.env.JWT_SECRET as string);
        if(!token){
            return res.status(500).send("Token could not be generated");
        }
        console.log("the token generated is",token);
        return res.status(200).json({
            token:token,
            success:true,
            user:user
        })



        // !agar nahi hai toh valid user hai password hash karke entry create kar 
        // !jwt create karke bhej de and token banana hai toh woh bhi bana de 
        
    } catch (error) {


        console.log("there was an error in creating the user",error);
        return res.status(500).send
        
    }
})

const quizManager=new QuizManager();


const ws=new WebSocketServer({server});

ws.on("connection",(socket:WebSocket)=>{
    
    console.log('Client connected');
    socket.send(JSON.stringify({
        type:"SERVER_CONNECTED",
        message:"You are connected to the server",
        socket:socket
    }))
    quizManager.addUser(socket);
})


server.listen(8080,()=>{
    console.log('Server is running on port 8080');
});
import express from 'express';
import { createServer } from 'http';
import {  WebSocket, WebSocketServer } from 'ws';
import { QuizManager } from './QuizManager';
import Question, { IQuestion } from './db/question';



const app=express();
app.use(express.json());
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
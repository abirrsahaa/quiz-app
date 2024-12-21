import express from 'express';
import { createServer } from 'http';
import {  WebSocket, WebSocketServer } from 'ws';
import { QuizManager } from './QuizManager';


const app=express();
const server=createServer(app);

app.get('/',(req,res)=>{
    res.send('Hello World');
});

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
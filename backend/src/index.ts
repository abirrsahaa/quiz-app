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



import { populateQuestions } from './utils/question_seed';

import exam from './db/exam';
import subject from './db/subject';
import chapter from './db/chapter';
import topic from './db/topic';



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
// this means jokhon server run korbo tokhon quiz manager create hoibo right !
// !akhon quiz manager hoiya gese akhon jotobar server side event aibo ai route e tokhon akta event pass hoibo jar karone akta quiz generate hoitase 
// !for suppose just reload korse and oi session er quiz e akta attribute thakbo jen ended ki na ..jeta naki either topic completion e hoibo ba jokhon user e intentionally end korbo 
// !so jokhon e ami quiz page e jamu with the user details i can look for the latest quiz id has ended or not or agr ended na ho toh quiz manager se woh nikal na padega and then uss active quiz mai woh nikal ke mereko wohi quiz state lana padega which is a concern 
// !but i can actually skip this thing why to recover a quiz ..i am not giving a test right ? quiz ended doesnt matter when the user will again go for the quiz he wil be preparing only 


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

const neetSubjects = [
    {
        name: "Zoology",
        description: "Animal biology, human physiology, and animal diversity for medical entrance exam",
        chapters: []
    },
    {
        name: "Botany",
        description: "Plant biology, plant physiology, and botanical systems for medical entrance exam",
        chapters: []
    },
    {
        name: "Physics",
        description: "Fundamental physics concepts required for medical entrance examination",
        chapters: []
    },
    {
        name: "Chemistry",
        description: "Essential chemical principles and organic chemistry for medical aspirants",
        chapters: []
    }
];


const zoologyChapters = [
    {
        name: "Diversity in Living World",
        description: "Classification and diversity of animal life",
        topics: []
    },
    {
        name: "Structural Organization in Animals",
        description: "Detailed study of animal body structures",
        topics: []
    },
    {
        name: "Cell and Cell Division",
        description: "Cellular processes and reproductive mechanisms",
        topics: []
    },
    {
        name: "Genetics and Evolution",
        description: "Principles of inheritance and evolutionary mechanisms",
        topics: []
    },
    {
        name: "Human Physiology",
        description: "Comprehensive study of human body systems",
        topics: []
    }
];

const botanyChapters = [
    {
        name: "Diversity of Living Organisms",
        description: "Classification and diversity of plant life",
        topics: []
    },
    {
        name: "Structural Organization in Plants",
        description: "Plant anatomy and morphology",
        topics: []
    },
    {
        name: "Cell Biology",
        description: "Cellular processes in plant life",
        topics: []
    },
    {
        name: "Plant Physiology",
        description: "Functional processes in plants",
        topics: []
    },
    {
        name: "Reproduction in Plants",
        description: "Reproductive mechanisms in plant kingdom",
        topics: []
    }
];

const physicsChapters = [
    {
        name: "Mechanics",
        description: "Fundamental principles of motion and forces",
        topics: []
    },
    {
        name: "Thermodynamics",
        description: "Heat, temperature, and energy transfer",
        topics: []
    },
    {
        name: "Electromagnetism",
        description: "Electrical and magnetic phenomena",
        topics: []
    },
    {
        name: "Optics",
        description: "Study of light and optical systems",
        topics: []
    },
    {
        name: "Modern Physics",
        description: "Contemporary physics concepts",
        topics: []
    }
];

const chemistryChapters = [
    {
        name: "Physical Chemistry",
        description: "Fundamental chemical principles",
        topics: []
    },
    {
        name: "Inorganic Chemistry",
        description: "Chemistry of non-carbon elements",
        topics: []
    },
    {
        name: "Organic Chemistry",
        description: "Study of carbon-based compounds",
        topics: []
    },
    {
        name: "Environmental Chemistry",
        description: "Chemical interactions in environment",
        topics: []
    }
];

const topicsByChapter = {
    "Diversity in Living World": [
        { name: "Biological Classification" },
        { name: "Five Kingdom Classification" },
        { name: "Taxonomic Hierarchy" },
        { name: "Nomenclature Systems" },
        { name: "Binomial Nomenclature" }
    ],
    "Structural Organization in Animals": [
        { name: "Animal Tissues" },
        { name: "Organ Systems" },
        { name: "Morphological Adaptations" },
        { name: "Comparative Anatomy" },
        { name: "Body Plans" }
    ],
    "Cell and Cell Division": [
        { name: "Cell Structure" },
        { name: "Mitosis" },
        { name: "Meiosis" },
        { name: "Cellular Organelles" },
        { name: "Cell Membrane Dynamics" }
    ],
    "Genetics and Evolution": [
        { name: "Mendelian Inheritance" },
        { name: "Genetic Variations" },
        { name: "Natural Selection" },
        { name: "Genetic Mutations" },
        { name: "Population Genetics" }
    ],
    "Human Physiology": [
        { name: "Digestive System" },
        { name: "Respiratory System" },
        { name: "Circulatory System" },
        { name: "Nervous System" },
        { name: "Endocrine System" }
    ],
    "Diversity of Living Organisms": [
        { name: "Plant Kingdom Classification" },
        { name: "Botanical Nomenclature" },
        { name: "Plant Diversity" },
        { name: "Algae and Fungi" },
        { name: "Bryophytes and Pteridophytes" }
    ],
    "Structural Organization in Plants": [
        { name: "Plant Tissues" },
        { name: "Root Structure" },
        { name: "Stem and Leaf Anatomy" },
        { name: "Reproductive Structures" },
        { name: "Meristematic Tissues" }
    ],
    "Cell Biology": [
        { name: "Cell Membrane" },
        { name: "Cellular Organelles" },
        { name: "Cell Metabolism" },
        { name: "Cellular Signaling" },
        { name: "Transport Mechanisms" }
    ],
    "Plant Physiology": [
        { name: "Photosynthesis" },
        { name: "Respiration" },
        { name: "Plant Growth" },
        { name: "Water and Mineral Nutrition" },
        { name: "Plant Hormones" }
    ],
    "Reproduction in Plants": [
        { name: "Sexual Reproduction" },
        { name: "Asexual Reproduction" },
        { name: "Flower Structure" },
        { name: "Pollination Mechanisms" },
        { name: "Seed Formation" }
    ],
    "Mechanics": [
        { name: "Kinematics" },
        { name: "Newton's Laws" },
        { name: "Work and Energy" },
        { name: "Rotational Motion" },
        { name: "Gravitation" }
    ],
    "Thermodynamics": [
        { name: "Heat Transfer" },
        { name: "Laws of Thermodynamics" },
        { name: "Thermal Properties" },
        { name: "Heat Engines" },
        { name: "Specific Heat Capacity" }
    ],
    "Electromagnetism": [
        { name: "Electric Charges" },
        { name: "Magnetic Fields" },
        { name: "Electromagnetic Induction" },
        { name: "Electric Circuits" },
        { name: "Electromagnetic Waves" }
    ],
    "Optics": [
        { name: "Ray Optics" },
        { name: "Wave Optics" },
        { name: "Optical Instruments" },
        { name: "Reflection and Refraction" },
        { name: "Interference and Diffraction" }
    ],
    "Modern Physics": [
        { name: "Quantum Mechanics" },
        { name: "Atomic Structure" },
        { name: "Nuclear Physics" },
        { name: "Radioactivity" },
        { name: "Particle Physics" }
    ],
    "Physical Chemistry": [
        { name: "Chemical Kinetics" },
        { name: "Thermochemistry" },
        { name: "Chemical Equilibrium" },
        { name: "Solutions" },
        { name: "Electrochemistry" }
    ],
    "Inorganic Chemistry": [
        { name: "Periodic Table" },
        { name: "Chemical Bonding" },
        { name: "Coordination Compounds" },
        { name: "Metallurgy" },
        { name: "Qualitative Analysis" }
    ],
    "Organic Chemistry": [
        { name: "Hydrocarbons" },
        { name: "Functional Groups" },
        { name: "Organic Reactions" },
        { name: "Stereochemistry" },
        { name: "Organic Synthesis" }
    ],
    "Environmental Chemistry": [
        { name: "Pollution" },
        { name: "Green Chemistry" },
        { name: "Environmental Impact" },
        { name: "Atmospheric Chemistry" },
        { name: "Water and Soil Chemistry" }
    ]
};

// @ts-ignore
app.get("/exam",async(req,res)=>{
    const subjects=await subject.find();
        const exams=await exam.find();
        const chapters=await chapter.find();
        const topics=await topic.find();
    try {
        // !for memory purpose
        const topics=await topic.find();
        await populateQuestions(topics);

        console.log('NEET Topics successfully seeded');
    } catch (error) {
        console.error('Error seeding NEET topics:', error);
    }
})

// @ts-ignore
app.get("/get_edu_data",async(req,res)=>{
    const subjects=await subject.find();
    const exams=await exam.find();
    const chapters=await chapter.find();
    const topics=await topic.find();
    
    try {

        const exams = await exam.find({})
        .populate({
          path: 'subjects',
          model: 'subjects',
          populate: [{
            path: 'chapters',
            model: 'chapters',
            populate: [{
              path: 'topics',
              model: 'topics',
            }]
          }]
        });
    

      console.log('Exam count:', exams.length);


      return res.status(200).json({edu_info:exams});
        
    } catch (error) {

        console.log("there was an error in fetching the education data",error);
        return res.status(500).send("There was an error in fetching the education data");
        
    }
})


server.listen(8080,()=>{
    connectToMongo();
    console.log('Server is running on port 8080');
});
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect } from "react";
import axios from "axios";
import {useStore} from "@/hooks/zustand";





export function Navbar() {

  const {first_name,last_name,email,id,setFirstName,setLastName,setEmail,setId}=useStore();
  console.log("here the context state in navbar is ",
    {
      first_name,last_name,email,id
    }
  )
  useEffect(()=>{
    console.log("Navbar rendered")
    const user = localStorage.getItem("user");
    if(!user){
      console.log("this is a new user needs to sign in ");
    }
    console.log("this is not a new user render his details here ")
    const getting=async ()=>{
      if(!user)return;
      const token = user.replace(/"/g, ''); // Remove any inverted commas from the token
      const response= await axios.get("http://localhost:8080/user",{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      console.log("the details of the user are ",response.data.user);
        setFirstName(response.data.user.first_name);
        setLastName(response.data.user.last_name);
        setEmail(response.data.user.email);
        setId(response.data.user.id);
    }
    getting();
  },[])
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-4xl mx-auto flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">AceMemory</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link to="#features">Features</Link>
          <Link to="#how-it-works">How It Works</Link>
          <Link to="#testimonials">Testimonials</Link>
          <Link to="#pricing">Pricing</Link>
          <Link to="#contact">Contact</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/sign-up">Sign Up</Link>
          </Button>
          

        </div>
      </div>
    </nav>
  );
}
// !need to fix i thing that is the state should remain consistent accross reloads 
// !manlo kisine refresh kiya toh chale nahi jana chahie
// !best part is to shift to redux rtk

import {create} from 'zustand';

interface StoreState{
    first_name:string,
    last_name:string,
    email:string,
    id:string,
    setFirstName:(first_name:string)=>void,
    setLastName:(last_name:string)=>void,
    setEmail:(email:string)=>void,
    setId:(id:string)=>void
}

export const useStore=create<StoreState>((set)=>({
    first_name:"",
    last_name:"",
    email:"",
    id:"",
    setFirstName:(first_name:string)=>set({first_name}),
    setLastName:(last_name:string)=>set({last_name}),
    setEmail:(email:string)=>set({email}),
    setId:(id:string)=>set({id})
}))

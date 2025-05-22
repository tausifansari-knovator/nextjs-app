"use client"
import { useState } from "react";

export const Counter =  ()=> {
    const[Counter, setCounter]= useState(0);
    
    return(
      <>
      <h1 className="font-bold text-black" > {Counter} </h1>
      <button className="bg-teal-800 rounded-sm p-3" onClick={() => setCounter(n=> n+1)}> Increment Counter</button>
      <button className="bg-teal-800 rounded-sm p-3"  onClick={() => setCounter(n=> n-1)}> Decrement Counter</button>
      </>
    );

}
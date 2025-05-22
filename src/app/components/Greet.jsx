'use client';

import { useEffect, useState } from "react";

export const Greet = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString();
    setTime(currentTime);
  }, []);

  return (
    <>
      <h1>Hello World</h1>
      <p>Current time: {time}</p>
      <div className="flex items-center justify-center h-64 w-64 bg-teal-600 font-bold"> 
        <h1 className="text-blue-950">{time}</h1>
      </div>
    </>
  );
};

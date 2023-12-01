import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

function Home() {
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [quoteObj, setQuoteObj] = useState({});

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 6 || currentHour >= 21) {
      greeting = "Good Night!";
    } else if (currentHour < 12) {
      greeting = "Good morning!";
    } else if (currentHour < 16) {
      greeting = "Good afternoon!";
    } else {
      greeting = "Good evening!";
    }
    setGreeting(greeting);
  };

  const getCurrentTime = () => {
    const currentDateTime = new Date();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const currentTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
    setCurrentTime(currentTime);
  };

  useEffect(() => {
    getGreeting();
    getCurrentTime();

    const intervalId = setInterval(() => {
      getCurrentTime();
    }, 1000 * 60); // Update time every minute

    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await axios.get("https://api.quotable.io/random");
        setQuoteObj(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getQuote();

  },[])
  

  return (
    <div className="flex font-mono">
      <Header />
      <div className="flex-grow bg-dotted-spacing-9 bg-dotted-gray-400">
        <div className="flex justify-start items-end h-screen p-2">
          <div className="flex-col space-y-2 mb-4 ml-4">
            <h1 className="text-2xl font-medium">{greeting} {localStorage.getItem('username')}</h1>
            <p className="text-5xl font-semibold">{currentTime}</p>

              <p className="text-xl">
                {quoteObj?.content}
              </p>
              <p className="text-lg">- {quoteObj?.author}</p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
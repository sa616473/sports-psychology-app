"use client";
import { useState, useEffect } from 'react';
import {useSearchParams } from 'next/navigation';
import { open as openEmbed } from "@play-ai/web-embed";
import djokovic from "../public/images/djokovic.jpg";
import federer from "../public/images/federer.jpg"
import nadal from "../public/images/nadal.jpg";
import Image from 'next/image';
import Sentiment from 'sentiment';
import Header from '../components/Header';
import Link from 'next/link';
import axios from 'axios';
import { getAuth } from "firebase/auth";
import { Suspense } from 'react';
import { useUserInput } from '../components/UserInputContext';
import ProtectedRoute from '../components/ProtectedRoute';






type TherapistName = "Novak Djokovic" | "Rafael Nadal" | "Roger Federer";

const ChatPage = () => {
  const searchParams = useSearchParams();
  const therapist = searchParams.get('therapist') as TherapistName | ""; // Get the therapist and mood from the query params
  const sentiment = new Sentiment();


  // State to store the selected webEmbedId and prompt
  const [webEmbedId, setWebEmbedId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [text, setText] = useState("Change this text");
  const { userInput } = useUserInput();

  const therapistImages  = {
    "Novak Djokovic": djokovic,
    "Rafael Nadal": nadal,
    "Roger Federer": federer,
  };

  const therapistImage = therapist ? therapistImages[therapist] : "";


  const events = [
    {
      name: "change-text",
      when: "The user says what they want to change the text on the screen to",
      data: {
        text: { type: "string", description: "The text to change to" },
      },
    },
  ] as const;

  const onEvent = async (event: any) => {
    console.log("onEvent: ", event);
    if (event.name === "change-text") {
      const text = event.data.text;
      setText(text);
  
      // Get the currently logged-in user's ID
      const auth = getAuth();
      const currentUser = auth.currentUser;
  
      // Check if the user is logged in
      if (!currentUser) {
        console.error("No user is logged in");
        return;
      }
  
      const userId = currentUser.uid; // Get the userId (UID) of the logged-in user
      console.log("Logged-in user ID:", userId);
  
      // Perform sentiment analysis
      const analysis = sentiment.analyze(text);
      console.log("Sentiment analysis result: ", analysis);
  
      // Prepare the data for the API request
      const analysisData = {
        score: analysis.score,
        comparative: analysis.comparative,
        calculation: analysis.calculation.map((item: any) => {
          const [word, score] = Object.entries(item)[0]; // Get the first (and only) key-value pair
          return {
            word,
            score,
          };
        }),
        tokens: analysis.tokens,
        positive: analysis.positive,
        negative: analysis.negative,
        timestamp: new Date().toISOString(),
      };
  
      // Make a POST request to the API
      try {
        const response = await axios.post("https://api-x2eecmbifa-uc.a.run.app/addUserConversationAnalysis", {
          userId,
          analysisData,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        console.log("API response:", response.data);
      } catch (error) {
        console.error("Error making API request:", error);
      }
    }
  };

  // Mapping of therapists to their respective webEmbed IDs
  const therapistToEmbedId: Record<TherapistName, string>  = {
    "Novak Djokovic": "QeyjD6TiM723I4AJBnHaE",
    "Rafael Nadal": "w4ulsZRccwCCDI_N0AHlY",
    "Roger Federer": "aln2QYW1mCBoQW9X3EHvo",
  };

  // useEffect to set the webEmbedId and prompt when therapist and mood change
  useEffect(() => {
    if (therapist && therapist in therapistToEmbedId) {
      setWebEmbedId(therapistToEmbedId[therapist]);

    //   const greeting = "Hello Saitejas, this is roger, I am your personal therapist today!"

      let updatedPrompt = `
                        You are job is to act as my therapist. 
                        Currently This is what is going through my head. ${userInput}.
                        once the conversation is over update the "change-text" with the user conversation. 
                        Call "change-text" IMMEDIATELY after the conversation is over`;

      setPrompt(updatedPrompt);  // Set the updated prompt

      if (webEmbedId) {
        openEmbed(webEmbedId, {
            events,
            onEvent,
            prompt,
        });  // Opens the web embed for the selected therapist
      }
    }
  }, [webEmbedId, therapist]);



  return (
    <ProtectedRoute>
    <Suspense fallback={<div>Loading...</div>}>

    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200">
       <Header></Header>
    
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 text-center flex flex-col justify-center items-center">
    <div className="w-64 h-96 mx-auto rounded-lg overflow-hidden mb-4">

      {/* Display therapist image */}
        <Image
          src={therapistImage}
          alt={therapist}
          width={256} // Provide a width and height when using the Image component
          height={256}
          className="object-cover w-full h-full"
        />
        </div>

      
      <h4 className="text-3xl font-bold mb-4">Chat with</h4>
      {/* <p className="text-xl mt-4 italic">{userInput}</p> */}
      <div className="p-6 text-center">
        <h4 className="mb-1 text-xl font-semibold text-slate-800">
            {therapist}
            </h4>
        </div>

    </div>
    </div>
      </Suspense>
      </ProtectedRoute>
  );

};

export default function ChatPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPage />
    </Suspense>
  );
}

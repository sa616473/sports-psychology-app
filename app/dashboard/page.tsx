"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { auth } from "../firebase/firebase"; // Adjust the path to your Firebase config
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

interface Calculation {
  word: string;
  score: number;
}

interface Conversation {
  id: string;
  userId: string;
  score: number;
  comparative: number;
  calculation: Calculation[];
  tokens: string[];
  positive: string[];
  negative: string[];
  timestamp: string;
}


interface UserData {
    user: {
        userId: string;
        name: string;
        email: string;
        userConversationAnalysisIds: string[];
    }
  }

const Dashboard: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);


  useEffect(() => {
    // Listen to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid); // Fetch the user's data including conversation IDs
      } else {
        setUser(null);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
        console.log(userId)
      const response = await axios.post<UserData>(
        "https://api-x2eecmbifa-uc.a.run.app/getUserById", // Replace with your actual endpoint
        {
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUserData(response.data);
      console.log(response.data)
      console.log("print ddd")
      console.log(userData)
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Error fetching user data");
    }
  };


  // Fetch conversations data
  useEffect(() => {
    const fetchData = async () => {
        console.log("printing here xyz")
        console.log(userData)
        if (userData && userData.user.userConversationAnalysisIds.length > 0) {
      try {
        const response = await axios.post("https://api-x2eecmbifa-uc.a.run.app/getConversationsByIds", {
          conversationIds: userData.user.userConversationAnalysisIds
        });
        setConversations(response.data.conversations);
      } catch (err) {
        console.log(err)
        setError("Error fetching data");
      }
    }
    };
    fetchData();
  }, [userData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 mx-auto p-6">
        <Header></Header>
      <h1 className="text-3xl font-bold mb-6 text-center">Conversation Dashboard</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">Score</th>
              <th className="py-2 px-4 border-b">Comparative</th>
              <th className="py-2 px-4 border-b">Positive Words</th>
              <th className="py-2 px-4 border-b">Negative Words</th>
              <th className="py-2 px-4 border-b">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {conversations.map((conversation) => (
              <tr key={conversation.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{conversation.id}</td>
                <td className="py-2 px-4 border-b">{conversation.userId}</td>
                <td className="py-2 px-4 border-b">{conversation.score}</td>
                <td className="py-2 px-4 border-b">{conversation.comparative}</td>
                <td className="py-2 px-4 border-b">{conversation.positive.join(", ")}</td>
                <td className="py-2 px-4 border-b">{conversation.negative.join(", ")}</td>
                <td className="py-2 px-4 border-b">{new Date(conversation.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <h2 className="font-semibold text-lg">Conversation ID: {conversation.id}</h2>
            <p>User ID: {conversation.userId}</p>
            <p>Score: {conversation.score}</p>
            <p>Comparative: {conversation.comparative}</p>
            <p>Positive Words: {conversation.positive.join(", ")}</p>
            <p>Negative Words: {conversation.negative.join(", ")}</p>
            <p>Timestamp: {new Date(conversation.timestamp).toLocaleString()}</p>
            
            <h3 className="font-semibold mt-2">Detailed Calculation:</h3>
            <ul className="list-disc list-inside">
              {conversation.calculation.map((calc, index) => (
                <li key={index}>
                  Word: <span className="font-semibold">{calc.word}</span>, Score: {calc.score}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

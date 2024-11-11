"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { auth } from "../firebase/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Suspense } from 'react';
import Modal from "../components/Modal";
import ProtectedRoute from "../components/ProtectedRoute";


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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);



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
    } catch (err) {
      setError("Error fetching user data");
    }
  };


  // Fetch conversations data
  useEffect(() => {
    const fetchData = async () => {

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

  const openModal = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedConversation(null);
    setIsModalOpen(false);
  };

  return (
    <ProtectedRoute>
    <Suspense fallback={<div>Loading...</div>}>

    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 mx-auto p-6">
        <Header></Header>
      <h1 className="text-3xl font-bold mb-6 text-center">NLP Analysis Dashboard</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
          <div
          className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
  <table className="w-full text-left table-auto min-w-max">
    <thead>
      <tr>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-lg antialiased font-normal leading-none text-blue-gray-900 opacity-70">
          Score
          </p>
        </th>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-lg antialiased font-normal leading-none text-blue-gray-900 opacity-70">
          Comparative Score
          </p>
        </th>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-lg antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Positive Words
          </p>
        </th>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-lg antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Negative Words
          </p>
        </th>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-lg antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Time (MM/DD/YYYY)
          </p>
        </th>
      </tr>
    </thead>
    <tbody></tbody>
          <tbody>
            {conversations.map((conversation) => (
              <tr 
              key={conversation.id}
              onClick={() => openModal(conversation)} 
              className="hover:bg-gray-100"
              >
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

      {/* Modal for Detailed Calculation */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
          {selectedConversation && (
            <>
              <h6 className="font-bold text-lg mb-4">Detailed Calculation </h6>
              {/* <p className="font-italic text-lg mb-4">{selectedConversation.timestamp}</p> */}
              <ul className="list-disc list-inside">
                {selectedConversation.calculation.map((calc, index) => (
                  <li key={index}>
                    Word: <span className="font-semibold">{calc.word}</span>, Score: {calc.score}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Modal>
    </div>
    </Suspense>
    </ProtectedRoute>
  );
};

export default Dashboard;

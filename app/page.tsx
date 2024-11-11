"use client";

// app/page.tsx
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import { Suspense, useEffect, useState } from 'react';
import { FaRegHeart, FaHeadphones, FaUserClock } from 'react-icons/fa';
import Modal from './components/Modal';
import SignUpForm from './components/SignUpForm';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase/firebase';
import LoginForm from './components/LoginForm';

const HomePage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => setIsModalOpen(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [user, setUser] =  useState<User | null>(null);;




  const openLoginModal = () => {
    setIsLogin(true);
    setIsModalOpen(true);
  };

  const openSignupModal = () => {
    setIsLogin(false);
    setIsModalOpen(true);
  };
  useEffect(() => {
    // Listen to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 text-black">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <section className="text-center py-20 px-4 bg-gradient-to-b from-white to-blue-100">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">Experience Therapy Like Never Before</h1>
          <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
            Using AI-powered deep fake technology, we recreate the voices of professional therapists to help you feel supported and understood anytime, anywhere.
          </p>
          <button 
            onClick={openSignupModal}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Get Started
          </button>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-white text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            <div className="flex-1 bg-blue-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">1. Describe your feelings </h3>
              <p className="text-gray-600">Share your thoughts and feelings freely, just as you would with a trusted friend.</p>
            </div>
            <div className="flex-1 bg-blue-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">2. Choose Your Therapist Voice</h3>
              <p className="text-gray-600">Select from a set of comforting, professional voices that make you feel at ease</p>
            </div>
            <div className="flex-1 bg-blue-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">3. Start Talking</h3>
              <p className="text-gray-600">Our AI listens and responds in real-time, providing compassionate support tailored to you.</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-blue-100 to-green-100 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8">Why Choose AI-Powered Therapy?</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            <div className="flex-1 p-6 rounded-lg shadow-lg bg-white">
              <FaUserClock className="text-4xl text-green-500 mx-auto mb-4"/>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">24/7 Availability</h3>
              <p className="text-gray-600">Talk whenever you need support, even outside traditional therapy hours.</p>
            </div>
            <div className="flex-1 p-6 rounded-lg shadow-lg bg-white">
              <FaHeadphones className="text-4xl text-green-500 mx-auto mb-4"/>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Familiar Voices</h3>
              <p className="text-gray-600">Choose a voice that makes you feel comfortable, bringing a sense of familiarity and security.</p>
            </div>
            <div className="flex-1 p-6 rounded-lg shadow-lg bg-white">
              <FaRegHeart className="text-4xl text-green-500 mx-auto mb-4"/>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Personalized Guidance</h3>
              <p className="text-gray-600">Our AI adapts responses to provide relevant, empathetic support tailored to your needs.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-green-100 to-blue-200 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-lg text-gray-600 mb-8">Experience the power of AI therapy and find the support you need, whenever you need it.</p>
          <button 
            onClick={openSignupModal}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 text-lg"
          >
            Start Now
          </button>
        </section>

        {/* Footer */}
        <footer className="py-10 px-4 bg-gray-800 text-center text-white">
          <p>&copy; 2024 Therapy AI. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
          </div>
        </footer>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
                {isLogin ? (
                  <LoginForm onSignupClick={openSignupModal} />) :( 
                  <SignUpForm onLoginClick={openLoginModal}/>)}
      </Modal>
    </Suspense>
  );
};

export default HomePage;

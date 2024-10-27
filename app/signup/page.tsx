"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { auth } from "../firebase/firebase";
import axios from 'axios';
import Header from '../components/Header';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      const response = await axios.post('https://api-x2eecmbifa-uc.a.run.app/createUser', {
        userId: userCredential.user.uid,
        email: userCredential.user.email,
        name: formData.name,
      });

      if (response.status === 201) {
        console.log("User registered:", userCredential.user);
        router.push('/');
      } else {
        setError("An error occurred during registration.");
      }

    } catch (err: any) {
      console.error("Error during registration:", err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200">
    <Header></Header>

    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 text-center flex flex-col justify-center items-center">
      
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-gray-800">Join Us Today</h2>
          <p className="text-lg font-normal text-blue-gray-600">Enter your email and password to register.</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full">
          <div className="mb-4 flex flex-col gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the <a href="#" className="underline">Terms and Conditions</a>
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register Now
          </button>

          
          <p className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <a href="/login" className="text-gray-900 ml-1 underline">Sign in</a>
          </p>
        </form>
      </div>
      </div>
    </div>
    </div>
  );
}

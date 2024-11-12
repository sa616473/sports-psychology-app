"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { auth } from "../firebase/firebase";
import axios from 'axios';
import Header from './Header';
import { Suspense } from 'react';
import { Input, Button, Typography, Alert, } from "@material-tailwind/react";



interface FormData {
  name: string;
  email: string;
  password: string;
}

interface SignUpFormProps {
  onLoginClick: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({onLoginClick}) => {
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
        router.push('/feeling');
      } else {
        setError("An error occurred during registration.");
      }

    } catch (err: any) {
      console.error("Error during registration:", err);
      setError(err.message);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>

      
      <div className="w-full max-w-md p-8 bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-gray-800">Create an account</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full">
          <div className="mb-4 flex flex-col gap-6">
            <div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder='Name@mail.com'
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow"
              />
            </div>
          
          
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register Now
          </button>

                </div>
                <Typography variant='paragraph' color="blue-gray" className="text-center mt-4" 
          placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Already have an account?
            <button
          type="button"
          onClick={onLoginClick}
          className="text-gray-900 ml-1 underline"
        >Sign in
        </button>
        </Typography>
        </form>
      </div>
      </div>
    </Suspense>
  );
}

export default SignUpForm;

"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Suspense } from 'react';
import { Input, Button, Typography, Alert, } from "@material-tailwind/react";

// Define the structure of form data
interface FormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSignupClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSignupClick }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Handle input change with proper typing
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission with proper typing
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      console.log("User signed in:", user);
      router.push("/feeling");
    } catch (err: any) {
      console.error("Error signing in:", err);
      setError(err.message);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>

<div className="w-full max-w-md p-8 bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-gray-800">Welcome Back</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
        
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
              Log in
              </button>
          </form>
          <Typography variant='paragraph' color="blue-gray" className="text-center mt-4" 
          placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Do not have an account?
            <button
              type="button"
              onClick={onSignupClick}
              className="text-blue-500 ml-1 underline"
            >
              Register
            </button>
          </Typography>
        </div>
      </div>
    </Suspense>
  );
}

export default LoginForm;

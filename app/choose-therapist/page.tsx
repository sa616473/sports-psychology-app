/* eslint-disable @next/next/no-img-element */
// app/choose-therapist.tsx
"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import djokovic from "../public/images/djokovic.jpg";
import federer from "../public/images/federer.jpg"
import nadal from "../public/images/nadal.jpg";

import Header from '../components/Header';
import { Suspense } from 'react';



const therapists = [
  { name: 'Novak Djokovic', imageUrl: djokovic, description:"This therapist is super chatty and configured For casual laid-back conversations, like you are talking to a friend."  },
  { name: 'Roger Federer', imageUrl: federer, description: "This therapist is configured to assume and impersonate identity."},
  { name: 'Rafael Nadal', imageUrl: nadal, description:"This therapist is configured to be more polite, formal, staying on task, and assisting." },
];

const TherapistSelectionPage = () => {
  const router = useRouter();

  const handleTherapistSelection = (therapist: string) => {
    // alert(`You selected ${therapist}'s voice for ${mood} mood`);
    // You can handle further logic here (e.g., redirect to a chat)
    router.push(`/chat?therapist=${therapist}`);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>

    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 text-black">
      <Header></Header>

      <div className="text-center my-16">
        <p className="text-xl mt-4">Choose the therapist you want to talk to:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
        {therapists.map((therapist) => (
          <div
            key={therapist.name}
            className="p-10 bg-white rounded-lg text-center cursor-pointer text-white"
            onClick={() => handleTherapistSelection(therapist.name)}
          >
          <div className="w-full max-w-xs mx-auto rounded-lg overflow-hidden mb-4">

          <Image
          src={therapist.imageUrl}
          alt={therapist.name}
          width={256} // Provide a width and height when using the Image component
          height={256}
          className="object-cover w-full h-full"
        />
        </div>
        <div className="p-6 text-center">
        <h4 className="mb-1 text-xl font-semibold text-slate-800">
            {therapist.name}
        </h4>
        <p className="text-base text-slate-600 mt-4 font-light ">
          {therapist.description}
        </p>
        </div>
            <div className="flex justify-center p-6 pt-2 gap-7">
              <button className="min-w-32  rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Suspense>
  );
};

export default function TherapistSelectionPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TherapistSelectionPage/>
    </Suspense>
  );
}

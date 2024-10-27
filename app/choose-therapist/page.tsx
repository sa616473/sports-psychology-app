/* eslint-disable @next/next/no-img-element */
// app/choose-therapist.tsx
"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import djokovic from "../public/images/djokovic.jpg";
import federer from "../public/images/federer.jpg"
import nadal from "../public/images/nadal.jpg";

import Header from '../components/Header';


const therapists = [
  { name: 'Novak Djokovic', imageUrl: djokovic },
  { name: 'Roger Federer', imageUrl: federer },
  { name: 'Rafael Nadal', imageUrl: nadal},
];

const TherapistSelectionPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mood  = searchParams.get('mood');  // Get the mood from the query params

  const handleTherapistSelection = (therapist: string) => {
    alert(`You selected ${therapist}'s voice for ${mood} mood`);
    // You can handle further logic here (e.g., redirect to a chat)
    router.push(`/chat?therapist=${therapist}&mood=${mood}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 text-black">
      <Header></Header>

      <div className="text-center my-16">
        <h2 className="text-4xl font-bold">You are feeling {mood}</h2>
        <p className="text-xl mt-4">Choose the therapist you want to talk to:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
        {therapists.map((therapist) => (
          <div
            key={therapist.name}
            className="p-10 bg-gray-800 rounded-lg text-center cursor-pointer text-white"
            onClick={() => handleTherapistSelection(therapist.name)}
          >
                    <Image
          src={therapist.imageUrl}
          alt={therapist.name}
          width={128} // Provide a width and height when using the Image component
          height={128}
          className="rounded-full mx-auto mb-4"
        />
            <h3 className="text-2xl font-bold mb-4">{therapist.name}</h3>
            <button className="bg-white text-black px-4 py-2 rounded">Select</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistSelectionPage;

"use client";

// app/page.tsx
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import { useState, Suspense, FormEvent } from 'react';
import { useUserInput } from '../components/UserInputContext';
import ProtectedRoute from '../components/ProtectedRoute';


const FeelingPage = () => {
  const router = useRouter();
  const { setUserInput } = useUserInput();
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    setError(null); // Clear any previous error when typing
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!input.trim()) {
      setError('Please share how you are feeling.');
      return;
    }

    // Pass the user input as a query parameter
    setUserInput(input);
    router.push(`/choose-therapist`);
  };

  return (
    <ProtectedRoute>
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 text-black">
        {/* Header */}
        <Header />

        {/* Main */}
        <div className="text-center my-16">
          <h2 className="text-4xl font-bold">How are you feeling today?</h2>
          <p className="text-xl mt-4">Type out how you are feeling, and we will help you find the right support.</p>
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Describe your feelings here..."
            value={input}
            onChange={handleInputChange}
            className="w-full p-4 text-lg border rounded-lg mb-4 outline-none focus:border-blue-400"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
          type="submit"
            // onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
        </form>
      </div>
    </Suspense>
    </ProtectedRoute>
  );
};

export default FeelingPage;


/*
// Function to persist and restore global state
const saveState = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const loadState = (key: string, defaultValue: any) => {
  if (typeof window !== "undefined") {
    const savedValue = localStorage.getItem(key);
    
    return savedValue ? JSON.parse(savedValue) : defaultValue;
  }
  return defaultValue;
};

export default function Home() {
  // Load state from localStorage (default to Roger if none is saved)
  const [currentEmbedId, setCurrentEmbedId] = useState(() => 
    loadState("currentEmbedId", webEmbedIdRoger)
  );

  
  const [text, setText] = useState(() =>
    loadState("text", "Hey It's me Roger Federer! Come share your thoughts with me!")
  );

  useEffect(() => {
    // Persist the state when currentEmbedId or text changes
    saveState("currentEmbedId", currentEmbedId);
    saveState("text", text);

    // Initialize the Play.ai embed session
    const embedContainer = document.getElementById("embed-container");

    if (embedContainer) {
      embedContainer.innerHTML = "";  // Clear previous embed
    }

    openEmbed(currentEmbedId);  // Open a new embed session based on the state
  }, [currentEmbedId, text]);  // Run when state changes

  const handleEmbedChange = (embedId: string, newText: string) => {
    // Update state
    setCurrentEmbedId(embedId);
    setText(newText);

    // Refresh the window to simulate a new session, state will be persisted
    window.location.reload();
  };
*/

"use client";

// app/page.tsx
import { useRouter } from 'next/navigation';
import Header from './components/Header';


const moods = [
  { name: 'Happy', description: 'We are here on your achievments', bgColor: 'bg-green-500' },
  { name: 'Sad', description: "Share with us about what's bringing you down", bgColor: 'bg-blue-500' },
  { name: 'Angry', description: "Don't let anger burn you!", bgColor: 'bg-red-500' },
];

const HomePage = () => {
  const router = useRouter();

  const handleMoodSelection = (mood: string) => {
    router.push(`/choose-therapist?mood=${mood}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 text-black">
      {/* Header */}
      <Header />

      {/* Main */}
      <div className="text-center my-16">
        <h2 className="text-4xl font-bold">How are you feeling today?</h2>
        <p className="text-xl mt-4">Choose your mood</p>
      </div>

      {/* Mood Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 text-white">
        {moods.map((mood) => (
          <div
            key={mood.name}
            className={`p-10 rounded-lg ${mood.bgColor} text-center cursor-pointer`}
            onClick={() => handleMoodSelection(mood.name)}
          >
            <h3 className="text-2xl font-bold mb-4">{mood.name}</h3>
            <p className="text-lg mb-4">{mood.description}</p>
            <button className="bg-white text-black px-4 py-2 rounded">Select</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

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

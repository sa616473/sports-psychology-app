"use client";

import { useEffect, useState } from "react";
import { open as openEmbed } from "@play-ai/web-embed";

// Replace with your web embed IDs
const webEmbedIdNovak = "QeyjD6TiM723I4AJBnHaE";
const webEmbedIdRafa = "w4ulsZRccwCCDI_N0AHlY";
const webEmbedIdRoger = "aln2QYW1mCBoQW9X3EHvo";

// Function to persist and restore global state
const saveState = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadState = (key, defaultValue) => {
  const savedValue = localStorage.getItem(key);
  return savedValue ? JSON.parse(savedValue) : defaultValue;
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

  const handleEmbedChange = (embedId, newText) => {
    // Update state
    setCurrentEmbedId(embedId);
    setText(newText);

    // Refresh the window to simulate a new session, state will be persisted
    window.location.reload();
  };

  return (
    <>
    <div id="embed-container" className="w-full h-full"></div>

      <div className="flex flex-col justify-center items-center h-[70vh]">
        <div className="font-medium text-2xl mb-4">{text}</div>

        {/* Embed container */}

        <div className="flex space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleEmbedChange(webEmbedIdNovak, "Hey, It's me Novak Djokovic! Let's chat!")}
          >
            Novak Djokovic
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => handleEmbedChange(webEmbedIdRafa, "Hi, Rafael Nadal here! What do you want to discuss?")}
          >
            Rafael Nadal
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => handleEmbedChange(webEmbedIdRoger, "Hey It's me Roger Federer! Come share your thoughts with me!")}
          >
            Roger Federer
          </button>
        </div>
      </div>
    </>
  );
}

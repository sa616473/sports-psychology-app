import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// import { getAnalytics } from 'firebase/analytics'; // Uncomment if needed

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw8VK8fwZ3j-F37soWqOwmVMnpUriPAd0",
  authDomain: "sports-psychology-73806.firebaseapp.com",
  projectId: "sports-psychology-73806",
  storageBucket: "sports-psychology-73806.appspot.com",
  messagingSenderId: "385413346956",
  appId: "1:385413346956:web:f36b18d6cb102ce346ada9",
  measurementId: "G-NHEJKJJ67B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app); // Uncomment if needed

export { db, auth };

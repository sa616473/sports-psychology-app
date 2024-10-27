import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth'; // Import Firebase Auth
import { auth } from '../firebase/firebase'; // Adjust the path based on your setup
import { useEffect, useState } from 'react';


const Header = () => {
  const [user, setUser] =  useState<User | null>(null);;
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');


  useEffect(() => {
    // Listen to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login'); // Redirect to login page after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="text-black p-4">
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">
            Sports Psychology App
          </Link>
        </div>
        <div className="space-x-6">
          {/* Show Dashboard and Logout if user is signed in */}
          {user ? (
            <>
              <Link href="/dashboard" className="bg-white text-green-700 px-4 py-2 rounded">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            // Show Login and Register if user is not signed in
            <>
              <Link href="/login" className="bg-white text-green-700 px-4 py-2 rounded">
                Login
              </Link>
              <Link href="/signup" className="bg-white text-green-700 px-4 py-2 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

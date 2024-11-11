import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import Modal from './Modal';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const openLoginModal = () => {
    setIsLogin(true);
    setIsModalOpen(true);
  };

  const openSignupModal = () => {
    setIsLogin(false);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
      setIsLogin(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <header className="p-4 bg-blue-100">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link href={user ? "/feeling" : "/"}>
              Therapist AI
            </Link>
          </div>


          {/* Links for Larger Screens */}
          <div className="flex flex-col md:flex-row md:flex space-y-4 md:space-y-0 md:space-x-6 items-center  md:block">
            {user ? (
              <>
                <Link href="/dashboard" className="bg-white rounded-full py-2 px-4 text-sm text-slate-600 hover:bg-slate-800 hover:text-white transition">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 rounded-full py-2 px-4 text-sm text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={openLoginModal}
                  className="bg-white text-green-700 rounded-full py-2 px-4 text-sm transition shadow-sm hover:bg-slate-800 hover:text-white"
                >
                  Log in
                </button>
                <button
                  onClick={openSignupModal}
                  className="bg-white text-green-700 rounded-full py-2 px-4 text-sm transition shadow-sm hover:bg-slate-800 hover:text-white"
                >
                  Sign up
                </button>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                  {isLogin ? (
                    <LoginForm onSignupClick={openSignupModal} />
                  ) : (
                    <SignUpForm onLoginClick={openLoginModal} />
                  )}
                </Modal>
              </>
            )}
          </div>
        </nav>
      </header>
    </Suspense>
  );
};

export default Header;

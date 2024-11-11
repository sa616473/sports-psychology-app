// app/components/ProtectedRoute.tsx
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // If the user is not logged in and loading has finished, redirect to login
      router.push('/');
    }
  }, [user, loading, router]);

  // Show loading state or children if user is logged in
  if (loading || !user) return <div>Loading...</div>;

  return <>{children}</>;
};

export default ProtectedRoute;

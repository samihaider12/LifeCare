import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../DataBase/fireBase'; // Aapka firebase config file
import { onAuthStateChanged, type User } from "firebase/auth";
import { useState, useEffect } from 'react';

const ProtectedRoute = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>; // Ya koi spinner laga dein

  // Agar user nahi hai toh login page par bhej dein
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { registerUser, signIn } from '../api/auth';

interface AuthContextType {
  user: string | null;
  loading: boolean;
  error: string | null;
  signUpUser: (name: string, email: string, password: string) => Promise<void>;
  signInUser: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  success: boolean;
  resetStatus: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if(!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: {children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signUpUser = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const userData = await registerUser(name, email, password);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setSuccess(true);
    } catch (error) {
      setError(error as string)
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const signInUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const userData = await signIn(email, password);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setSuccess(true);
    } catch (error) {
      setError(error as string)
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetStatus = () => {
    setError(null);
    setSuccess(false);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signUpUser, signInUser, signOut, success, resetStatus }}>
      {children}
    </AuthContext.Provider>
  );
}
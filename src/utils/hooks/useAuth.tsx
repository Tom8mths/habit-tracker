import { createContext, useState, useContext, useEffect } from 'react';
import { registerUser, signIn } from '../api/auth';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  error: string | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signInUser: (email: string, password: string) => Promise<void>;
  signOut: () => void;
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
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await registerUser(name, email, password);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
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
    try {
      const userData = await signIn(email, password);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      setError(error as string)
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signUp, signInUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
import { createContext, useState, useContext } from 'react';
import { registerUser } from '../api/auth';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  error: string | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signUp(name: string, email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await registerUser(name, email, password);
      return response;
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }

  return { signUp, loading, error }
}
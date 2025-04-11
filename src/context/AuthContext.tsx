import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  auth,
  signInWithGoogleFirebase,
  signOutFirebase,
  signUpWithEmailAndPasswordFirebase,
  signInWithEmailAndPasswordFirebase,
} from '@/firebase';

interface AuthContextType {
  user: User | null | undefined;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  signUpWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  signUpWithEmailAndPassword: async () => {},
  signInWithEmailAndPassword: async () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser === undefined) {
        setLoading(true);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    await signInWithGoogleFirebase();
  };

  const signUpWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    await signUpWithEmailAndPasswordFirebase(email, password);
  };

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    await signInWithEmailAndPasswordFirebase(email, password);
  };

  const signOut = async () => {
    await signOutFirebase();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signOut,
        signUpWithEmailAndPassword,
        signInWithEmailAndPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

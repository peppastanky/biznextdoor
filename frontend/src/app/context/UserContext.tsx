import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { auth } from "../lib/firebase";

interface User {
  id: string;
  username: string;
  type: "customer" | "business";
  email: string;
  businessName?: string;
  wallet?: number;
  bank?: number;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateWallet: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function firebaseUserToAppUser(firebaseUser: FirebaseUser, overrides?: Partial<User>): User {
  return {
    id: firebaseUser.uid,
    username: overrides?.username || firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "user",
    email: firebaseUser.email || "",
    type: overrides?.type || "customer",
    businessName: overrides?.businessName,
    wallet: overrides?.type === "customer" ? (overrides?.wallet ?? 500) : undefined,
    bank: overrides?.type === "business" ? (overrides?.bank ?? 167) : undefined,
  };
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Restore any saved type/username from localStorage
        const saved = localStorage.getItem(`userMeta_${firebaseUser.uid}`);
        const meta = saved ? JSON.parse(saved) : {};
        setUser(firebaseUserToAppUser(firebaseUser, meta));
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = (userData: User) => {
    // Save extra meta (type, username, businessName) to localStorage keyed by uid
    localStorage.setItem(`userMeta_${userData.id}`, JSON.stringify({
      type: userData.type,
      username: userData.username,
      businessName: userData.businessName,
      wallet: userData.wallet,
      bank: userData.bank,
    }));
    setUser(userData);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const updateWallet = (amount: number) => {
    if (user) {
      if (user.type === "customer") {
        setUser({ ...user, wallet: (user.wallet || 0) + amount });
      } else {
        setUser({ ...user, bank: (user.bank || 0) + amount });
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout, updateWallet }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

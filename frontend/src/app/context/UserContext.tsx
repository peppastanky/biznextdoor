import { createContext, useContext, useState, ReactNode } from "react";

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
  login: (user: User) => void;
  logout: () => void;
  updateWallet: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
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
    <UserContext.Provider value={{ user, login, logout, updateWallet }}>
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

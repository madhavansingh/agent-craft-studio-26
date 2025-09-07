import React, { createContext, useContext, useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';

interface User {
  id: string;
  email: string;
  name: string;
  plan: string;
  usedAgents: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signOut: () => void;
  addUsedAgent: (agentId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('agentHub_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('agentHub_users') || '[]');
      const user = storedUsers.find((u: any) => u.email === email);
      
      if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
        return false;
      }

      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        usedAgents: user.usedAgents || []
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('agentHub_user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('agentHub_users') || '[]');
      
      if (storedUsers.find((u: any) => u.email === email)) {
        return false; // User already exists
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = {
        id: Date.now().toString(),
        email,
        name,
        hashedPassword,
        plan: 'Free Plan',
        usedAgents: []
      };

      storedUsers.push(newUser);
      localStorage.setItem('agentHub_users', JSON.stringify(storedUsers));

      const userData = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        plan: newUser.plan,
        usedAgents: newUser.usedAgents
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('agentHub_user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('agentHub_user');
  };

  const addUsedAgent = (agentId: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      usedAgents: [...new Set([agentId, ...user.usedAgents])]
    };

    setUser(updatedUser);
    localStorage.setItem('agentHub_user', JSON.stringify(updatedUser));

    // Update stored users as well
    const storedUsers = JSON.parse(localStorage.getItem('agentHub_users') || '[]');
    const updatedUsers = storedUsers.map((u: any) =>
      u.id === user.id ? { ...u, usedAgents: updatedUser.usedAgents } : u
    );
    localStorage.setItem('agentHub_users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      signIn,
      signUp,
      signOut,
      addUsedAgent
    }}>
      {children}
    </AuthContext.Provider>
  );
};
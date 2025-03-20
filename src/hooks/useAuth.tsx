
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Create a mock user for demonstration
const mockUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(r => setTimeout(r, 1000));
      
      // For demo, just check if email is admin@example.com and password is 'admin'
      if (email === 'admin@example.com' && password === 'admin') {
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        navigate('/dashboard');
        toast({
          title: 'Login realizado com sucesso',
          description: `Bem-vindo, ${mockUser.name}!`,
        });
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      toast({
        title: 'Erro de autenticação',
        description: error instanceof Error ? error.message : 'Falha no login',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(r => setTimeout(r, 1000));
      
      // For demo, create a new user and log them in
      const newUser: User = {
        id: '2',
        name,
        email,
        role: 'user',
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/dashboard');
      
      toast({
        title: 'Conta criada com sucesso',
        description: `Bem-vindo, ${name}!`,
      });
    } catch (error) {
      toast({
        title: 'Erro no cadastro',
        description: error instanceof Error ? error.message : 'Falha no registro',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
    toast({
      title: 'Logout realizado',
      description: 'Você foi desconectado com sucesso.',
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(r => setTimeout(r, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        toast({
          title: 'Perfil atualizado',
          description: 'Suas informações foram atualizadas com sucesso.',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro na atualização',
        description: error instanceof Error ? error.message : 'Falha ao atualizar perfil',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ user, login, register, logout, loading, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

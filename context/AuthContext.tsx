import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);


  // useEffect(() => {
  //   const loadUser = async () => {
  //     const savedUser = await AsyncStorage.getItem('user');
  //     if (savedUser) setUser(savedUser);
  //   };
  //   loadUser();
  // }, []);

  const login = async (email: string) => {
    setUser(email);
    await AsyncStorage.setItem('user', email);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

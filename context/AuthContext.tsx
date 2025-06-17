import React, {
  createContext,
  useState,
  ReactNode,
  useContext
} from 'react';

type AuthContextType = {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

<<<<<<< HEAD
  const login = (email: string) => {
=======

  // useEffect(() => {
  //   const loadUser = async () => {
  //     const savedUser = await AsyncStorage.getItem('user');
  //     if (savedUser) setUser(savedUser);
  //   };
  //   loadUser();
  // }, []);

  const login = async (email: string) => {
>>>>>>> eb44e1fa93b025aa9fca562687043e51073c8252
    setUser(email);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

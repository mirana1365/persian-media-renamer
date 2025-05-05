
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // در یک برنامه واقعی، اینجا باید توکن را از localStorage بررسی کنید و اطلاعات کاربر را از API دریافت کنید
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // در یک برنامه واقعی، اینجا باید به API درخواست احراز هویت ارسال کنید
    setIsLoading(true);
    
    try {
      // شبیه‌سازی تأخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // برای نمونه، فقط بررسی می‌کنیم آیا کاربر از قبل ثبت‌نام کرده است
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error("نام کاربری یا رمز عبور اشتباه است");
      }
      
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // شبیه‌سازی تأخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // برای نمونه، بررسی می‌کنیم آیا ایمیل از قبل استفاده شده است
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.some((u: any) => u.email === email)) {
        throw new Error("این ایمیل قبلاً ثبت شده است");
      }
      
      // ایجاد کاربر جدید
      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        uploads: []
      };
      
      // ذخیره کاربر در localStorage
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      // ورود خودکار پس از ثبت‌نام
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

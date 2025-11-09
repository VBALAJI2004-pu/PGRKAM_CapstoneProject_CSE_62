import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobListings from "./pages/JobListings";
import JobDetail from "./pages/JobDetail";
import NotFound from "./pages/NotFound";
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import JobApplicationPage from "./pages/JobApplicationPage";
import FAQPage from "./pages/FAQPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import UserManualsPage from "./pages/UserManualsPage";
import NotificationDetailPage from "./pages/NotificationDetailPage";
import MoreServices from './pages/MoreServices';
import SplashBanner from './components/SplashBanner'; // Import the new SplashBanner component
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPage from './pages/AdminPage'; // Import AdminPage
import MyApplicationsPage from './pages/MyApplicationsPage'; // Import MyApplicationsPage


const queryClient = new QueryClient();

// Placeholder components for Login and Signup
// const LoginPage = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">Login Page</h1></div>;
// const SignupPage = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">Signup Page</h1></div>;

type Language = 'en' | 'hi' | 'pa';
type FontSize = 'sm' | 'base' | 'lg' | 'xl'; // Define font size types

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

interface AuthContextType {
  token: string | null;
  user: { id: string; name: string; email: string } | null;
  login: (token: string, user: { id: string; name: string; email: string }) => void;
  logout: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined); // Create FontSizeContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined); // Create AuthContext

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSize] = useState<FontSize>('base'); // Default font size
  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  console.log('AuthProvider init: token', localStorage.getItem('token'));
  console.log('AuthProvider init: user', localStorage.getItem('user'));
  const [token, setToken] = useState<string | null>(null); // Do not load from localStorage initially
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null); // Do not load from localStorage initially

  useEffect(() => {
    console.log('Auth useEffect triggered. Token:', token, 'User:', user);
    // We still update localStorage when token/user state changes, e.g., on successful login
    if (token) {
      console.log('Setting token in localStorage:', token);
      localStorage.setItem('token', token);
    } else {
      console.log('Removing token from localStorage.');
      localStorage.removeItem('token');
    }
    if (user) {
      console.log('Setting user in localStorage:', user);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      console.log('Removing user from localStorage.');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const login = (jwtToken: string, userData: { id: string; name: string; email: string }) => {
    setToken(jwtToken);
    setUser(userData);
  };

  const logout = () => {
    console.log('Logging out. Clearing token and user from localStorage.');
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel(); // Stop any ongoing speech
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    const splashShown = sessionStorage.getItem('splashShown');
    return splashShown !== 'true';
  });

  const handleSplashClose = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showSplash && <SplashBanner onClose={handleSplashClose} />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs/:category" element={<JobListings />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/skill-training" element={<JobListings />} />
            <Route path="/self-employment" element={<JobListings />} />
            <Route path="/jobs-women" element={<JobListings />} />
            <Route path="/jobs-disability" element={<JobListings />} />
            <Route path="/armed-forces" element={<JobListings />} />
            <Route path="/counselling" element={<JobListings />} />
            <Route path="/apply/:id" element={<JobApplicationPage />} /> {/* New Route for Application Page */}
            <Route path="/faqs" element={<FAQPage />} /> {/* New Route for FAQ Page */}
            <Route path="/about" element={<AboutUsPage />} /> {/* New Route for About Us Page */}
            <Route path="/contact" element={<ContactUsPage />} /> {/* New Route for Contact Us Page */}
            <Route path="/user-manuals" element={<UserManualsPage />} /> {/* New Route for User Manuals Page */}
            <Route path="/notification/:id" element={<NotificationDetailPage />} /> {/* New Route for Notification Detail Page */}
            <Route path="/more-services" element={<MoreServices />} /> {/* New Route for More Services Page */}
            <Route path="/login" element={<LoginPage />} /> {/* New Route for Login Page */}
            <Route path="/signup" element={<SignupPage />} /> {/* New Route for Signup Page */}
            <Route path="/admin" element={<AdminPage />} /> {/* New Route for Admin Page */}
            <Route path="/my-applications" element={<MyApplicationsPage />} /> {/* New Route for My Applications Page */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const AppWrapper = () => (
  <LanguageProvider>
    <FontSizeProvider> {/* Wrap with FontSizeProvider */}
      <AuthProvider> {/* Wrap with AuthProvider */}
        <App key={useContext(LanguageContext)?.language} />
      </AuthProvider>
    </FontSizeProvider>
  </LanguageProvider>
);

export default AppWrapper;

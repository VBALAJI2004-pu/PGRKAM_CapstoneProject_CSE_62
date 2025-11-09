import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SocialSidebar } from './SocialSidebar';
import { ChatBot } from './ChatBot';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <SocialSidebar />
      <ChatBot />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

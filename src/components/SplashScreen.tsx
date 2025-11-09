import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onDismiss: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplashScreen');
    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

    const handleInteraction = () => {
      setIsVisible(false);
      localStorage.setItem('hasSeenSplashScreen', 'true');
      onDismiss();
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('scroll', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, [onDismiss]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative p-4 max-w-3xl w-full mx-auto">
        <img src="/mission-chardi-kala.png" alt="Mission Chardi Kala" className="w-full h-auto object-contain" />
      </div>
    </div>
  );
};

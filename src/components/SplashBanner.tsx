import React from 'react';
import splashBannerImage from '../assets/BAN.png';

interface SplashBannerProps {
  onClose: () => void;
}

const SplashBanner: React.FC<SplashBannerProps> = ({ onClose }) => {
  const handleClose = () => {
    sessionStorage.setItem('splashShown', 'true'); // Set flag in session storage
    onClose();
  };

  return (
    <div className="fixed left-0 right-0 top-[2cm] bottom-[0.2cm] z-50 flex items-center justify-center bg-black bg-opacity-75 cursor-pointer" onClick={handleClose}>
      <img src={splashBannerImage} alt="Mission Chardi Kala Banner" className="w-full h-full object-contain" />
    </div>
  );
};

export default SplashBanner;

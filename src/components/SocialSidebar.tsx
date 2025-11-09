import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export const SocialSidebar = () => {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white p-3 transition-colors"
      >
        <Facebook className="w-5 h-5" />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white p-3 transition-colors"
      >
        <Twitter className="w-5 h-5" />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#E4405F] hover:bg-[#E4405F]/90 text-white p-3 transition-colors"
      >
        <Instagram className="w-5 h-5" />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white p-3 transition-colors"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white p-3 transition-colors"
      >
        <Youtube className="w-5 h-5" />
      </a>
    </div>
  );
};

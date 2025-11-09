import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LanguageContext } from '../App';
import { Briefcase, Gavel, Handshake, Users, BookOpen, Headset, Home as HomeIcon, Star, Heart, Award } from 'lucide-react';

const MoreServices = () => {
  const { language, fontSize } = useContext(LanguageContext)!;
  const t = {
    en: {
      moreServicesTitle: "More Employment Services",
      govtPA: "Government PA",
      helpDesk: "Help Desk",
      clubs: "Clubs and Associations",
      careerGuidance: "Career Guidance",
      skillDevelopment: "Skill Development Programs",
      entrepreneurship: "Entrepreneurship Support",
      veteransSupport: "Veterans Support",
      disabilitySupport: "Disability Support Services",
      womenEmpowerment: "Women Empowerment Programs",
      // Add more translations as needed
    },
    pa: {
      moreServicesTitle: "ਹੋਰ ਰੁਜ਼ਗਾਰ ਸੇਵਾਵਾਂ",
      govtPA: "ਸਰਕਾਰੀ ਪੀ.ਏ.",
      helpDesk: "ਮਦਦ ਡੈਸਕ",
      clubs: "ਕਲੱਬ ਅਤੇ ਐਸੋਸੀਏਸ਼ਨਾਂ",
      careerGuidance: "ਕੈਰੀਅਰ ਮਾਰਗਦਰਸ਼ਨ",
      skillDevelopment: "ਹੁਨਰ ਵਿਕਾਸ ਪ੍ਰੋਗਰਾਮ",
      entrepreneurship: "ਉੱਦਮਤਾ ਸਹਾਇਤਾ",
      veteransSupport: "ਸਾਬਕਾ ਫੌਜੀਆਂ ਦੀ ਸਹਾਇਤਾ",
      disabilitySupport: "ਅਪਾਹਜਤਾ ਸਹਾਇਤਾ ਸੇਵਾਵਾਂ",
      womenEmpowerment: "ਮਹਿਲਾ ਸਸ਼ਕਤੀਕਰਨ ਪ੍ਰੋਗਰਾਮ",
      // Add more translations as needed
    },
    hi: {
      moreServicesTitle: "अधिक रोजगार सेवाएँ",
      govtPA: "सरकारी पी.ए.",
      helpDesk: "हेल्प डेस्क",
      clubs: "क्लब और संघ",
      careerGuidance: "कैरियर मार्गदर्शन",
      skillDevelopment: "कौशल विकास कार्यक्रम",
      entrepreneurship: "उद्यमिता सहायता",
      veteransSupport: "अनुभवी सहायता",
      disabilitySupport: "विकलांगता सहायता सेवाएँ",
      womenEmpowerment: "महिला सशक्तिकरण कार्यक्रम",
      // Add more translations as needed
    },
  }[language];

  const fontSizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const moreServices = [
    { title: t.govtPA, icon: Gavel, link: '#', color: 'bg-blue-100 text-blue-800' },
    { title: t.helpDesk, icon: Headset, link: '#', color: 'bg-green-100 text-green-800' },
    { title: t.clubs, icon: Users, link: '#', color: 'bg-purple-100 text-purple-800' },
    { title: t.careerGuidance, icon: BookOpen, link: '/counselling', color: 'bg-red-100 text-red-800' },
    { title: t.skillDevelopment, icon: Award, link: '/skill-training', color: 'bg-yellow-100 text-yellow-800' },
    { title: t.entrepreneurship, icon: Star, link: '#', color: 'bg-indigo-100 text-indigo-800' },
    { title: t.veteransSupport, icon: Heart, link: '#', color: 'bg-pink-100 text-pink-800' },
    { title: t.disabilitySupport, icon: Handshake, link: '/jobs-disability', color: 'bg-teal-100 text-teal-800' },
    { title: t.womenEmpowerment, icon: HomeIcon, link: '/jobs-women', color: 'bg-orange-100 text-orange-800' },
  ];

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className={`text-3xl font-bold text-center mb-8 ${fontSizeClasses[fontSize]}`}>
        {t.moreServicesTitle}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moreServices.map((service, index) => (
          <Link to={service.link} key={index}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`${service.color} p-4 rounded-full mb-4`}>
                  <service.icon className="w-12 h-12" />
                </div>
                <h3 className={`font-bold ${fontSizeClasses[fontSize]}`}>{service.title}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreServices;

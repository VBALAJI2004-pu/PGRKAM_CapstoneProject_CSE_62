import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocialSidebar } from '@/components/SocialSidebar';
import { ChatBot } from '@/components/ChatBot';
import React, { useContext } from 'react';
import { LanguageContext, FontSizeContext } from '../App';

const aboutUsTranslations = {
  en: {
    pageTitle: 'About Us',
    intro: 'PGRKAM is a pioneering initiative by the Government of Punjab, India, aimed at transforming the employment landscape and fostering skill development across the state.',
    missionTitle: 'Our Mission',
    missionContent: 'Our mission is to empower the youth of Punjab by providing comprehensive access to job opportunities, skill enhancement programs, and self-employment schemes. We strive to bridge the gap between job seekers and employers, ensuring a skilled workforce and sustainable livelihoods.',
    visionTitle: 'Our Vision',
    visionContent: 'To create a vibrant and prosperous Punjab where every individual has the opportunity to achieve their full potential through meaningful employment and continuous skill development.',
    objectivesTitle: 'Key Objectives',
    objective1: 'Facilitate job placement for youth in both government and private sectors.',
    objective2: 'Promote and implement various skill training programs to enhance employability.',
    objective3: 'Support and encourage self-employment initiatives through guidance and resources.',
    objective4: 'Provide career counselling and guidance to job seekers.',
    objective5: 'Ensure equal employment opportunities for women and persons with disabilities.',
  },
  hi: {
    pageTitle: 'हमारे बारे में',
    intro: 'पीजीआरकेएम भारत के पंजाब सरकार की एक अग्रणी पहल है, जिसका उद्देश्य राज्य भर में रोजगार परिदृश्य को बदलना और कौशल विकास को बढ़ावा देना है।',
    missionTitle: 'हमारा मिशन',
    missionContent: 'हमारा मिशन नौकरी के अवसरों, कौशल वृद्धि कार्यक्रमों और स्वरोजगार योजनाओं तक व्यापक पहुंच प्रदान करके पंजाब के युवाओं को सशक्त बनाना है। हम नौकरी चाहने वालों और नियोक्ताओं के बीच के अंतर को पाटने का प्रयास करते हैं, जिससे एक कुशल कार्यबल और स्थायी आजीविका सुनिश्चित हो सके।',
    visionTitle: 'हमारा विजन',
    visionContent: 'एक जीवंत और समृद्ध पंजाब बनाना जहाँ प्रत्येक व्यक्ति को सार्थक रोजगार और निरंतर कौशल विकास के माध्यम से अपनी पूरी क्षमता प्राप्त करने का अवसर मिले।',
    objectivesTitle: 'प्रमुख उद्देश्य',
    objective1: 'सरकारी और निजी दोनों क्षेत्रों में युवाओं के लिए नौकरी प्लेसमेंट की सुविधा प्रदान करना।',
    objective2: 'रोजगार क्षमता बढ़ाने के लिए विभिन्न कौशल प्रशिक्षण कार्यक्रमों को बढ़ावा देना और लागू करना।',
    objective3: 'मार्गदर्शन और संसाधनों के माध्यम से स्वरोजगार पहलों का समर्थन और प्रोत्साहन करना।',
    objective4: 'नौकरी चाहने वालों को करियर परामर्श और मार्गदर्शन प्रदान करना।',
    objective5: 'महिलाओं और विकलांग व्यक्तियों के लिए समान रोजगार के अवसर सुनिश्चित करना।',
  },
  pa: {
    pageTitle: 'ਸਾਡੇ ਬਾਰੇ',
    intro: 'ਪੀ.ਜੀ.ਆਰ.ਕੇ.ਏ.ਐਮ. ਭਾਰਤ ਦੇ ਪੰਜਾਬ ਸਰਕਾਰ ਦੁਆਰਾ ਇੱਕ ਮੋਹਰੀ ਪਹਿਲਕਦਮੀ ਹੈ, ਜਿਸਦਾ ਉਦੇਸ਼ ਰਾਜ ਭਰ ਵਿੱਚ ਰੁਜ਼ਗਾਰ ਦੇ ਖੇਤਰ ਨੂੰ ਬਦਲਣਾ ਅਤੇ ਹੁਨਰ ਵਿਕਾਸ ਨੂੰ ਉਤਸ਼ਾਹਿਤ ਕਰਨਾ ਹੈ।',
    missionTitle: 'ਸਾਡਾ ਮਿਸ਼ਨ',
    missionContent: 'ਸਾਡਾ ਮਿਸ਼ਨ ਨੌਕਰੀ ਦੇ ਮੌਕਿਆਂ, ਹੁਨਰ ਵਧਾਉਣ ਵਾਲੇ ਪ੍ਰੋਗਰਾਮਾਂ, ਅਤੇ ਸਵੈ-ਰੁਜ਼ਗਾਰ ਯੋਜਨਾਵਾਂ ਤੱਕ ਵਿਆਪਕ ਪਹੁੰਚ ਪ੍ਰਦਾਨ ਕਰਕੇ ਪੰਜਾਬ ਦੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਸ਼ਕਤੀਕਰਨ ਕਰਨਾ ਹੈ। ਅਸੀਂ ਨੌਕਰੀ ਲੱਭਣ ਵਾਲਿਆਂ ਅਤੇ ਮਾਲਕਾਂ ਵਿਚਕਾਰ ਪਾੜੇ ਨੂੰ ਪੂਰਾ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰਦੇ ਹਾਂ, ਇੱਕ ਕੁਸ਼ਲ ਕਰਮਚਾਰੀ ਅਤੇ ਸਥਾਈ ਆਜੀਵਿਕਾ ਨੂੰ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹੋਏ।',
    visionTitle: 'ਸਾਡਾ ਦ੍ਰਿਸ਼ਟੀਕੋਣ',
    visionContent: 'ਇੱਕ ਜੀਵੰਤ ਅਤੇ ਖੁਸ਼ਹਾਲ ਪੰਜਾਬ ਬਣਾਉਣਾ ਜਿੱਥੇ ਹਰ ਵਿਅਕਤੀ ਨੂੰ ਸਾਰਥਕ ਰੁਜ਼ਗਾਰ ਅਤੇ ਨਿਰੰਤਰ ਹੁਨਰ ਵਿਕਾਸ ਦੁਆਰਾ ਆਪਣੀ ਪੂਰੀ ਸਮਰੱਥਾ ਪ੍ਰਾਪਤ ਕਰਨ ਦਾ ਮੌਕਾ ਮਿਲੇ।',
    objectivesTitle: 'ਮੁੱਖ ਉਦੇਸ਼',
    objective1: 'ਸਰਕਾਰੀ ਅਤੇ ਨਿੱਜੀ ਦੋਵਾਂ ਖੇਤਰਾਂ ਵਿੱਚ ਨੌਜਵਾਨਾਂ ਲਈ ਨੌਕਰੀ ਦੀ ਪਲੇਸਮੈਂਟ ਦੀ ਸਹੂਲਤ।',
    objective2: 'ਰੁਜ਼ਗਾਰ ਵਧਾਉਣ ਲਈ ਵੱਖ-ਵੱਖ ਹੁਨਰ ਸਿਖਲਾਈ ਪ੍ਰੋਗਰਾਮਾਂ ਨੂੰ ਉਤਸ਼ਾਹਿਤ ਕਰਨਾ ਅਤੇ ਲਾਗੂ ਕਰਨਾ।',
    objective3: 'ਮਾਰਗਦਰਸ਼ਨ ਅਤੇ ਸਰੋਤਾਂ ਰਾਹੀਂ ਸਵੈ-ਰੁਜ਼ਗਾਰ ਪਹਿਲਕਦਮੀਆਂ ਦਾ ਸਮਰਥਨ ਅਤੇ ਉਤਸ਼ਾਹਿਤ ਕਰਨਾ।',
    objective4: 'ਨੌਕਰੀ ਲੱਭਣ ਵਾਲਿਆਂ ਨੂੰ ਕਰੀਅਰ ਸਲਾਹ ਅਤੇ ਮਾਰਗਦਰਸ਼ਨ ਪ੍ਰਦਾਨ ਕਰਨਾ।',
    objective5: 'ਔਰਤਾਂ ਅਤੇ ਅਪਾਹਜ ਵਿਅਕਤੀਆਂ ਲਈ ਬਰਾਬਰ ਰੁਜ਼ਗਾਰ ਦੇ ਮੌਕੇ ਯਕੀਨੀ ਬਣਾਉਣਾ।',
  },
};

const fontSizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const AboutUsPage = () => {
  const { language } = useContext(LanguageContext)!;
  const { fontSize } = useContext(FontSizeContext)!;
  const t = aboutUsTranslations[language];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SocialSidebar />
      <ChatBot />

      <div className="flex-1 py-12 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h1 className={`text-4xl font-bold mb-8 text-center ${fontSizeClasses[fontSize]}`}>
            {t.pageTitle}
          </h1>

          <p className={`mb-6 text-center ${fontSizeClasses[fontSize]}`}>{t.intro}</p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h2 className={`text-2xl font-semibold text-primary mb-4 ${fontSizeClasses[fontSize]}`}>
                {t.missionTitle}
              </h2>
              <p className={fontSizeClasses[fontSize]}>{t.missionContent}</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h2 className={`text-2xl font-semibold text-primary mb-4 ${fontSizeClasses[fontSize]}`}>
                {t.visionTitle}
              </h2>
              <p className={fontSizeClasses[fontSize]}>{t.visionContent}</p>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md mb-8">
            <h2 className={`text-2xl font-semibold text-primary mb-4 ${fontSizeClasses[fontSize]}`}>
              {t.objectivesTitle}
            </h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li className={fontSizeClasses[fontSize]}>{t.objective1}</li>
              <li className={fontSizeClasses[fontSize]}>{t.objective2}</li>
              <li className={fontSizeClasses[fontSize]}>{t.objective3}</li>
              <li className={fontSizeClasses[fontSize]}>{t.objective4}</li>
              <li className={fontSizeClasses[fontSize]}>{t.objective5}</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUsPage;

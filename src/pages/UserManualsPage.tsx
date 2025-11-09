import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocialSidebar } from '@/components/SocialSidebar';
import { ChatBot } from '@/components/ChatBot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import React, { useContext } from 'react';
import { LanguageContext, FontSizeContext } from '../App';

const userManualsTranslations = {
  en: {
    pageTitle: 'User Manuals',
    intro: 'Find comprehensive guides and instructions to help you navigate and utilize the PGRKAM portal effectively.',
    manual1Title: 'Job Seeker Manual',
    manual1Description: 'A detailed guide for job seekers on how to register, search for jobs, apply, and track applications.',
    manual2Title: 'Employer Manual',
    manual2Description: 'Instructions for employers on how to register, post job openings, manage applications, and utilize recruitment tools.',
    manual3Title: 'Skill Training Provider Manual',
    manual3Description: 'Information for skill training providers on registration, course listings, and managing trainee data.',
    download: 'Download',
  },
  hi: {
    pageTitle: 'उपयोगकर्ता नियमावली',
    intro: 'पीजीआरकेएम पोर्टल का प्रभावी ढंग से उपयोग करने के लिए व्यापक मार्गदर्शिकाएँ और निर्देश प्राप्त करें।',
    manual1Title: 'नौकरी चाहने वाले के लिए नियमावली',
    manual1Description: 'नौकरी चाहने वालों के लिए पंजीकरण करने, नौकरियों की खोज करने, आवेदन करने और आवेदनों को ट्रैक करने के बारे में एक विस्तृत मार्गदर्शिका।',
    manual2Title: 'नियोक्ता नियमावली',
    manual2Description: 'नियोक्ताओं के लिए पंजीकरण करने, नौकरी के रिक्त पदों को पोस्ट करने, आवेदनों का प्रबंधन करने और भर्ती उपकरणों का उपयोग करने के निर्देश।',
    manual3Title: 'कौशल प्रशिक्षण प्रदाता नियमावली',
    manual3Description: 'कौशल प्रशिक्षण प्रदाताओं के लिए पंजीकरण, पाठ्यक्रम सूची और प्रशिक्षु डेटा के प्रबंधन के बारे में जानकारी।',
    download: 'डाउनलोड करें',
  },
  pa: {
    pageTitle: 'ਉਪਭੋੋਗਤਾ ਮੈਨੂਅਲ',
    intro: 'ਪੀ.ਜੀ.ਆਰ.ਕੇ.ਏ.ਐਮ. ਪੋਰਟਲ ਦੀ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਢੰਗ ਨਾਲ ਵਰਤੋਂ ਕਰਨ ਲਈ ਵਿਸਤ੍ਰਿਤ ਗਾਈਡਾਂ ਅਤੇ ਨਿਰਦੇਸ਼ ਲੱਭੋ।',
    manual1Title: 'ਨੌਕਰੀ ਲੱਭਣ ਵਾਲੇ ਦਾ ਮੈਨੂਅਲ',
    manual1Description: 'ਨੌਕਰੀ ਲੱਭਣ ਵਾਲਿਆਂ ਲਈ ਰਜਿਸਟਰ ਕਰਨ, ਨੌਕਰੀਆਂ ਲੱਭਣ, ਅਪਲਾਈ ਕਰਨ ਅਤੇ ਅਰਜ਼ੀਆਂ ਨੂੰ ਟਰੈਕ ਕਰਨ ਬਾਰੇ ਇੱਕ ਵਿਸਤ੍ਰਿਤ ਗਾਈਡ।',
    manual2Title: 'ਮਾਲਕ ਦਾ ਮੈਨੂਅਲ',
    manual2Description: 'ਮਾਲਕਾਂ ਲਈ ਰਜਿਸਟਰ ਕਰਨ, ਨੌਕਰੀਆਂ ਦੇ ਅਹੁਦਿਆਂ ਨੂੰ ਪੋਸਟ ਕਰਨ, ਅਰਜ਼ੀਆਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰਨ ਅਤੇ ਭਰਤੀ ਟੂਲਜ਼ ਦੀ ਵਰਤੋਂ ਕਰਨ ਬਾਰੇ ਨਿਰਦੇਸ਼।',
    manual3Title: 'ਹੁਨਰ ਸਿਖਲਾਈ ਪ੍ਰਦਾਤਾ ਮੈਨੂਅਲ',
    manual3Description: 'ਹੁਨਰ ਸਿਖਲਾਈ ਪ੍ਰਦਾਤਾਵਾਂ ਲਈ ਰਜਿਸਟਰੇਸ਼ਨ, ਕੋਰਸ ਸੂਚੀਆਂ, ਅਤੇ ਸਿਖਿਆਰਥੀ ਡੇਟਾ ਦੇ ਪ੍ਰਬੰਧਨ ਬਾਰੇ ਜਾਣਕਾਰੀ।',
    download: 'ਡਾਊਨਲੋਡ',
  },
};

const fontSizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const UserManualsPage = () => {
  const { language } = useContext(LanguageContext)!;
  const { fontSize } = useContext(FontSizeContext)!;
  const t = userManualsTranslations[language];

  const manuals = [
    { title: t.manual1Title, description: t.manual1Description, file: 'job_seeker_manual.pdf' },
    { title: t.manual2Title, description: t.manual2Description, file: 'employer_manual.pdf' },
    { title: t.manual3Title, description: t.manual3Description, file: 'training_provider_manual.pdf' },
  ];

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

          <p className={`mb-8 text-center text-muted-foreground ${fontSizeClasses[fontSize]}`}>{t.intro}</p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {manuals.map((manual, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className={fontSizeClasses[fontSize]}>{manual.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <p className={`text-muted-foreground mb-4 ${fontSizeClasses[fontSize]}`}>{manual.description}</p>
                  <Button variant="outline" className={`w-full ${fontSizeClasses[fontSize]}`} asChild>
                    <a href={`/public/manuals/${manual.file}`} download>
                      <Download className="w-4 h-4 mr-2" /> {t.download}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserManualsPage;

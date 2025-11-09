import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocialSidebar } from '@/components/SocialSidebar';
import { ChatBot } from '@/components/ChatBot';
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LanguageContext, FontSizeContext } from '../App';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const notificationDetailsTranslations = {
  en: {
    pageTitle: 'Notification Details',
    notificationNotFound: 'Notification Not Found',
    backToList: 'Back to Notifications',
    title: 'Title:',
    postedOn: 'Posted On:',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    readMore: 'Read more on the official website',
  },
  hi: {
    pageTitle: 'अधिसूचना विवरण',
    notificationNotFound: 'अधिसूचना नहीं मिली',
    backToList: 'अधिसूचनाओं पर वापस जाएं',
    title: 'शीर्षक:',
    postedOn: 'पर पोस्ट किया गया:',
    content: 'लोरेम इप्सम dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum।',
    readMore: 'आधिकारिक वेबसाइट पर और पढ़ें',
  },
  pa: {
    pageTitle: 'ਸੂਚਨਾ ਵੇਰਵੇ',
    notificationNotFound: 'ਸੂਚਨਾ ਨਹੀਂ ਲੱਭੀ',
    backToList: 'ਸੂਚਨਾਵਾਂ ਤੇ ਵਾਪਸ ਜਾਓ',
    title: 'ਸਿਰਲੇਖ:',
    postedOn: 'ਤੇ ਪੋਸਟ ਕੀਤਾ ਗਿਆ:',
    content: 'ਲੋਰਮ ਇਪਸਮ ਡੋਲਰ ਸਿੱਟ ਅਮੇਟ, ਕੰਸੈਕਟੇਟੁਰ ਐਡੀਪਿਸਕਿੰਗ ਐਲਿਟ। ਸੇਡ ਡੂ ਈਯੂਸਮੋਡ ਟੈਂਪੋਰ ਇਨਕਿਡਿਡੰਟ ਯੂਟ ਲੈਬੋਰੇ ਏਟ ਡੋਲੋਰੇ ਮੈਗਨਾ ਅਲੀਕਵਾ। ਯੂਟ ਐਨਿਮ ਐਡ ਮਿਨਿਮ ਵੇਨਿਅਮ, ਕਵਿਸ ਨੋਸਟ੍ਰਡ ਐਕਸਰਸਾਈਟੇਸ਼ਨ ਉਲਮਕੋ ਲੈਬੋਰਿਸ ਨਿਸਿ ਯੂਟ ਅਲਿਕਵਿੱਪ ਐਕਸ ਈਏ ਕਾਮੋਡੋ ਕੌਂਸੇਕਵਾਟ। ਡੂਇਸ ਔਟੇ ਈਰਿਊਰ ਡੋਲੋਰ ਇਨ ਰਿਪ੍ਰੀਹੈਂਡਰਿਟ ਇਨ ਵੋਲਪਟੇਟੇ ਵੇਲਿਟ ਐਸੇ ਸਿੱਲਮ ਡੋਲੋਰੇ ਈਯੂ ਫਿਊਜੀਏਟ ਨੁੱਲਾ ਪਰਿਯਾਟੁਰ। ਐਕਸਸੈਪਟੂਰ ਸਿੱਟ ਔਕਾਕੇਕੈਟ ਕਯੂਪਿਡੈਟੈਟ ਨੌਨ ਪ੍ਰੋਇਡੈਂਟ, ਸੁੰਟ ਇਨ ਕੁਲਪਾ ਕਵੀ ਔਫਿਸੀਆ ਡੇਸਰੁੰਟ ਮੋਲਿਟ ਐਨਿਮ ਆਈਡੀ ਏਸਟ ਲੈਬੋਰਮ।',
    readMore: 'ਅਧਿਕਾਰਤ ਵੈੱਬਸਾਈਟ \'ਤੇ ਹੋਰ ਪੜ੍ਹੋ',
  },
};

const fontSizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const NotificationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useContext(LanguageContext)!;
  const { fontSize } = useContext(FontSizeContext)!;
  const t = notificationDetailsTranslations[language];

  // Dummy notification data (replace with actual fetch later)
  const notifications = [
    { id: '1', title: 'Recruitment of Assistant Loco Pilot(ALP) - 01/24', date: '29-01-2024', content: t.content, link: '#' },
    { id: '2', title: 'Hiring of Vehicles under PSDM', date: '22-01-2024', content: t.content, link: '#' },
    { id: '3', title: 'Vacancy for Data Entry Operator', date: '15-01-2024', content: t.content, link: '#' },
    { id: '4', title: 'Upcoming Skill Development Workshops', date: '01-01-2024', content: t.content, link: '#' },
  ];

  const notification = notifications.find(n => n.id === id);

  if (!notification) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <SocialSidebar />
        <ChatBot />
        <div className="flex-1 py-12 px-6 bg-background">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className={`text-4xl font-bold mb-4 ${fontSizeClasses[fontSize]}`}>{t.notificationNotFound}</h1>
            <Link to="/">
              <Button className={fontSizeClasses[fontSize]}>{t.backToList}</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SocialSidebar />
      <ChatBot />

      <div className="flex-1 py-12 px-6 bg-background">
        <div className="container mx-auto max-w-3xl bg-card p-6 rounded-lg shadow-md border border-border">
          <Link to="/">
            <Button variant="outline" className={`mb-6 ${fontSizeClasses[fontSize]}`}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {t.backToList}
            </Button>
          </Link>
          <h1 className={`text-3xl font-bold text-primary mb-4 ${fontSizeClasses[fontSize]}`}>{notification.title}</h1>
          <p className={`text-muted-foreground mb-4 ${fontSizeClasses[fontSize]}`}>{t.postedOn} {notification.date}</p>
          <p className={`text-lg mb-6 ${fontSizeClasses[fontSize]} whitespace-pre-wrap`}>{notification.content}</p>
          <a href={notification.link} target="_blank" rel="noopener noreferrer">
            <Button className={fontSizeClasses[fontSize]}>
              {t.readMore}
            </Button>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotificationDetailPage;

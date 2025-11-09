import { Link } from 'react-router-dom';
import logo from '@/assets/pgrkam-logo.png';
import { Volume2 } from 'lucide-react';
import React, { useContext, useState, useEffect, useRef } from 'react'; // Import useState, useEffect, useRef
import { LanguageContext, FontSizeContext } from '../App'; // Import LanguageContext, FontSizeContext
import { useLocation } from 'react-router-dom'; // Import useLocation
import { AuthContext } from '../App'; // Import AuthContext
import { cn } from '@/lib/utils'; // Import cn for conditional class
import { Button } from './ui/button'; // Import Button
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'; // Import dropdown menu components

const headerTranslations = {
  en: {
    english: 'English',
    punjabi: 'ਪੰਜਾਬੀ',
    hindi: 'हिंदी',
    aPlus: 'A+',
    aMinus: 'A-',
    faqs: 'FAQs',
    userManuals: 'User Manuals',
    screenReader: 'Screen Reader',
    screenReaderOn: 'Screen Reader ON',
    screenReaderOff: 'Screen Reader OFF',
    readPage: 'Reading current page content',
    login: 'Login',
    signup: 'Signup',
    deptTitle: 'Department of Employment Generation',
    deptSubtitle: 'Skill Development & Training- Govt. Of Punjab, India',
    home: 'Home',
    aboutUs: 'About Us',
    contactUs: 'Contact us',
    myApplications: 'My Applications',
    status: 'Status',
    marquee1: 'List of registered Recruiting Agents in Punjab-for sending abroad on work visa',
    marquee2: 'Beware of Fraudulent/Fake Employers',
    marquee3: 'New job opportunities available daily',
    welcome: "Hello {username}! I'm PGRKAM Assistant. I can help you find jobs, training programs, and career guidance in English, Punjabi, and Hindi. How can I assist you today?",
    placeholder: "Type your message or click mic to speak...",
    formError: "There was an error submitting your application. Please try again.",
    confirmChangeMind: "Are you sure you want to go back to the job listings? You will lose the current application form.",
    yesChooseOtherJob: "Yes, choose another job",
    noStayOnForm: "No, stay on this form",
    pleaseLoginToChat: "Please login to chat to access this feature.",
    loginToChat: "Login to Chat",
  },
  hi: {
    english: 'अंग्रेजी',
    punjabi: 'पंजाबी',
    hindi: 'हिंदी',
    aPlus: 'ए+',
    aMinus: 'ए-',
    faqs: 'अक्सर पूछे जाने वाले प्रश्न',
    userManuals: 'उपयोगकर्ता मैनुअल',
    screenReader: 'स्क्रीन रीडर',
    screenReaderOn: 'स्क्रीन रीडर चालू',
    screenReaderOff: 'स्क्रीन रीडर बंद',
    readPage: 'वर्तमान पृष्ठ सामग्री पढ़ रहा है',
    login: 'लॉग इन करें',
    signup: 'साइन अप करें',
    deptTitle: 'रोजगार सृजन विभाग',
    deptSubtitle: 'कौशल विकास और प्रशिक्षण- पंजाब सरकार, भारत',
    home: 'होम',
    aboutUs: 'हमारे बारे में',
    contactUs: 'हमसे संपर्क करें',
    myApplications: 'मेरे आवेदन',
    status: 'स्थिति',
    marquee1: 'पंजाब में पंजीकृत भर्ती एजेंटों की सूची-काम वीजा पर विदेश भेजने के लिए',
    marquee2: 'धोखाधड़ी/नकली नियोक्ताओं से सावधान रहें',
    marquee3: 'हर दिन नई नौकरी के अवसर उपलब्ध हैं',
    welcome: "नमस्ते {username}! मैं PGRKAM सहायक हूं। मैं आपको अंग्रेजी, पंजाबी और हिंदी में नौकरी, प्रशिक्षण कार्यक्रम और करियर मार्गदर्शन खोजने में मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
    placeholder: "अपना संदेश टाइप करें या बोलने के लिए माइक क्लिक करें...",
    formError: "आपका आवेदन जमा करने में एक त्रुटि थी। कृपया पुनः प्रयास करें।",
    confirmChangeMind: "क्या आप वापस नौकरी सूची पर जाना चाहते हैं? आप वर्तमान आवेदन प्रारूप को खो देंगे।",
    yesChooseOtherJob: "हाँ, दूसरी नौकरी चुनें",
    noStayOnForm: "नहीं, इस प्रारूप पर रहें",
    pleaseLoginToChat: "इस सुविधा तक पहुँचने के लिए कृपया चैट में लॉग इन करें।",
    loginToChat: "चैट में लॉग इन करें",
  },
  pa: {
    english: 'ਅੰਗਰੇਜ਼ੀ',
    punjabi: 'ਪੰਜਾਬੀ',
    hindi: 'ਹਿੰਦੀ',
    aPlus: 'ਏ+',
    aMinus: 'ਏ-',
    faqs: 'ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਪ੍ਰਸ਼ਨ',
    userManuals: 'ਉਪਭੋਗਤਾ ਮੈਨੂਅਲ',
    screenReader: 'ਸਕਰੀਨ ਰੀਡਰ',
    screenReaderOn: 'ਸਕਰੀਨ ਰੀਡਰ ਚਾਲੂ',
    screenReaderOff: 'ਸਕਰੀਨ ਰੀਡਰ ਬੰਦ',
    readPage: 'ਵਰਤਮਾਨ ਪੰਨਾ ਸਮੱਗਰੀ ਪੜ੍ਹ ਰਿਹਾ ਹੈ',
    login: 'ਲਾਗਇਨ ਕਰੋ',
    signup: 'ਸਾਈਨ ਅੱਪ ਕਰੋ',
    deptTitle: 'ਰੋਜ਼ਗਾਰ ਉਤਪੱਤੀ ਵਿਭਾਗ',
    deptSubtitle: 'ਹੁਨਰ ਵਿਕਾਸ ਅਤੇ ਸਿਖਲਾਈ- ਪੰਜਾਬ ਸਰਕਾਰ, ਭਾਰਤ',
    home: 'ਹੋਮ',
    aboutUs: 'ਸਾਡੇ ਬਾਰੇ',
    contactUs: 'ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
    myApplications: 'ਮੇਰੀਆਂ ਅਰਜ਼ੀਆਂ',
    status: 'ਸਥਿਤੀ',
    marquee1: 'ਪੰਜਾਬ ਵਿੱਚ ਰਜਿਸਟਰਡ ਭਰਤੀ ਏਜੰਟਾਂ ਦੀ ਸੂਚੀ-ਕੰਮ ਵੀਜ਼ਾ \'ਤੇ ਵਿਦੇਸ਼ ਭੇਜਣ ਲਈ',
    marquee2: 'ਧੋਖਾਧੜੀ/ਨਕਲੀ ਨਿਯੋਜਕਾਂ ਤੋਂ ਸਾਵਧਾਨ ਰਹੋ',
    marquee3: 'ਹਰ ਦਿਨ ਨਵੀਆਂ ਨੌਕਰੀਆਂ ਦੇ ਮੌਕੇ ਉਪਲਬਧ ਹਨ',
    welcome: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ {username}! ਮੈਂ PGRKAM ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਤੁਹਾਨੂੰ ਅੰਗਰੇਜ਼ੀ, ਪੰਜਾਬੀ ਅਤੇ ਹਿੰਦੀ ਵਿੱਚ ਨੌਕਰੀਆਂ, ਸਿਖਲਾਈ ਪ੍ਰੋਗਰਾਮ ਅਤੇ ਕਰੀਅਰ ਮਾਰਗਦਰਸ਼ਨ ਲੱਭਣ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹੈ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹੈ?",
    placeholder: "ਆਪਣਾ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ ਜਾਂ ਬੋਲਣ ਲਈ ਮਾਈਕ ਕਲਿੱਕ ਕਰੋ...",
    formError: "ਤੁਹਾਡੀ ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰਨ ਵਿੱਚ ਇੱਕ ਗਲਤੀ ਆਈ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    confirmChangeMind: "ਕੀ ਤੁਸੀਂ ਵਾਪਸ ਨੌਕਰੀ ਸੂਚੀ ਪਰ ਜਾਣਾ ਚਾਹੁੰਦੇ ਹੋ? ਤੁਸੀਂ ਵਰਤਮਾਨ ਆਵੇਦਨ ਪ੍ਰਾਰੂਪ ਨੂੰ ਖੋ ਦੇਂਗੇ।",
    yesChooseOtherJob: "ਹਾਂ, ਦੂਸਰੀ ਨੌਕਰੀ ਚੁਣੋ",
    noStayOnForm: "ਨਹੀਂ, ਇਸ ਪ੍ਰਾਰੂਪ ਪਰ ਰਹੋ",
    pleaseLoginToChat: "ਇਸ ਵਿਸ਼ੇਸ਼ਤਾ ਤੱਕ ਪਹੁੰਚਣ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਚੈਟ ਵਿੱਚ ਲੌਗਇਨ ਕਰੋ।",
    loginToChat: "ਚੈਟ ਵਿੱਚ ਲੌਗਇਨ ਕਰੋ",
  },
};

const fontSizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export const Header = () => {
  const { language, setLanguage } = useContext(LanguageContext)!;
  const { fontSize, setFontSize } = useContext(FontSizeContext)!; // Consume FontSizeContext
  const t = headerTranslations[language];

  const [isScreenReaderActive, setIsScreenReaderActive] = useState(false); // State for screen reader
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for audio element
  const location = useLocation(); // Get current location
  const { user, logout } = useContext(AuthContext)!; // Get user and logout from AuthContext
  const hideMarquee = location.pathname === '/login' || location.pathname === '/signup'; // Determine if marquee should be hidden

  useEffect(() => {
    // Initialize audio only once
    if (audioRef.current === null) {
      audioRef.current = new Audio('/tun_sound.mp3');
      audioRef.current.volume = 1.0; // Set volume to maximum
    }
  }, []);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language; // Use current language
      speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis not supported in this browser.");
    }
  };

  const toggleScreenReader = () => {
    setIsScreenReaderActive(prevState => !prevState);
    const statusText = isScreenReaderActive ? t.screenReaderOff : t.screenReaderOn;
    speakText(statusText);
  };

  const readPageContent = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
    const mainContent = document.body.innerText; // Get all visible text on the page
    speakText(t.readPage + ". " + mainContent.substring(0, 500) + "..."); // Read first 500 chars
  };

  const increaseFontSize = () => {
    setFontSize(prevSize => {
      if (prevSize === 'sm') return 'base';
      if (prevSize === 'base') return 'lg';
      if (prevSize === 'lg') return 'xl';
      return prevSize;
    });
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => {
      if (prevSize === 'xl') return 'lg';
      if (prevSize === 'lg') return 'base';
      if (prevSize === 'base') return 'sm';
      return prevSize;
    });
  };

  return (
    <>
      <div
        aria-live="polite"
        className="sr-only" // Visually hidden but accessible to screen readers
      >
        {isScreenReaderActive ? t.screenReaderOn : t.screenReaderOff}
      </div>
      {/* Top Orange Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-6 flex justify-between items-center">
        <div className="flex items-center gap-6 text-sm">
          <button onClick={() => setLanguage('en')} className={`hover:underline ${language === 'en' ? 'font-bold' : ''}`}>{t.english}</button>
          <button onClick={() => setLanguage('pa')} className={`hover:underline ${language === 'pa' ? 'font-bold' : ''}`}>{t.punjabi}</button>
          <button onClick={() => setLanguage('hi')} className={`hover:underline ${language === 'hi' ? 'font-bold' : ''}`}>{t.hindi}</button>
          <span>|</span>
          <button onClick={increaseFontSize} className="hover:underline">{t.aPlus}</button>
          <button onClick={decreaseFontSize} className="hover:underline">{t.aMinus}</button>
          <span>|</span>
          <Link to="/faqs" className="hover:underline">{t.faqs}</Link>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link to="/user-manuals" className="hover:underline">{t.userManuals}</Link>
          <span>|</span>
          <button onClick={toggleScreenReader} className="hover:underline">{t.screenReader}</button>
          <span>|</span>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-primary-foreground/20 text-primary-foreground">
                  <span className="font-semibold">Welcome, {user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/my-applications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                    {t.myApplications}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button variant="ghost" onClick={logout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login" className="hover:underline">{t.login}</Link>
              <span>|</span>
              <Link to="/signup" className="hover:underline">{t.signup}</Link>
            </>
          )}
          <button onClick={readPageContent} className="bg-accent hover:bg-accent/90 rounded-full p-2">
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b-2 border-secondary py-4 px-6">
        <div className={cn("container mx-auto flex items-center justify-between")}>
          <div className="flex items-center gap-4">
            <img src={logo} alt="PGRKAM Logo" className="w-20 h-20" />
            <div>
              <h1 className={`font-bold text-foreground ${fontSizeClasses[fontSize]}`}>
                {t.deptTitle}
              </h1>
              <p className={`text-foreground ${fontSizeClasses[fontSize]}`}>
                {t.deptSubtitle}
              </p>
            </div>
          </div>
          <nav className="flex gap-8">
            <Link to="/" className={`text-foreground font-semibold hover:text-primary transition-colors ${fontSizeClasses[fontSize]}`}>
              {t.home}
            </Link>
            <Link to="/about" className={`text-foreground font-semibold hover:text-primary transition-colors ${fontSizeClasses[fontSize]}`}>
              {t.aboutUs}
            </Link>
            <Link to="/contact" className={`text-foreground font-semibold hover:text-primary transition-colors ${fontSizeClasses[fontSize]}`}>
              {t.contactUs}
            </Link>
          </nav>
        </div>
      </div>

      {/* Green Scrolling Info Bar */}
      {!hideMarquee && (
        <div className="bg-secondary text-secondary-foreground py-2 px-6 overflow-hidden">
          <div className="container mx-auto">
            <div className="animate-marquee whitespace-nowrap text-sm">
              <span className={`mx-4 ${fontSizeClasses[fontSize]}`}>{t.marquee1}</span>
              <span className={`mx-4 ${fontSizeClasses[fontSize]}`}>|</span>
              <span className={`mx-4 ${fontSizeClasses[fontSize]}`}>{t.marquee2}</span>
              <span className={`mx-4 ${fontSizeClasses[fontSize]}`}>|</span>
              <span className={`mx-4 ${fontSizeClasses[fontSize]}`}>{t.marquee3}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocialSidebar } from '@/components/SocialSidebar';
import { ChatBot } from '@/components/ChatBot';
import { ContactForm } from '@/components/ContactForm'; // Import ContactForm
import React, { useContext } from 'react';
import { LanguageContext, FontSizeContext } from '../App';
import { MapPin, Mail, Phone } from 'lucide-react';

const contactUsTranslations = {
  en: {
    pageTitle: 'Contact Us',
    intro: 'We are here to help and answer any question you might have. We look forward to hearing from you.',
    contactInfoTitle: 'Our Contact Information',
    address: 'SCO 149-152, 2nd Floor, Sector 17C, Chandigarh',
    email: 'pgrkam.degt@gmail.com',
    phone: '0172-5011184-186',
    sendUsMessage: 'Send Us a Message',
    name: 'Name',
    emailLabel: 'Email',
    subject: 'Subject',
    message: 'Message',
    submitMessage: 'Submit Message',
  },
  hi: {
    pageTitle: 'हमसे संपर्क करें',
    intro: 'हम आपकी मदद करने और आपके किसी भी प्रश्न का उत्तर देने के लिए यहां हैं। हम आपसे सुनने के लिए उत्सुक हैं।',
    contactInfoTitle: 'हमारी संपर्क जानकारी',
    address: 'एससीओ 149-152, दूसरी मंजिल, सेक्टर 17सी, चंडीगढ़',
    email: 'pgrkam.degt@gmail.com',
    phone: '0172-5011184-186',
    sendUsMessage: 'हमें एक संदेश भेजें',
    name: 'नाम',
    emailLabel: 'ईमेल',
    subject: 'विषय',
    message: 'संदेश',
    submitMessage: 'संदेश भेजें',
  },
  pa: {
    pageTitle: 'ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
    intro: 'ਅਸੀਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਅਤੇ ਤੁਹਾਡੇ ਕਿਸੇ ਵੀ ਸਵਾਲ ਦਾ ਜਵਾਬ ਦੇਣ ਲਈ ਇੱਥੇ ਹਾਂ। ਅਸੀਂ ਤੁਹਾਡੇ ਤੋਂ ਸੁਣਨ ਲਈ ਉਤਸੁਕ ਹਾਂ।',
    contactInfoTitle: 'ਸਾਡੀ ਸੰਪਰਕ ਜਾਣਕਾਰੀ',
    address: 'SCO 149-152, 2nd Floor, Sector 17C, ਚੰਡੀਗੜ੍ਹ',
    email: 'pgrkam.degt@gmail.com',
    phone: '0172-5011184-186',
    sendUsMessage: 'ਸਾਨੂੰ ਇੱਕ ਸੁਨੇਹਾ ਭੇਜੋ',
    name: 'ਨਾਮ',
    emailLabel: 'ਈਮੇਲ',
    subject: 'ਵਿਸ਼ਾ',
    message: 'ਸੁਨੇਹਾ',
    submitMessage: 'ਸੁਨੇਹਾ ਭੇਜੋ',
  },
};

const fontSizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const ContactUsPage = () => {
  const { language } = useContext(LanguageContext)!;
  const { fontSize } = useContext(FontSizeContext)!;
  const t = contactUsTranslations[language];

  const handleContactSubmit = (formData: { name: string; email: string; subject: string; message: string }) => {
    console.log("Contact Form Submitted:", formData);
    // In a real application, you would send this data to a backend API
  };

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

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-card p-6 rounded-lg shadow-md border border-border flex flex-col justify-center">
              <h2 className={`text-2xl font-bold text-primary mb-6 ${fontSizeClasses[fontSize]}`}>
                {t.contactInfoTitle}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 text-primary" />
                  <p className={fontSizeClasses[fontSize]}>{t.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <p className={fontSizeClasses[fontSize]}>{t.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <p className={fontSizeClasses[fontSize]}>{t.phone}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm onContactSubmit={handleContactSubmit} fontSizeClass={fontSizeClasses[fontSize]} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUsPage;

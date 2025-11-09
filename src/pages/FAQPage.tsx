import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocialSidebar } from '@/components/SocialSidebar';
import { ChatBot } from '@/components/ChatBot';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React, { useContext } from 'react';
import { LanguageContext, FontSizeContext } from '../App';

const faqTranslations = {
  en: {
    pageTitle: 'Frequently Asked Questions',
    q1: 'What is PGRKAM?',
    a1: 'PGRKAM is a portal dedicated to employment generation, skill development, and training initiatives by the Government of Punjab, India.',
    q2: 'How can I search for jobs?',
    a2: 'You can use the search form on the homepage to filter jobs by type, qualification, experience, and location, or search by job title or organization name.',
    q3: 'How do I apply for a job?',
    a3: 'After viewing job details, you can either apply directly through the chatbot or navigate to a dedicated application form page.',
    q4: 'Is there support for persons with disabilities?',
    a4: 'Yes, we have dedicated sections for jobs for persons with disabilities and offer counselling services.',
    q5: 'Can I change the website\'s language?',
    a5: 'Yes, you can change the website language (English, Punjabi, Hindi) using the language selectors in the header.',
    q6: 'How do I adjust the font size?',
    a6: 'You can adjust the font size using the A+ and A- buttons available in the header.',
  },
  hi: {
    pageTitle: 'अक्सर पूछे जाने वाले प्रश्न',
    q1: 'पीजीआरकेएम क्या है?',
    a1: 'पीजीआरकेएम भारत के पंजाब सरकार द्वारा रोजगार सृजन, कौशल विकास और प्रशिक्षण पहलों के लिए समर्पित एक पोर्टल है।',
    q2: 'मैं नौकरियों की खोज कैसे कर सकता हूँ?',
    a2: 'आप प्रकार, योग्यता, अनुभव और स्थान के अनुसार नौकरियों को फ़िल्टर करने के लिए होमपेज पर खोज फ़ॉर्म का उपयोग कर सकते हैं, या नौकरी के शीर्षक या संगठन के नाम से खोज सकते हैं।',
    q3: 'मैं नौकरी के लिए कैसे आवेदन करूँ?',
    a3: 'नौकरी का विवरण देखने के बाद, आप सीधे चैटबॉट के माध्यम से आवेदन कर सकते हैं या एक समर्पित आवेदन फ़ॉर्म पृष्ठ पर जा सकते हैं।',
    q4: 'क्या विकलांग व्यक्तियों के लिए कोई सहायता है?',
    a4: 'हाँ, हमारे पास विकलांग व्यक्तियों के लिए नौकरियों के लिए समर्पित अनुभाग हैं और हम परामर्श सेवाएँ प्रदान करते हैं।',
    q5: 'क्या मैं वेबसाइट की भाषा बदल सकता हूँ?',
    a5: 'हाँ, आप हेडर में भाषा चयनकर्ताओं का उपयोग करके वेबसाइट की भाषा (अंग्रेजी, पंजाबी, हिंदी) बदल सकते हैं।',
    q6: 'मैं फ़ॉन्ट आकार कैसे समायोजित करूँ?',
    a6: 'आप हेडर में उपलब्ध ए+ और ए- बटन का उपयोग करके फ़ॉन्ट आकार समायोजित कर सकते हैं।',
  },
  pa: {
    pageTitle: 'ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ',
    q1: 'ਪੀ.ਜੀ.ਆਰ.ਕੇ.ਏ.ਐਮ. ਕੀ ਹੈ?',
    a1: 'ਪੀ.ਜੀ.ਆਰ.ਕੇ.ਏ.ਐਮ. ਭਾਰਤ ਦੇ ਪੰਜਾਬ ਸਰਕਾਰ ਦੁਆਰਾ ਰੁਜ਼ਗਾਰ ਉਤਪੱਤੀ, ਹੁਨਰ ਵਿਕਾਸ ਅਤੇ ਸਿਖਲਾਈ ਪਹਿਲਕਦਮੀਆਂ ਨੂੰ ਸਮਰਪਿਤ ਇੱਕ ਪੋਰਟਲ ਹੈ।',
    q2: 'ਮੈਂ ਨੌਕਰੀਆਂ ਕਿਵੇਂ ਲੱਭ ਸਕਦਾ ਹਾਂ?',
    a2: 'ਤੁਸੀਂ ਹੋਮਪੇਜ \'ਤੇ ਖੋਜ ਫਾਰਮ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕਿਸਮ, ਯੋਗਤਾ, ਅਨੁਭਵ ਅਤੇ ਸਥਾਨ ਅਨੁਸਾਰ ਨੌਕਰੀਆਂ ਨੂੰ ਫਿਲਟਰ ਕਰ ਸਕਦੇ ਹੋ, ਜਾਂ ਨੌਕਰੀ ਦੇ ਸਿਰਲੇਖ ਜਾਂ ਸੰਗਠਨ ਦੇ ਨਾਮ ਦੁਆਰਾ ਖੋਜ ਕਰ ਸਕਦੇ ਹੋ।',
    q3: 'ਮੈਂ ਨੌਕਰੀ ਲਈ ਕਿਵੇਂ ਅਪਲਾਈ ਕਰਾਂ?',
    a3: 'ਨੌਕਰੀ ਦੇ ਵੇਰਵੇ ਵੇਖਣ ਤੋਂ ਬਾਅਦ, ਤੁਸੀਂ ਸਿੱਧੇ ਚੈਟਬੋਟ ਰਾਹੀਂ ਅਪਲਾਈ ਕਰ ਸਕਦੇ ਹੋ ਜਾਂ ਇੱਕ ਸਮਰਪਿਤ ਅਰਜ਼ੀ ਫਾਰਮ ਪੰਨੇ \'ਤੇ ਜਾ ਸਕਦੇ ਹੋ।',
    q4: 'ਕੀ ਅਪਾਹਜ ਵਿਅਕਤੀਆਂ ਲਈ ਕੋਈ ਸਹਾਇਤਾ ਹੈ?',
    a4: 'ਹਾਂ, ਸਾਡੇ ਕੋਲ ਅਪਾਹਜ ਵਿਅਕਤੀਆਂ ਲਈ ਨੌਕਰੀਆਂ ਲਈ ਸਮਰਪਿਤ ਭਾਗ ਹਨ ਅਤੇ ਅਸੀਂ ਸਲਾਹ ਸੇਵਾਵਾਂ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਾਂ।',
    q5: 'ਕੀ ਮੈਂ ਵੈਬਸਾਈਟ ਦੀ ਭਾਸ਼ਾ ਬਦਲ ਸਕਦਾ ਹਾਂ?',
    a5: 'ਹਾਂ, ਤੁਸੀਂ ਹੈਡਰ ਵਿੱਚ ਭਾਸ਼ਾ ਚੋਣਕਾਰਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਵੈਬਸਾਈਟ ਦੀ ਭਾਸ਼ਾ (ਅੰਗਰੇਜ਼ੀ, ਪੰਜਾਬੀ, ਹਿੰਦੀ) ਬਦਲ ਸਕਦੇ ਹੋ।',
    q6: 'ਮੈਂ ਫੌਂਟ ਦਾ ਆਕਾਰ ਕਿਵੇਂ ਐਡਜਸਟ ਕਰਾਂ?',
    a6: 'ਤੁਸੀਂ ਹੈਡਰ ਵਿੱਚ ਉਪਲਬਧ ਏ+ ਅਤੇ ਏ- ਬਟਨਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਫੌਂਟ ਦਾ ਆਕਾਰ ਐਡਜਸਟ ਕਰ ਸਕਦੇ ਹੋ।',
  },
};

const fontSizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const FAQPage = () => {
  const { language } = useContext(LanguageContext)!;
  const { fontSize } = useContext(FontSizeContext)!;
  const t = faqTranslations[language];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SocialSidebar />
      <ChatBot />

      <div className="flex-1 py-12 px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h1 className={`text-4xl font-bold mb-8 text-center ${fontSizeClasses[fontSize]}`}>
            {t.pageTitle}
          </h1>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className={fontSizeClasses[fontSize]}>{t.q1}</AccordionTrigger>
              <AccordionContent className={fontSizeClasses[fontSize]}>
                {t.a1}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className={fontSizeClasses[fontSize]}>{t.q2}</AccordionTrigger>
              <AccordionContent className={fontSizeClasses[fontSize]}>
                {t.a2}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className={fontSizeClasses[fontSize]}>{t.q3}</AccordionTrigger>
              <AccordionContent className={fontSizeClasses[fontSize]}>
                {t.a3}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className={fontSizeClasses[fontSize]}>{t.q4}</AccordionTrigger>
              <AccordionContent className={fontSizeClasses[fontSize]}>
                {t.a4}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className={fontSizeClasses[fontSize]}>{t.q5}</AccordionTrigger>
              <AccordionContent className={fontSizeClasses[fontSize]}>
                {t.a5}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className={fontSizeClasses[fontSize]}>{t.q6}</AccordionTrigger>
              <AccordionContent className={fontSizeClasses[fontSize]}>
                {t.a6}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQPage;

import logo from '@/assets/pgrkam-logo.png';
import { MapPin, Mail, Phone } from 'lucide-react';
import React, { useContext } from 'react'; // Import useContext
import { LanguageContext, FontSizeContext } from '../App'; // Import LanguageContext and FontSizeContext

const footerTranslations = {
  en: {
    updatedOn: 'Updated On:',
    websiteVisitCount: 'Website Visit Count:',
    contactUs: 'Contact Us',
    pgrkamMission: 'Punjab Ghar Ghar Rozgar and Karobar Mission',
    address1: 'SCO 149-152, 2nd Floor, Sector 17C, Chandigarh',
    email1: 'pgrkam.degt@gmail.com',
    phone1: '0172-5011184-186',
    psdmMission: 'Punjab Skill Development Mission',
    address2: 'SCO 149-152, 2nd Floor, Sector-17C, Chandigarh',
    email2: 'secy.skill@psdm.gov.in',
    phone2: '0172-2720152',
    aboutPolicies: 'About & Policies',
    copyright: 'Copyright',
    privacyPolicy: 'Privacy policy',
    faqs: 'FAQs',
    sitemap: 'Sitemap',
    help: 'Help',
    giveFeedback: 'Give Feedback',
    careerInformation: 'Career Information',
    contactUsLink: 'Contact us',
    footerNote1: 'Portal is best viewed in IE 10 and above, supports Chrome, Firefox Browsers with 1024 x 768 resolution and above.',
    footerNote2: '© 2025, All Rights Reserved by Department of Employment Generation, Skill Development & Training (DEGSDT)',
  },
  hi: {
    updatedOn: 'अद्यतनित तिथि:',
    websiteVisitCount: 'वेबसाइट पर विज़िट की संख्या:',
    contactUs: 'हमसे संपर्क करें',
    pgrkamMission: 'पंजाब घर घर रोजगार और कारोबार मिशन',
    address1: 'एससीओ 149-152, दूसरी मंजिल, सेक्टर 17सी, चंडीगढ़',
    email1: 'pgrkam.degt@gmail.com',
    phone1: '0172-5011184-186',
    psdmMission: 'पंजाब कौशल विकास मिशन',
    address2: 'एससीओ 149-152, दूसरी मंजिल, सेक्टर-17सी, चंडीगढ़',
    email2: 'secy.skill@psdm.gov.in',
    phone2: '0172-2720152',
    aboutPolicies: 'के बारे में और नीतियां',
    copyright: 'कॉपीराइट',
    privacyPolicy: 'गोपनीयता नीति',
    faqs: 'अक्सर पूछे जाने वाले प्रश्न',
    sitemap: 'साइटमैप',
    help: 'मदद',
    giveFeedback: 'प्रतिक्रिया दें',
    careerInformation: 'करियर की जानकारी',
    contactUsLink: 'हमसे संपर्क करें',
    footerNote1: 'पोर्टल को IE 10 और उससे ऊपर के संस्करणों में सबसे अच्छा देखा जाता है, 1024 x 768 रिज़ॉल्यूशन और उससे ऊपर के क्रोम, फ़ायरफ़ॉक्स ब्राउज़रों का समर्थन करता है।',
    footerNote2: '© 2025, रोजगार सृजन, कौशल विकास और प्रशिक्षण विभाग (DEGSDT) द्वारा सभी अधिकार सुरक्षित',
  },
  pa: {
    updatedOn: 'ਅੱਪਡੇਟ ਕੀਤਾ ਗਿਆ:',
    websiteVisitCount: 'ਵੈੱਬਸਾਈਟ ਵਿਜ਼ਿਟ ਕਾਉਂਟ:',
    contactUs: 'ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
    pgrkamMission: 'ਪੰਜਾਬ ਘਰ ਘਰ ਰੁਜ਼ਗਾਰ ਅਤੇ ਕਾਰੋਬਾਰ ਮਿਸ਼ਨ',
    address1: 'SCO 149-152, 2nd Floor, Sector 17C, ਚੰਡੀਗੜ੍ਹ',
    email1: 'pgrkam.degt@gmail.com',
    phone1: '0172-5011184-186',
    psdmMission: 'ਪੰਜਾਬ ਹੁਨਰ ਵਿਕਾਸ ਮਿਸ਼ਨ',
    address2: 'SCO 149-152, 2nd Floor, Sector-17C, ਚੰਡੀਗੜ੍ਹ',
    email2: 'secy.skill@psdm.gov.in',
    phone2: '0172-2720152',
    aboutPolicies: 'ਬਾਰੇ ਅਤੇ ਨੀਤੀਆਂ',
    copyright: 'ਕਾਪੀਰਾਈਟ',
    privacyPolicy: 'ਗੋਪਨੀਯਤਾ ਨੀਤੀ',
    faqs: 'ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ',
    sitemap: 'ਸਾਈਟਮੈਪ',
    help: 'ਮਦਦ',
    giveFeedback: 'ਫੀਡਬੈਕ ਦਿਓ',
    careerInformation: 'ਕੈਰੀਅਰ ਦੀ ਜਾਣਕਾਰੀ',
    contactUsLink: 'ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
    footerNote1: 'ਪੋਰਟਲ ਨੂੰ IE 10 ਅਤੇ ਇਸ ਤੋਂ ਉੱਪਰ, 1024 x 768 ਰੈਜ਼ੋਲਿਊਸ਼ਨ ਅਤੇ ਇਸ ਤੋਂ ਉੱਪਰ ਵਾਲੇ Chrome, Firefox ਬ੍ਰਾਊਜ਼ਰਾਂ ਦਾ ਸਮਰਥਨ ਕਰਦਾ ਹੈ।',
    footerNote2: '© 2025, ਰੁਜ਼ਗਾਰ ਉਤਪੱਤੀ, ਹੁਨਰ ਵਿਕਾਸ ਅਤੇ ਸਿਖਲਾਈ ਵਿਭਾਗ (DEGSDT) ਦੁਆਰਾ ਸਾਰੇ ਅਧਿਕਾਰ ਰਾਖਵੇਂ ਹਨ।',
  },
};

const fontSizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export const Footer = () => {
  const { language } = useContext(LanguageContext)!;
  const { fontSize } = useContext(FontSizeContext)!;
  const t = footerTranslations[language];

  return (
    <footer className="bg-muted py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo and Info */}
        <div className="flex flex-col items-center">
          <img src={logo} alt="PGRKAM Logo" className="w-32 h-32 mb-4" />
          <div className="bg-primary text-primary-foreground px-6 py-3 rounded-lg mb-4">
            <p className={`font-bold ${fontSizeClasses[fontSize]}`}>{t.updatedOn}</p>
            <p className={`text-2xl tracking-wider ${fontSizeClasses[fontSize]}`}>31/10/2025</p>
          </div>
          <div className="bg-primary text-primary-foreground px-6 py-3 rounded-lg">
            <p className={`font-bold ${fontSizeClasses[fontSize]}`}>{t.websiteVisitCount}</p>
            <p className={`text-2xl tracking-wider ${fontSizeClasses[fontSize]}`}>13808551</p>
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className={`text-2xl font-bold mb-6 ${fontSizeClasses[fontSize]}`}>{t.contactUs}</h3>
          
          <div className="mb-6">
            <h4 className={`font-bold mb-2 ${fontSizeClasses[fontSize]}`}>{t.pgrkamMission}</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <p className={fontSizeClasses[fontSize]}>{t.address1}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                <p className={fontSizeClasses[fontSize]}>{t.email1}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                <p className={fontSizeClasses[fontSize]}>{t.phone1}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className={`font-bold mb-2 ${fontSizeClasses[fontSize]}`}>{t.psdmMission}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <p className={fontSizeClasses[fontSize]}>{t.address2}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                <p className={fontSizeClasses[fontSize]}>{t.email2}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                <p className={fontSizeClasses[fontSize]}>{t.phone2}</p>
              </div>
            </div>
          </div>
        </div>

        {/* About & Policies */}
        <div>
          <h3 className={`text-2xl font-bold mb-6 ${fontSizeClasses[fontSize]}`}>{t.aboutPolicies}</h3>
          <ul className="space-y-3">
            <li>
              <a href="/copyright" className={`hover:text-primary transition-colors ${fontSizeClasses[fontSize]}`}>
                {t.copyright}
              </a>
            </li>
            <li>
              <a href="/privacy" className={`hover:text-primary transition-colors ${fontSizeClasses[fontSize]}`}>
                {t.privacyPolicy}
              </a>
            </li>
            <li>
              <a href="/faqs" className={`hover:text-primary transition-colors ${fontSizeClasses[fontSize]}`}>
                {t.faqs}
              </a>
            </li>
            <li>
              <a href="/sitemap" className={`hover:text-primary transition-colors ${fontSizeClasses[fontSize]}`}>
                {t.sitemap}
              </a>
            </li>
            <li>
              <a href="/help" className={`hover:text-primary transition-colors ${fontSizeClasses[fontSize]}`}>
                {t.help}
              </a>
            </li>
            <li>
              <a href="/feedback" className={`hover:text-primary transition-colors ${fontSizeClasses[fontSize]}`}>
                {t.giveFeedback}
              </a>
            </li>
            <li>
              <a href="/career" className={`hover:text-primary transition-colors ${fontSizeClasses[fontSize]}`}>
                {t.careerInformation}
              </a>
            </li>
            <li>
              <a href="/contact" className={`hover:text-primary transition-colors ${fontSizeClasses[fontSize]}`}>
                {t.contactUsLink}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="container mx-auto mt-12 pt-6 border-t border-border text-center">
        <p className={`text-sm ${fontSizeClasses[fontSize]}`}>
          {t.footerNote1}
        </p>
        <p className={`text-sm mt-2 ${fontSizeClasses[fontSize]}`}>
          {t.footerNote2}
        </p>
      </div>
    </footer>
  );
};

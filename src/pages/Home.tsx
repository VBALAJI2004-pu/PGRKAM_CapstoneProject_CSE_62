import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocialSidebar } from '@/components/SocialSidebar';
import { ChatBot } from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { LanguageContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { searchJobs } from '../data/jobsData';
import { FontSizeContext } from '../App';
import {
  Briefcase,
  GraduationCap,
  Users,
  UserCheck,
  Accessibility,
  Shield,
  MessageSquare,
  Download,
  Calendar as CalendarIcon, // Renamed to avoid conflict with UI Calendar
  PlayCircle,
  X, // Import the X icon for the close button
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar'; // Import UI Calendar component
import { cn } from '@/lib/utils';

// Placeholder imports for testimonial images
import testimonial1 from '../assets/video_testimonial1.jpg';
import testimonial2 from '../assets/video_testimonial2.jpg';
import testimonial3 from '../assets/video_testimonial3.jpg';

const homeTranslations = {
  en: {
    heroTitle: 'Fill out the form below to search Jobs',
    selectJobType: 'Select job type',
    government: 'Government',
    private: 'Private',
    selectQualification: 'Select Qualification',
    tenthPass: '10th Pass',
    twelfthPass: '12th Pass',
    graduate: 'Graduate',
    postgraduate: 'Post Graduate',
    experience: 'Experience upto (in years)',
    fresher: 'Fresher',
    years0_1: '0-1 years',
    years1_3: '1-3 years',
    years3_5: '3-5 years',
    years5Plus: '5+ years',
    placeOfPosting: 'Place Of Posting',
    or: '—— OR ——',
    enterJobTitle: 'Enter Job Title or Organization Name',
    searchJobs: 'Search Jobs',
    whatTypeJob: 'What type of job you are looking for ?',
    tellUs: 'Tell Us',
    availableGovtJobs: 'Available Govt. Jobs',
    availablePrivateJobs: 'Available Private Jobs',
    registeredJobSeekers: 'Registered Job Seekers',
    registeredEmployers: 'Registered Employers',
    jobs: 'Jobs',
    skillTraining: 'Skill Training',
    selfEmployment: 'Self Employment',
    jobsForWomen: 'Jobs For Women',
    jobsForPWD: 'Jobs For Persons With Disability',
    inductionArmedForces: 'Induction into Armed Forces',
    counselling: 'Counselling',
    viewMoreServices: 'VIEW MORE EMPLOYMENT SERVICES »',
    otherEventsCalendar: 'OTHER EVENTS AND SESSIONS CALENDAR',
    checkBackForEvents: 'Check back for upcoming job fairs, skill development sessions, and recruitment drives.',
    videoTestimonials: 'VIDEO TESTIMONIALS',
    successStory: 'Success Story',
    notifications: 'NOTIFICATIONS',
    postedOn: 'Posted On:',
    clickHereToRead: 'Click here to Read',
    downloads: 'DOWNLOADS',
    downloadForm: 'Download X-1 form (507.7 kb)',
    downloadForm10: 'Download X-10 form (324.1 kb)',
    downloadApplicationForm: 'Download Application Form (1.2 MB)',
    downloadGuidelines: 'Guidelines for Employers (800 KB)',
    megaJobFair: 'MEGA JOB FAIR',
    vocationalGuidance: 'VOCATIONAL GUIDANCE',
    careerCounselling: 'career counselling',
  },
  hi: {
    heroTitle: 'नौकरियों की खोज के लिए नीचे दिया गया फॉर्म भरें',
    selectJobType: 'नौकरी का प्रकार चुनें',
    government: 'सरकारी',
    private: 'निजी',
    selectQualification: 'योग्यता चुनें',
    tenthPass: '10वीं पास',
    twelfthPass: '12वीं पास',
    graduate: 'स्नातक',
    postgraduate: 'स्नातकोत्तर',
    experience: 'अनुभव तक (वर्षों में)',
    fresher: 'फ्रेशर',
    years0_1: '0-1 वर्ष',
    years1_3: '1-3 वर्ष',
    years3_5: '3-5 वर्ष',
    years5Plus: '5+ वर्ष',
    placeOfPosting: 'तैनाती का स्थान',
    or: '—— या ——',
    enterJobTitle: 'नौकरी का शीर्षक या संगठन का नाम दर्ज करें',
    searchJobs: 'नौकरियां खोजें',
    whatTypeJob: 'आप किस प्रकार की नौकरी की तलाश में हैं ?',
    tellUs: 'हमें बताएं',
    availableGovtJobs: 'उपलब्ध सरकारी नौकरियां',
    availablePrivateJobs: 'उपलब्ध निजी नौकरियां',
    registeredJobSeekers: 'पंजीकृत नौकरी चाहने वाले',
    registeredEmployers: 'पंजीकृत नियोक्ता',
    jobs: 'नौकरियां',
    skillTraining: 'कौशल प्रशिक्षण',
    selfEmployment: 'स्वरोजगार',
    jobsForWomen: 'महिलाओं के लिए नौकरियां',
    jobsForPWD: 'दिव्यांग व्यक्तियों के लिए नौकरियां',
    inductionArmedForces: 'सशस्त्र बलों में शामिल होना',
    counselling: 'परामर्श',
    viewMoreServices: 'अधिक रोजगार सेवाएं देखें »',
    otherEventsCalendar: 'अन्य कार्यक्रम और सत्र कैलेंडर',
    checkBackForEvents: 'आगामी नौकरी मेलों, कौशल विकास सत्रों और भर्ती अभियानों के लिए वापस जांचें।',
    videoTestimonials: 'वीडियो प्रशंसापत्र',
    successStory: 'सफलता की कहानी',
    notifications: 'सूचनाएं',
    postedOn: 'पर पोस्ट किया गया:',
    clickHereToRead: 'यहां पढ़ने के लिए क्लिक करें',
    downloads: 'डाउनलोड',
    downloadForm: 'X-1 फॉर्म डाउनलोड करें (507.7 kb)',
    downloadForm10: 'X-10 फॉर्म डाउनलोड करें (324.1 kb)',
    downloadApplicationForm: 'आवेदन फॉर्म डाउनलोड करें (1.2 MB)',
    downloadGuidelines: 'नियोक्ताओं के लिए दिशानिर्देश (800 KB)',
    megaJobFair: 'मेगा जॉब फेयर',
    vocationalGuidance: 'व्यावसायिक मार्गदर्शन',
    careerCounselling: 'करियर काउंसलिंग',
  },
  pa: {
    heroTitle: 'ਨੌਕਰੀਆਂ ਦੀ ਖੋਜ ਲਈ ਹੇਠਾਂ ਦਿੱਤਾ ਫਾਰਮ ਭਰੋ',
    selectJobType: 'ਨੌਕਰੀ ਦੀ ਕਿਸਮ ਚੁਣੋ',
    government: 'ਸਰਕਾਰੀ',
    private: 'ਪ੍ਰਾਈਵੇਟ',
    selectQualification: 'ਯੋਗਤਾ ਚੁਣੋ',
    tenthPass: '10ਵੀਂ ਪਾਸ',
    twelfthPass: '12ਵੀਂ ਪਾਸ',
    graduate: 'ਗ੍ਰੈਜੂਏਟ',
    postgraduate: 'ਪੋਸਟ ਗ੍ਰੈਜੂਏਟ',
    experience: 'ਤਜਰਬਾ ਤੱਕ (ਸਾਲਾਂ ਵਿੱਚ)',
    fresher: 'ਫਰੈਸ਼ਰ',
    years0_1: '0-1 ਸਾਲ',
    years1_3: '1-3 ਸਾਲ',
    years3_5: '3-5 ਸਾਲ',
    years5Plus: '5+ ਸਾਲ',
    placeOfPosting: 'ਤੈਨਾਤੀ ਦਾ ਸਥਾਨ',
    or: '—— ਜਾਂ ——',
    enterJobTitle: 'ਨੌਕਰੀ ਦਾ ਸਿਰਲੇਖ ਜਾਂ ਸੰਗਠਨ ਦਾ ਨਾਮ ਦਾਖਲ ਕਰੋ',
    searchJobs: 'ਨੌਕਰੀਆਂ ਲੱਭੋ',
    whatTypeJob: 'ਤੁਸੀਂ ਕਿਹੋ ਜਿਹੀ ਨੌਕਰੀ ਲੱਭ ਰਹੇ ਹੋ ?',
    tellUs: 'ਸਾਨੂੰ ਦੱਸੋ',
    availableGovtJobs: 'ਉਪਲਬਧ ਸਰਕਾਰੀ ਨੌਕਰੀਆਂ',
    availablePrivateJobs: 'ਉਪਲਬਧ ਪ੍ਰਾਈਵੇਟ ਨੌਕਰੀਆਂ',
    registeredJobSeekers: 'ਰਜਿਸਟਰਡ ਨੌਕਰੀ ਲੱਭਣ ਵਾਲੇ',
    registeredEmployers: 'ਰਜਿਸਟਰਡ ਮਾਲਕ',
    jobs: 'ਨੌਕਰੀਆਂ',
    skillTraining: 'ਹੁਨਰ ਸਿਖਲਾਈ',
    selfEmployment: 'ਸਵੈ-ਰੁਜ਼ਗਾਰ',
    jobsForWomen: 'ਔਰਤਾਂ ਲਈ ਨੌਕਰੀਆਂ',
    jobsForPWD: 'ਅਪਾਹਜ ਵਿਅਕਤੀਆਂ ਲਈ ਨੌਕਰੀਆਂ',
    inductionArmedForces: 'ਹਥਿਆਰਬੰਦ ਸੈਨਾਵਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਣਾ',
    counselling: 'ਕਾਉਂਸਲਿੰਗ',
    viewMoreServices: 'ਹੋਰ ਰੁਜ਼ਗਾਰ ਸੇਵਾਵਾਂ ਵੇਖੋ »',
    otherEventsCalendar: 'ਹੋਰ ਇਵੈਂਟਸ ਅਤੇ ਸੈਸ਼ਨ ਕੈਲੰਡਰ',
    checkBackForEvents: 'ਆਗਾਮੀ ਨੌਕਰੀ ਮੇਲਿਆਂ, ਹੁਨਰ ਵਿਕਾਸ ਸੈਸ਼ਨਾਂ ਅਤੇ ਭਰਤੀ ਮੁਹਿੰਮਾਂ ਲਈ ਵਾਪਸ ਜਾਂਚ ਕਰੋ।',
    videoTestimonials: 'ਵੀਡੀਓ ਪ੍ਰਸੰਸਾ ਪੱਤਰ',
    successStory: 'ਸਫਲਤਾ ਦੀ ਕਹਾਣੀ',
    notifications: 'ਸੂਚਨਾਵਾਂ',
    postedOn: 'ਤੇ ਪੋਸਟ ਕੀਤਾ ਗਿਆ:',
    clickHereToRead: 'ਪੜ੍ਹਨ ਲਈ ਇੱਥੇ ਕਲਿੱਕ ਕਰੋ',
    downloads: 'ਡਾਊਨਲੋਡ',
    downloadForm: 'X-1 ਫਾਰਮ ਡਾਊਨਲੋਡ ਕਰੋ (507.7 kb)',
    downloadForm10: 'X-10 ਫਾਰਮ ਡਾਊਨਲੋਡ ਕਰੋ (324.1 kb)',
    downloadApplicationForm: 'ਅਰਜ਼ੀ ਫਾਰਮ ਡਾਊਨਲੋਡ ਕਰੋ (1.2 MB)',
    downloadGuidelines: 'ਮਾਲਕਾਂ ਲਈ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ (800 KB)',
    megaJobFair: 'ਮੇਗਾ ਜੌਬ ਫੇਅਰ',
    vocationalGuidance: 'ਵੋਕੇਸ਼ਨਲ ਗਾਈਡੈਂਸ',
    careerCounselling: 'ਕੈਰੀਅਰ ਕਾਉਂਸਲਿੰਗ',
  },
};

const fontSizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const testimonialImages = [testimonial1, testimonial2, testimonial3];

const Home = () => {
  const { language } = useContext(LanguageContext)!;
  const { fontSize } = useContext(FontSizeContext)!;
  const t = homeTranslations[language];
  const navigate = useNavigate();

  const [jobType, setJobType] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [placeOfPosting, setPlaceOfPosting] = useState('');
  const [jobTitleOrOrg, setJobTitleOrOrg] = useState('');
  const [showNotificationSidebar, setShowNotificationSidebar] = useState(true); // State to control sidebar visibility

  // For video testimonials carousel
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const testimonialContainerRef = useRef<HTMLDivElement>(null);
  // Duplicate images enough times to ensure seamless scrolling
  const duplicatedTestimonials = [...testimonialImages, ...testimonialImages, ...testimonialImages]; 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex(prevIndex => prevIndex + 1);
    }, 2000); // Move every 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!testimonialContainerRef.current) return;

    const container = testimonialContainerRef.current;
    const cardWidthWithGap = (container.children[0]?.clientWidth || 0) + 24; // Card width + gap (mr-6 = 24px)
    const originalSetLength = testimonialImages.length;

    const handleTransitionEnd = () => {
      if (currentTestimonialIndex >= originalSetLength) {
        // Instantly reset position to the start of the duplicated content without animation
        container.style.transitionDuration = '0s';
        container.style.transform = `translateX(-${(currentTestimonialIndex - originalSetLength) * cardWidthWithGap}px)`;
        setCurrentTestimonialIndex(currentTestimonialIndex - originalSetLength); // Reset index
        
        // Re-enable transition after the instant jump
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            container.style.transitionDuration = '0.5s';
          });
        });
      }
    };

    container.addEventListener('transitionend', handleTransitionEnd);

    // Cleanup event listener on unmount
    return () => {
      container.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [currentTestimonialIndex, testimonialImages.length]);

  const employmentServices = [
    { icon: Briefcase, title: t.jobs, link: '/jobs/jobs', color: 'bg-purple-100' },
    { icon: GraduationCap, title: t.skillTraining, link: '/jobs/skill-training', color: 'bg-orange-100' },
    { icon: Users, title: t.selfEmployment, link: '/jobs/self-employment', color: 'bg-purple-100' },
    { icon: UserCheck, title: t.jobsForWomen, link: '/jobs/women', color: 'bg-red-100' },
    { icon: Accessibility, title: t.jobsForPWD, link: '/jobs/disability', color: 'bg-gray-100' },
    { icon: Shield, title: t.inductionArmedForces, link: '/jobs/armed-forces', color: 'bg-teal-100' },
    { icon: MessageSquare, title: t.counselling, link: '/jobs/counselling', color: 'bg-blue-100' },
  ];

  const handleSearch = () => {
    const query = {
      jobType,
      qualification,
      experience,
      placeOfPosting,
      jobTitleOrOrg,
    };
    console.log("Searching with:", query);
    navigate('/jobs/listings', { state: { query } });
  };

  const events = [
    { date: new Date(2025, 10, 1), type: 'job_fair', title: t.megaJobFair, color: 'bg-blue-500' },
    { date: new Date(2025, 10, 7), type: 'guidance', title: t.vocationalGuidance, color: 'bg-green-500' },
    { date: new Date(2025, 10, 7), type: 'guidance', title: t.vocationalGuidance, color: 'bg-green-500' },
    { date: new Date(2025, 10, 7), type: 'guidance', title: t.vocationalGuidance, color: 'bg-green-500' },
    { date: new Date(2025, 10, 16), type: 'counselling', title: t.careerCounselling, color: 'bg-purple-500' },
  ];

  const getDayEvents = (date: Date) => {
    return events.filter(event =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <SocialSidebar />
      <ChatBot />

      <main className="flex-grow">
        {/* Hero Section - Job Search Form */}
        <section className="relative bg-gradient-to-br from-slate-900 to-slate-700 text-white py-16 px-6">
          <div className="container mx-auto relative z-10">
            <h1 className={`text-4xl font-bold text-center mb-8 ${fontSizeClasses[fontSize]}`}>{t.heroTitle}</h1>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Select onValueChange={setJobType} value={jobType}>
                  <SelectTrigger className={`bg-white text-foreground ${fontSizeClasses[fontSize]}`}>
                    <SelectValue placeholder={t.selectJobType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="government" className={fontSizeClasses[fontSize]}>{t.government}</SelectItem>
                    <SelectItem value="private" className={fontSizeClasses[fontSize]}>{t.private}</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={setQualification} value={qualification}>
                  <SelectTrigger className={`bg-white text-foreground ${fontSizeClasses[fontSize]}`}>
                    <SelectValue placeholder={t.selectQualification} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10th" className={fontSizeClasses[fontSize]}>{t.tenthPass}</SelectItem>
                    <SelectItem value="12th" className={fontSizeClasses[fontSize]}>{t.twelfthPass}</SelectItem>
                    <SelectItem value="graduate" className={fontSizeClasses[fontSize]}>{t.graduate}</SelectItem>
                    <SelectItem value="postgraduate" className={fontSizeClasses[fontSize]}>{t.postgraduate}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select onValueChange={setExperience} value={experience}>
                  <SelectTrigger className={`bg-white text-foreground ${fontSizeClasses[fontSize]}`}>
                    <SelectValue placeholder={t.experience} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0" className={fontSizeClasses[fontSize]}>{t.fresher}</SelectItem>
                    <SelectItem value="1" className={fontSizeClasses[fontSize]}>{t.years0_1}</SelectItem>
                    <SelectItem value="3" className={fontSizeClasses[fontSize]}>{t.years1_3}</SelectItem>
                    <SelectItem value="5" className={fontSizeClasses[fontSize]}>{t.years3_5}</SelectItem>
                    <SelectItem value="5+" className={fontSizeClasses[fontSize]}>{t.years5Plus}</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder={t.placeOfPosting}
                  className={`bg-white text-foreground ${fontSizeClasses[fontSize]}`}
                  value={placeOfPosting}
                  onChange={(e) => setPlaceOfPosting(e.target.value)}
                />
              </div>

              <div className={`text-center ${fontSizeClasses[fontSize]}`}>{t.or}</div>

              <Input
                placeholder={t.enterJobTitle}
                className={`bg-white text-foreground ${fontSizeClasses[fontSize]}`}
                value={jobTitleOrOrg}
                onChange={(e) => setJobTitleOrOrg(e.target.value)}
              />

              <Button onClick={handleSearch} className={`w-full bg-primary hover:bg-primary/90 ${fontSizeClasses[fontSize]}`}>
                {t.searchJobs}
              </Button>

              <div className="flex justify-between items-center text-sm">
                <span className={fontSizeClasses[fontSize]}>{t.whatTypeJob}</span>
                <Button variant="secondary" size="sm" className={`bg-primary hover:bg-primary/90 ${fontSizeClasses[fontSize]}`}>
                    {t.tellUs}
                  </Button>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="container mx-auto mt-8">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/95">
                <CardContent className="p-6 text-center">
                  <p className={`font-bold text-primary mb-2 text-4xl ${fontSizeClasses[fontSize]}`}>19460</p>
                  <p className={`font-semibold ${fontSizeClasses[fontSize]}`}>{t.availableGovtJobs}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/95">
                <CardContent className="p-6 text-center">
                  <p className={`font-bold text-primary mb-2 text-4xl ${fontSizeClasses[fontSize]}`}>1364</p>
                  <p className={`font-semibold ${fontSizeClasses[fontSize]}`}>{t.availablePrivateJobs}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/95">
                <CardContent className="p-6 text-center">
                  <p className={`font-bold text-primary mb-2 text-4xl ${fontSizeClasses[fontSize]}`}>2225768</p>
                  <p className={`font-semibold ${fontSizeClasses[fontSize]}`}>{t.registeredJobSeekers}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/95">
                <CardContent className="p-6 text-center">
                  <p className={`font-bold text-primary mb-2 text-4xl ${fontSizeClasses[fontSize]}`}>20441</p>
                  <p className={`font-semibold ${fontSizeClasses[fontSize]}`}>{t.registeredEmployers}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Employment Services */}
        <section className="py-12 px-6 bg-background">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {employmentServices.slice(0, 4).map((service, index) => (
                <Link to={service.link} key={index}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className={`${service.color} p-4 rounded-full mb-4`}>
                        <service.icon className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className={`font-bold ${fontSizeClasses[fontSize]}`}>{service.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {employmentServices.slice(4).map((service, index) => (
                <Link to={service.link} key={index}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className={`${service.color} p-4 rounded-full mb-4`}>
                        <service.icon className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className={`font-bold ${fontSizeClasses[fontSize]}`}>{service.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" className={`text-primary border-primary hover:bg-primary hover:text-white ${fontSizeClasses[fontSize]}`} asChild>
                <Link to="/more-services">
                  {t.viewMoreServices}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="py-12 px-6 bg-muted">
          <div className="container mx-auto">
            <div className="bg-primary text-primary-foreground text-center py-4 rounded-t-lg">
              <h2 className={`font-bold flex items-center justify-center gap-2 text-2xl ${fontSizeClasses[fontSize]}`}>
                <CalendarIcon className="w-6 h-6" />
                {t.otherEventsCalendar}
              </h2>
            </div>
            <div className="bg-white p-8 rounded-b-lg">
              <p className={`text-center text-muted-foreground ${fontSizeClasses[fontSize]}`}>
                {t.checkBackForEvents}
              </p>
              <div className="flex justify-center mt-4">
                <div className="w-full max-w-full lg:max-w-4xl border rounded-md shadow bg-card">
                  <div className="flex justify-between items-center p-4 border-b">
                    <div className="flex space-x-2">
                      <Button variant="outline" className={fontSizeClasses[fontSize]}>Today</Button>
                      <Button variant="outline" className={fontSizeClasses[fontSize]}>Back</Button>
                      <Button variant="outline" className={fontSizeClasses[fontSize]}>Next</Button>
                    </div>
                    <h3 className={`font-bold ${fontSizeClasses[fontSize]}`}>November 2025</h3>
                    <div className="flex space-x-2">
                      <Button variant="secondary" className={cn(fontSizeClasses[fontSize], "bg-primary text-primary-foreground hover:bg-primary/90")}>Month</Button>
                      <Button variant="outline" className={fontSizeClasses[fontSize]}>Week</Button>
                      <Button variant="outline" className={fontSizeClasses[fontSize]}>Day</Button>
                      <Button variant="outline" className={fontSizeClasses[fontSize]}>Agenda</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 text-center border-b bg-muted text-muted-foreground">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className={`p-2 font-semibold ${fontSizeClasses[fontSize]}`}>{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 auto-rows-[100px] gap-px bg-border-2">
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                      const date = new Date(2025, 10, day); // November 2025
                      const dayEvents = getDayEvents(date);
                      const isCurrentMonth = date.getMonth() === 10; // November
                      const isToday = date.getDate() === 7 && date.getMonth() === 10 && date.getFullYear() === 2025; // Nov 7, 2025

                      return (
                        <div
                          key={day}
                          className={cn(
                            "p-1 border-r border-b border-border-2 overflow-hidden",
                            isCurrentMonth ? "bg-background" : "bg-muted",
                            (day === 1 || day === 7 || day === 16) && "bg-blue-50/50", // Highlight days with events
                            isToday && "border-primary border-2",
                            'relative flex flex-col'
                          )}
                        >
                          <span className={`text-sm font-medium text-right ${fontSizeClasses[fontSize]} ${isToday ? 'text-primary' : ''}`}>
                            {day}
                          </span>
                          <div className="flex-1 overflow-y-auto space-y-0.5 mt-1">
                            {dayEvents.slice(0, 2).map((event, eventIndex) => (
                              <div key={eventIndex} className={cn(
                                "text-xs leading-tight rounded-sm px-1 py-0.5 truncate",
                                event.color,
                                event.type === 'job_fair' ? "text-white" : "text-black",
                                fontSizeClasses[fontSize],
                              )}>
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <span className={cn("block text-xs text-muted-foreground", fontSizeClasses[fontSize])}>
                                +{dayEvents.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Testimonials */}
        <section className="py-12 px-6 bg-background">
          <div className="container mx-auto">
            <div className="bg-primary text-primary-foreground text-center py-4 rounded-lg mb-8">
              <h2 className={`font-bold flex items-center justify-center gap-2 text-2xl ${fontSizeClasses[fontSize]}`}>
                <PlayCircle className="w-6 h-6" />
                {t.videoTestimonials}
              </h2>
            </div>
            <div className="overflow-hidden relative">
              <div 
                ref={testimonialContainerRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonialIndex * ((testimonialContainerRef.current?.children[0]?.clientWidth || 0) + 24)}px)` // Card width + gap
                }}
              >
                {duplicatedTestimonials.map((image, index) => (
                  <Card key={index} className="flex-shrink-0 w-80 mr-6 overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <img src={image} alt={`Testimonial ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <p className={`text-sm ${fontSizeClasses[fontSize]}`}>{t.successStory} {index % testimonialImages.length + 1}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Notifications Sidebar */}
        {showNotificationSidebar && (
          <aside className="fixed right-6 bottom-1 w-80 bg-white shadow-xl rounded-lg overflow-hidden z-40">
            <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
              <h3 className={`font-bold text-lg ${fontSizeClasses[fontSize]}`}>{t.notifications}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotificationSidebar(false)}
                className="text-primary-foreground hover:bg-primary/80"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
              <div>
                <p className={`text-muted-foreground mb-1 text-xs ${fontSizeClasses[fontSize]}`}>{t.postedOn} 29-01-2024</p>
                <h4 className={`font-semibold mb-2 text-sm ${fontSizeClasses[fontSize]}`}>Recruitment of Assistant Loco Pilot(ALP) - 01/24</h4>
                <Link to="/notification/1" className={`text-primary flex items-center gap-1 text-sm ${fontSizeClasses[fontSize]}`}>
                  <Download className="w-4 h-4" />
                  {t.clickHereToRead}
                </Link>
              </div>
              <div>
                <p className={`text-muted-foreground mb-1 text-xs ${fontSizeClasses[fontSize]}`}>{t.postedOn} 22-01-2024</p>
                <h4 className={`font-semibold mb-2 text-sm ${fontSizeClasses[fontSize]}`}>Hiring of Vehicles under PSDM</h4>
                <Link to="/notification/2" className={`text-primary flex items-center gap-1 text-sm ${fontSizeClasses[fontSize]}`}>
                  <Download className="w-4 h-4" />
                  {t.clickHereToRead}
                </Link>
              </div>
              <div>
                <p className={`text-muted-foreground mb-1 text-xs ${fontSizeClasses[fontSize]}`}>{t.postedOn} 15-01-2024</p>
                <h4 className={`font-semibold mb-2 text-sm ${fontSizeClasses[fontSize]}`}>Vacancy for Data Entry Operator</h4>
                <Link to="/notification/3" className={`text-primary flex items-center gap-1 text-sm ${fontSizeClasses[fontSize]}`}>
                  <Download className="w-4 h-4" />
                  {t.clickHereToRead}
                </Link>
              </div>
              <div>
                <p className={`text-muted-foreground mb-1 text-xs ${fontSizeClasses[fontSize]}`}>{t.postedOn} 01-01-2024</p>
                <h4 className={`font-semibold mb-2 text-sm ${fontSizeClasses[fontSize]}`}>Upcoming Skill Development Workshops</h4>
                <Link to="/notification/4" className={`text-primary flex items-center gap-1 text-sm ${fontSizeClasses[fontSize]}`}>
                  <Download className="w-4 h-4" />
                  {t.clickHereToRead}
                </Link>
              </div>
            </div>
            <div className="bg-primary text-primary-foreground p-4">
              <h3 className={`font-bold text-lg ${fontSizeClasses[fontSize]}`}>{t.downloads}</h3>
            </div>
            <div className="p-4 space-y-2">
              <a href="#" className={`flex items-center gap-2 text-sm hover:text-primary ${fontSizeClasses[fontSize]}`}>
                <Download className="w-4 h-4" />
                {t.downloadForm}
              </a>
              <a href="#" className={`flex items-center gap-2 text-sm hover:text-primary ${fontSizeClasses[fontSize]}`}>
                <Download className="w-4 h-4" />
                {t.downloadApplicationForm}
              </a>
              <a href="#" className={`flex items-center gap-2 text-sm hover:text-primary ${fontSizeClasses[fontSize]}`}>
                <Download className="w-4 h-4" />
                {t.downloadGuidelines}
              </a>
            </div>
          </aside>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default Home;
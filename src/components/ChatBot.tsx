import { useState, useEffect, useRef, useContext } from 'react';
import { Send, Mic, MicOff, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { searchJobs, getJobById, getAllCategories, getJobsByCategory, Job } from '@/data/jobsData';
import logo from '@/assets/pgrkam-logo.png';
import { JobApplicationForm } from './JobApplicationForm';
import { LanguageContext, AuthContext } from '../App'; // Import LanguageContext and AuthContext
import { Link } from 'react-router-dom'; // Import Link

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  jobLinks?: { id: string; title: string }[];
  options?: { label: string; value: string }[];
}

enum ChatStage {
  INITIAL,
  SELECTING_DOMAIN,
  SELECTING_JOB_TYPE,
  LISTING_JOBS,
  DISPLAYING_JOB_DETAILS,
  DISPLAYING_APPLY_FORM,
}

const translations = {
  en: {
    welcome: "Hello! I'm PGRKAM Assistant. I can help you find jobs, training programs, and career guidance in English, Punjabi, and Hindi. How can I assist you today?",
    welcomeUser: (username: string) => `Hello, ${username}! I'm PGRKAM Assistant. How can I assist you today?`, // Personalized welcome
    pleaseLogin: "Please login to chat.", // Login prompt
    placeholder: "Type your message or click mic to speak...",
    listening: "Listening...",
    searchJobs: "I found some relevant opportunities for you:",
    noJobs: "I couldn't find any jobs matching your criteria. Try different keywords or browse by category.",
    help: "I can help you with:\n- Job search\n- Skill training programs\n- Self-employment opportunities\n- Jobs for women\n- Jobs for persons with disabilities\n- Armed forces recruitment\n- Career counselling",
    selectDomain: "Please choose a job domain by typing its number or name:",
    selectJobType: "Are you looking for Government or Private jobs?",
    noMatchingJobs: "I couldn't find any {type} jobs in the {category} domain. Please try a different selection. Returning to main menu.",
    chooseJob: "Please choose a job by typing its number or name to see details:",
    applyNow: "Apply Now",
    jobDetails: (title: string, org: string, location: string, salary: string, description: string, requirements: string[], qualification: string, experience: string) => `**${title}**\nOrganization: ${org}\nLocation: ${location}\nSalary: ${salary}\n\n**Description:**\n${description}\n\n**Requirements:**\n${requirements.map(req => `- ${req}`).join('\n')}\n\n**Qualification:** ${qualification}\n**Experience:** ${experience}`,
    applyFormIntro: "Please fill out this form to apply for the job:",
    formSuccess: "Thank you for applying! Your application has been submitted.",
    formError: "There was an error submitting your application. Please try again.",
    confirmChangeMind: "Are you sure you want to go back to the job listings? You will lose the current application form.",
    yesChooseOtherJob: "Yes, choose another job",
    noStayOnForm: "No, stay on this form",
  },
  hi: {
    welcome: "नमस्ते! मैं PGRKAM सहायक हूं। मैं आपको अंग्रेजी, पंजाबी और हिंदी में नौकरी, प्रशिक्षण कार्यक्रम और करियर मार्गदर्शन खोजने में मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
    welcomeUser: (username: string) => `नमस्ते, ${username}! मैं PGRKAM सहायक हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?`, // Personalized welcome
    pleaseLogin: "कृपया चैट करने के लिए लॉग इन करें।", // Login prompt
    placeholder: "अपना संदेश टाइप करें या बोलने के लिए माइक क्लिक करें...",
    listening: "सुन रहा हूं...",
    searchJobs: "मैंने आपके लिए कुछ प्रासंगिक अवसर पाए:",
    noJobs: "मुझे आपके मानदंड से मेल खाने वाली कोई नौकरी नहीं मिली। विभिन्न कीवर्ड आज़माएं या श्रेणी के अनुसार ब्राउज़ करें।",
    help: "मैं आपकी मदद कर सकता हूं:\n- नौकरी खोज\n- कौशल प्रशिक्षण कार्यक्रम\n- स्वरोजगार के अवसर\n- महिलाओं के लिए नौकरी\n- विकलांग व्यक्तियों के लिए नौकरी\n- सशस्त्र बलों की भर्ती\n- करियर परामर्श",
    selectDomain: "कृपया उसका नंबर या नाम टाइप करके एक नौकरी डोमेन चुनें:",
    selectJobType: "क्या आप सरकारी या निजी नौकरी की तलाश में हैं?",
    noMatchingJobs: "मुझे {category} डोमेन में कोई {type} नौकरी नहीं मिली। कृपया एक अलग चयन का प्रयास करें। मुख्य मेनू पर लौट रहा हूँ।",
    chooseJob: "विवरण देखने के लिए उसका नंबर या नाम टाइप करके एक नौकरी चुनें:",
    applyNow: "अभी आवेदन करें",
    jobDetails: (title: string, org: string, location: string, salary: string, description: string, requirements: string[], qualification: string, experience: string) => `**${title}**\nसंगठन: ${org}\nस्थान: ${location}\nवेतन: ${salary}\n\n**विवरण:**\n${description}\n\n**आवश्यकताएं:**\n${requirements.map(req => `- ${req}`).join('\n')}\n\n**योग्यता:** ${qualification}\n**अनुभव:** ${experience}`,
    applyFormIntro: "नौकरी के लिए आवेदन करने के लिए कृपया यह फॉर्म भरें:",
    formSuccess: "आवेदन करने के लिए धन्यवाद! आपका आवेदन जमा कर दिया गया है।",
    formError: "आपका आवेदन जमा करने में एक त्रुटि थी। कृपया पुनः प्रयास करें।",
    confirmChangeMind: "क्या आप वापस नौकरी सूची पर जाना चाहते हैं? आप वर्तमान आवेदन प्रारूप को खो देंगे।",
    yesChooseOtherJob: "हाँ, दूसरी नौकरी चुनें",
    noStayOnForm: "नहीं, इस प्रारूप पर रहें",
  },
  pa: {
    welcome: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ PGRKAM ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਤੁਹਾਨੂੰ ਅੰਗਰੇਜ਼ੀ, ਪੰਜਾਬੀ ਅਤੇ ਹਿੰਦੀ ਵਿੱਚ ਨੌਕਰੀਆਂ, ਸਿਖਲਾਈ ਪ੍ਰੋਗਰਾਮ ਅਤੇ ਕਰੀਅਰ ਮਾਰਗਦਰਸ਼ਨ ਲੱਭਣ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹੈ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹੈ?",
    welcomeUser: (username: string) => `ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ${username}! ਮੈਂ PGRKAM ਸਹਾਇਕ ਹਾਂ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹੈ?`, // Personalized welcome
    pleaseLogin: "ਕਿਰਪਾ ਕਰਕੇ ਗੱਲਬਾਤ ਕਰਨ ਲਈ ਲੌਗਇਨ ਕਰੋ।", // Login prompt
    placeholder: "ਆਪਣਾ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ ਜਾਂ ਬੋਲਣ ਲਈ ਮਾਈਕ ਕਲਿੱਕ ਕਰੋ...",
    listening: "ਸੁਣ ਰਿਹਾ ਹੈ...",
    searchJobs: "ਮੈਨੂੰ ਤੁਹਾਡੇ ਲਈ ਕੁਝ ਸੰਬੰਧਿਤ ਮੌਕੇ ਮਿਲੇ:",
    noJobs: "ਮੈਨੂੰ ਤੁਹਾਡੇ ਮਾਪਦੰਡ ਨਾਲ ਮੇਲ ਖਾਂਦੀਆਂ ਕੋਈ ਨੌਕਰੀਆਂ ਨਹੀਂ ਮਿਲੀਆਂ। ਵੱਖਰੇ ਕੀਵਰਡ ਅਜ਼ਮਾਓ ਜਾਂ ਸ਼੍ਰੇਣੀ ਦੁਆਰਾ ਬ੍ਰਾਊਜ਼ ਕਰੋ।",
    help: "ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹੈ:\n- ਨੌਕਰੀ ਖੋਜ\n- ਹੁਨਰ ਸਿਖਲਾਈ ਪ੍ਰੋਗਰਾਮ\n- ਸਵੈ-ਰੁਜ਼ਗਾਰ ਦੇ ਮੌਕੇ\n- ਔਰਤਾਂ ਲਈ ਨੌਕਰੀਆਂ\n- ਅਪਾਹਜ ਵਿਅਕਤੀਆਂ ਲਈ ਨੌਕਰੀਆਂ\n- ਹਥਿਆਰਬੰਦ ਬਲਾਂ ਦੀ ਭਰਤੀ\n- ਕਰੀਅਰ ਸਲਾਹ",
    selectDomain: "ਕਿਰਪਾ ਕਰਕੇ ਇਸਦਾ ਨੰਬਰ ਜਾਂ ਨਾਮ ਟਾਈਪ ਕਰਕੇ ਇੱਕ ਨੌਕਰੀ ਡੋਮੇਨ ਚੁਣੋ:",
    selectJobType: "ਕੀ ਤੁਸੀਂ ਸਰਕਾਰੀ ਜਾਂ ਪ੍ਰਾਈਵੇਟ ਨੌਕਰੀਆਂ ਲੱਭ ਰਹੇ ਹੋ?",
    noMatchingJobs: "ਮੈਨੂੰ {category} ਡੋਮੇਨ ਵਿੱਚ ਕੋਈ {type} ਨੌਕਰੀ ਨਹੀਂ ਮਿਲੀ। ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵੱਖਰੀ ਚੋਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ। ਮੁੱਖ ਮੀਨੂ 'ਤੇ ਵਾਪਸ ਜਾ ਰਿਹਾ ਹੈ।",
    chooseJob: "ਵੇਰਵੇ ਵੇਖਣ ਲਈ ਇਸਦਾ ਨੰਬਰ ਜਾਂ ਨਾਮ ਟਾਈਪ ਕਰਕੇ ਇੱਕ ਨੌਕਰੀ ਚੁਣੋ:",
    applyNow: "ਹੁਣੇ ਅਪਲਾਈ ਕਰੋ",
    jobDetails: (title: string, org: string, location: string, salary: string, description: string, requirements: string[], qualification: string, experience: string) => `**${title}**\nਸੰਗਠਨ: ${org}\nਸਥਾਨ: ${location}\nਤਨਖਾਹ: ${salary}\n\n**ਵੇਰਵਾ:**\n${description}\n\n**ਲੋੜਾਂ:**\n${requirements.map(req => `- ${req}`).join('\n')}\n\n**ਯੋਗਤਾ:** ${qualification}\n**ਤਜਰਬਾ:** ${experience}`,
    applyFormIntro: "ਨੌਕਰੀ ਲਈ ਅਰਜ਼ੀ ਦੇਣ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਇਹ ਫਾਰਮ ਭਰੋ:",
    formSuccess: "ਅਰਜ਼ੀ ਦੇਣ ਲਈ ਤੁਹਾਡਾ ਧੰਨਵਾਦ! ਤੁਹਾਡੀ ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਹੋ ਗਈ ਹੈ।",
    formError: "ਤੁਹਾਡੀ ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰਨ ਵਿੱਚ ਇੱਕ ਗਲਤੀ ਆਈ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    confirmChangeMind: "ਕੀ ਤੁਸੀਂ ਵਾਪਸ ਨੌਕਰੀ ਸੂਚੀ ਪਰ ਜਾਣਾ ਚਾਹੁੰਦੇ ਹੋ? ਤੁਸੀਂ ਵਰਤਮਾਨ ਆਵੇਦਨ ਪ੍ਰਾਰੂਪ ਨੂੰ ਖੋ ਦੇਂਗੇ।",
    yesChooseOtherJob: "ਹਾਂ, ਦੂਸਰੀ ਨੌਕਰੀ ਚੁਣੋ",
    noStayOnForm: "ਨਹੀਂ, ਇਸ ਪ੍ਰਾਰੂਪ ਪਰ ਰਹੋ",
  },
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext)!;
  const { user } = useContext(AuthContext)!; // Get user from AuthContext
  const [currentStage, setCurrentStage] = useState<ChatStage>(ChatStage.INITIAL);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedJobType, setSelectedJobType] = useState<'government' | 'private' | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for audio element

  useEffect(() => {
    if (isOpen) {
      if (user) {
        // Logged-in user welcome
        if (messages.length === 0 || messages[0].text === translations[language].pleaseLogin) {
          addBotMessage(translations[language].welcomeUser(user.name));
        }
      } else {
        // Logged-out user prompt to login
        if (messages.length === 0 || !messages[0].text.includes(translations[language].pleaseLogin)) {
          addBotMessage(translations[language].pleaseLogin);
        }
      }
    } else if (isOpen && messages.length > 0) { // Keep existing logic for re-translation on language change/open
      // Re-translate existing messages when language changes or chatbot opens
      const retranslatedMessages = messages.map(msg => {
        if (msg.sender === 'bot') {
          if (user && msg.text === translations['en'].welcome) {
            return { ...msg, text: translations[language].welcomeUser(user.name) };
          } else if (!user && msg.text.includes(translations['en'].welcome)) {
            return { ...msg, text: translations[language].pleaseLogin };
          } else if (msg.text.includes(translations['en'].selectDomain)) {
            const categories = getAllCategories();
            const categoryOptions = categories.map((cat, index) => ({ label: `${index + 1}. ${cat}`, value: cat }));
            return { ...msg, text: translations[language].selectDomain, options: categoryOptions };
          } else if (msg.text.includes(translations['en'].selectJobType)) {
            return { ...msg, text: translations[language].selectJobType, options: [{ label: "Government", value: "government" }, { label: "Private", value: "private" }] };
          } else if (msg.text.includes(translations['en'].searchJobs)) {
            // This part is tricky as it has dynamic job titles. For now, we will not re-translate search results.
            return msg;
          } else if (msg.text.includes(translations['en'].noMatchingJobs.replace('{type}', '').replace('{category}', ''))) {
            // This would also need dynamic replacement, keeping it simple for now
            return { ...msg, text: translations[language].noMatchingJobs.replace('{type}', selectedJobType || '').replace('{category}', selectedCategory || '') };
          }
        }
        return msg;
      });
      setMessages(retranslatedMessages);
    }
  }, [isOpen, messages.length, language, user]); // Added user to dependency array

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    // Initialize audio only once
    if (audioRef.current === null) {
      audioRef.current = new Audio('/public/tun_sound.mp3');
      audioRef.current.volume = 1.0; // Max volume
    }
  }, []);

  const speakMessage = (text: string, lang: 'en' | 'hi' | 'pa') => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'pa' ? 'pa-IN' : lang === 'hi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const addBotMessage = (text: string, jobLinks?: { id: string; title: string }[], options?: { label: string; value: string }[]) => {
    const newMessage: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      sender: 'bot',
      timestamp: new Date(),
      jobLinks,
      options,
    };
    setMessages(prev => [...prev, newMessage]);
    speakMessage(text, language);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleApplicationSubmit = (success: boolean) => {
    console.log("Application Submitted:", success);
    if (success) {
      addBotMessage(translations[language].formSuccess || "Thank you! Your application has been submitted successfully.");
      // Reset to initial stage but keep the chat open
      setCurrentStage(ChatStage.INITIAL);
      setSelectedJob(null);
      setSelectedCategory(null);
      setSelectedJobType(null);
    } else {
      addBotMessage(translations[language].formError || "There was an error submitting your application. Please try again.");
    }
  };

  const detectLanguage = (text: string): 'en' | 'hi' | 'pa' => {
    // Simple language detection based on Unicode ranges
    const hindiRegex = /[\u0900-\u097F]/;
    const punjabiRegex = /[\u0A00-\u0A7F]/;
    
    if (hindiRegex.test(text)) return 'hi';
    if (punjabiRegex.test(text)) return 'pa';
    return 'en';
  };

  const processMessage = (text: string) => {
    const detectedLang = detectLanguage(text);
    // setLanguage(detectedLang); // Removed, as setLanguage is now global and should not be called based on individual messages
    
    const lowerText = text.toLowerCase();

    switch (currentStage) {
      case ChatStage.INITIAL:
        if (lowerText.match(/hello|hi|hey|नमस्ते|ਸਤ ਸ੍ਰੀ ਅਕਾਲ|ਹੈਲੋ/)) {
          addBotMessage(translations[language].welcome);
        } else if (lowerText.match(/help|ਮਦਦ|ਮਦਦ/)) {
          addBotMessage(translations[language].help);
        } else if (lowerText.match(/jobs|job|looking for jobs|ਨੌਕਰੀਆਂ|ਨੌਕਰੀ|ਨੌਕਰੀਆਂ ਲੱਭ ਰਿਹਾ ਹੈ|नौकरियां|नौकरी|नौकरियां ढूंढ रहा है/)) {
          const categories = getAllCategories();
          const categoryOptions = categories.map((cat, index) => ({ label: `${index + 1}. ${cat}`, value: cat }));
          addBotMessage(translations[language].selectDomain, undefined, categoryOptions);
          setCurrentStage(ChatStage.SELECTING_DOMAIN);
        } else if (lowerText === 'choose_other_job') {
          if (selectedCategory && selectedJobType) {
            const filteredJobs = getJobsByCategory(selectedCategory).filter(job => job.type === selectedJobType);
            if (filteredJobs.length > 0) {
              const jobOptions = filteredJobs.map((job, index) => ({ label: `${index + 1}. ${job.title} (${job.organization})`, value: job.id }));
              addBotMessage(`Here are some ${selectedJobType} jobs in ${selectedCategory} domain:`, undefined, jobOptions);
              setCurrentStage(ChatStage.LISTING_JOBS);
            } else {
              addBotMessage(translations[language].noMatchingJobs.replace('{type}', selectedJobType).replace('{category}', selectedCategory));
              setCurrentStage(ChatStage.INITIAL);
            }
          } else {
            addBotMessage("It seems we lost track of the job category or type. Let's start over by searching for jobs.");
            setCurrentStage(ChatStage.INITIAL);
          }
        } else if (lowerText === 'stay_on_form') {
          addBotMessage(translations[language].applyFormIntro);
          setCurrentStage(ChatStage.DISPLAYING_APPLY_FORM);
        } else {
          addBotMessage("I'm not sure how to respond to that. Can you please rephrase or ask for help?");
        }
        break;

      case ChatStage.SELECTING_DOMAIN:
        const categories = getAllCategories();
        const foundCategory = categories.find((cat, index) => 
          cat.toLowerCase() === lowerText || (index + 1).toString() === lowerText
        );

        if (foundCategory) {
          setSelectedCategory(foundCategory);
          addBotMessage(translations[language].selectJobType, undefined, [
            { label: "Government", value: "government" },
            { label: "Private", value: "private" },
          ]);
          setCurrentStage(ChatStage.SELECTING_JOB_TYPE);
        } else {
          addBotMessage("Invalid domain selected. Please choose a domain by its number or name.");
        }
        break;

      case ChatStage.SELECTING_JOB_TYPE:
        console.log("SELECTING_JOB_TYPE stage: lowerText=", lowerText, "selectedCategory=", selectedCategory);
        if (lowerText === 'government' || lowerText === 'private') {
          setSelectedJobType(lowerText as 'government' | 'private');
          if (selectedCategory) {
            console.log("Before filtering - selectedCategory:", selectedCategory, "lowerText (job type):", lowerText);
            const filteredJobs = getJobsByCategory(selectedCategory).filter(job => job.type === lowerText);
            console.log("Filtered Jobs:", filteredJobs);
            if (filteredJobs.length > 0) {
              const jobOptions = filteredJobs.map((job, index) => ({ label: `${index + 1}. ${job.title} (${job.organization})`, value: job.id }));
              addBotMessage(`Here are some ${lowerText} jobs in ${selectedCategory} domain:`, undefined, jobOptions);
              setCurrentStage(ChatStage.LISTING_JOBS);
            } else {
              addBotMessage(translations[language].noMatchingJobs.replace('{type}', lowerText).replace('{category}', selectedCategory));
              setCurrentStage(ChatStage.INITIAL);
            }
          } else {
            // Fallback if selectedCategory is null unexpectedly
            addBotMessage("It seems we lost track of the job category. Let's start over.");
            setCurrentStage(ChatStage.INITIAL);
          }
        } else {
          addBotMessage("Invalid job type. Please say 'Government' or 'Private'.");
        }
        break;

      case ChatStage.LISTING_JOBS:
        console.log("LISTING_JOBS stage: lowerText=", lowerText, "selectedCategory=", selectedCategory, "selectedJobType=", selectedJobType);
        if (!selectedCategory || !selectedJobType) {
          addBotMessage("It seems we lost track of the job category or type. Let's start over.");
          setCurrentStage(ChatStage.INITIAL);
          return;
        }
        console.log("Before filtering - selectedCategory:", selectedCategory, "selectedJobType:", selectedJobType);
        const currentJobs = getJobsByCategory(selectedCategory).filter(job => job.type === selectedJobType);
        console.log("Current Jobs for listing:", currentJobs);
        const selectedJobFromList = currentJobs.find((job, index) => {
          console.log(`Checking job ${index + 1}: ${job.title.toLowerCase()}, job id: ${job.id.toLowerCase()}, user input: ${lowerText}`);
          return job.title.toLowerCase().includes(lowerText) || (index + 1).toString() === lowerText || job.id.toLowerCase() === lowerText;
        });

        if (selectedJobFromList) {
          setSelectedJob(selectedJobFromList);
          addBotMessage(
            translations[language].jobDetails(
              selectedJobFromList.title,
              selectedJobFromList.organization,
              selectedJobFromList.location,
              selectedJobFromList.salary,
              selectedJobFromList.description,
              selectedJobFromList.requirements,
              selectedJobFromList.qualification,
              selectedJobFromList.experience
            ), 
            undefined,
            [
              { label: translations[language].applyNow, value: 'apply' },
            ]
          );
          setCurrentStage(ChatStage.DISPLAYING_JOB_DETAILS);
        } else {
          addBotMessage("Invalid job selection. Please choose a job by its number or name.");
        }
        break;

      case ChatStage.DISPLAYING_JOB_DETAILS:
        if (lowerText === 'apply') {
          if (selectedJob) {
            addBotMessage("How would you like to apply?", undefined, [
              { label: "Apply Here Itself", value: "apply_here" },
              { label: "Navigate to Form", value: "navigate_form" },
            ]);
            // setCurrentStage(ChatStage.DISPLAYING_APPLY_FORM); // This will be handled by the new options
          } else {
            addBotMessage("No job selected for application. Please select a job first.");
            setCurrentStage(ChatStage.INITIAL);
          }
        } else if (lowerText === 'apply_here') {
          if (selectedJob) {
            addBotMessage(translations[language].applyFormIntro);
            setCurrentStage(ChatStage.DISPLAYING_APPLY_FORM);
          } else {
            addBotMessage("No job selected for application. Please select a job first.");
            setCurrentStage(ChatStage.INITIAL);
          }
        } else if (lowerText === 'navigate_form') {
          if (selectedJob) {
            window.location.href = `/apply/${selectedJob.id}`;
          } else {
            addBotMessage("No job selected for application. Please select a job first.");
            setCurrentStage(ChatStage.INITIAL);
          }
        } else {
          addBotMessage("I can only process 'apply' or selection of application method at this stage. Please choose an option.");
        }
        break;

      case ChatStage.DISPLAYING_APPLY_FORM:
        // Application form submission is handled by JobApplicationForm component
        addBotMessage("Please fill out the form above to submit your application.");
        break;

      default:
        addBotMessage("An unexpected error occurred. Let's start over. How can I help you?");
        setCurrentStage(ChatStage.INITIAL);
        break;
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    processMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Error playing sound:", e));
      }
      // Set language for speech recognition
      const langCodes = { en: 'en-US', hi: 'hi-IN', pa: 'pa-IN' };
      recognitionRef.current.lang = langCodes[language];
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleOptionClick = (value: string) => {
    // Simulate user sending the option value as a message
    addUserMessage(value);
    processMessage(value);
    setInputValue('');
  };

  const handleJobClick = (jobId: string) => {
    // This function is no longer directly used for navigation but can be adapted if needed.
    // For now, job selection is handled via processMessage in LISTING_JOBS stage.
    // Kept for potential future use or to avoid breaking existing functionality.
    // window.location.href = `/job/${jobId}`;
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed right-6 bottom-1 z-50 rounded-full w-16 h-16 shadow-lg",
          "bg-accent hover:bg-accent/90 transition-all duration-300",
          isOpen && "scale-0"
        )}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed right-6 bottom-1 w-96 h-[580px] z-50 overflow-y-auto", // Adjusted height to be a bit longer and added overflow-y-auto
          "bg-card border-2 border-primary rounded-lg shadow-2xl transition-all duration-300",
          "flex flex-col",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="PGRKAM" className="w-10 h-10 rounded-full bg-white p-1" />
            <div>
              <h3 className="font-bold">PGRKAM Assistant</h3>
              <p className="text-xs opacity-90">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'pa')}
              className="text-xs bg-primary-foreground text-primary rounded px-2 py-1"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
            </select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.sender === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap overflow-y-auto max-h-40">{message.text}</p> {/* Changed overflow-auto to overflow-y-auto */}
                  {message.jobLinks && message.jobLinks.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.jobLinks.map((job) => (
                        <button
                          key={job.id}
                          // Removed onClick to prevent navigation, now handled by options logic
                          className="block w-full text-left text-sm bg-background hover:bg-accent/10 p-2 rounded transition-colors"
                        >
                          {job.title}
                        </button>
                      ))}
                    </div>
                  )}
                  {message.options && message.options.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option) => (
                        <Button
                          key={`${message.id}-${option.value}`}
                          onClick={() => handleOptionClick(option.value)}
                          variant="outline"
                          className="w-full justify-start text-left normal-case h-auto whitespace-pre-wrap"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        {currentStage !== ChatStage.DISPLAYING_APPLY_FORM && user && (
          <div className="p-4 border-t">
            {isListening && (
              <div className="mb-2 text-sm text-primary font-medium animate-pulse">
                {translations[language].listening}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={translations[language].placeholder}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={toggleListening}
                variant={isListening ? "destructive" : "secondary"}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button size="icon" onClick={handleSend}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
        {!user && (
          <div className="p-4 border-t text-center text-muted-foreground">
            <p>{translations[language].pleaseLogin}</p>
            <Link to="/login" className="text-primary hover:underline mt-2 inline-block">Login to Chat</Link>
          </div>
        )}

        {currentStage === ChatStage.DISPLAYING_APPLY_FORM && selectedJob && (
          <div className="p-4 border-t">
            <Button
              variant="outline"
              onClick={() => setCurrentStage(ChatStage.LISTING_JOBS)}
              className="w-full mb-4"
            >
              Back to Job Listings
            </Button>
            <JobApplicationForm jobTitle={selectedJob.title} jobId={selectedJob.id} onApplicationSubmit={handleApplicationSubmit} />
          </div>
        )}
      </div>
    </>
  );
};

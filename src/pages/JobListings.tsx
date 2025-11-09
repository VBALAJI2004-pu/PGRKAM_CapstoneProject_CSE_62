import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom'; // Import useLocation
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocialSidebar } from '@/components/SocialSidebar';
import { ChatBot } from '@/components/ChatBot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getJobsByCategory, jobsData } from '@/data/jobsData'; // Import jobsData
import { MapPin, Building, Calendar, Briefcase } from 'lucide-react';
import React, { useContext } from 'react'; // Import useContext
import { LanguageContext } from '../App'; // Import LanguageContext

const jobListingsTranslations = {
  en: {
    government: 'Government',
    private: 'Private',
    qualification: 'Qualification:',
    location: 'Location:',
    lastDate: 'Last Date:',
    salary: 'Salary:',
    viewDetailsApply: 'View Details & Apply',
    noJobsFound: 'No jobs found matching your criteria.',
    jobListings: 'Job Listings',
    skillTrainingPrograms: 'Skill Training Programs',
    selfEmploymentOpportunities: 'Self Employment Opportunities',
    jobsForWomen: 'Jobs For Women',
    jobsForPersonsWithDisability: 'Jobs For Persons With Disability',
    inductionIntoArmedForces: 'Induction into Armed Forces',
    counsellingServices: 'Counselling Services',
  },
  hi: {
    government: 'सरकारी',
    private: 'निजी',
    qualification: 'योग्यता:',
    location: 'स्थान:',
    lastDate: 'अंतिम तिथि:',
    salary: 'वेतन:',
    viewDetailsApply: 'विवरण देखें और आवेदन करें',
    noJobsFound: 'आपके मानदंड से मेल खाने वाली कोई नौकरी नहीं मिली।',
    jobListings: 'नौकरी की सूची',
    skillTrainingPrograms: 'कौशल प्रशिक्षण कार्यक्रम',
    selfEmploymentOpportunities: 'स्वरोजगार के अवसर',
    jobsForWomen: 'महिलाओं के लिए नौकरियां',
    jobsForPersonsWithDisability: 'दिव्यांग व्यक्तियों के लिए नौकरियां',
    inductionIntoArmedForces: 'सशस्त्र बलों में भर्ती',
    counsellingServices: 'परामर्श सेवाएँ',
  },
  pa: {
    government: 'ਸਰਕਾਰੀ',
    private: 'ਪ੍ਰਾਈਵੇਟ',
    qualification: 'ਯੋਗਤਾ:',
    location: 'ਸਥਾਨ:',
    lastDate: 'ਆਖਰੀ ਮਿਤੀ:',
    salary: 'ਤਨਖਾਹ:',
    viewDetailsApply: 'ਵੇਰਵੇ ਵੇਖੋ ਅਤੇ ਅਪਲਾਈ ਕਰੋ',
    noJobsFound: 'ਤੁਹਾਡੇ ਮਾਪਦੰਡਾਂ ਨਾਲ ਮੇਲ ਖਾਂਦੀ ਕੋਈ ਨੌਕਰੀ ਨਹੀਂ ਮਿਲੀ।',
    jobListings: 'ਨੌਕਰੀਆਂ ਦੀ ਸੂਚੀ',
    skillTrainingPrograms: 'ਹੁਨਰ ਸਿਖਲਾਈ ਪ੍ਰੋਗਰਾਮ',
    selfEmploymentOpportunities: 'ਸਵੈ-ਰੁਜ਼ਗਾਰ ਦੇ ਮੌਕੇ',
    jobsForWomen: 'ਔਰਤਾਂ ਲਈ ਨੌਕਰੀਆਂ',
    jobsForPersonsWithDisability: 'ਅਪਾਹਜ ਵਿਅਕਤੀਆਂ ਲਈ ਨੌਕਰੀਆਂ',
    inductionIntoArmedForces: 'ਸਸ਼ਤਰ ਬਲਾਂ ਵਿੱਚ ਭਰਤੀ',
    counsellingServices: 'ਸਲਾਹ ਸੇਵਾਵਾਂ',
  },
};

const categoryTitles: Record<string, string> = {
  jobs: 'Job Listings',
  'skill-training': 'Skill Training Programs',
  'self-employment': 'Self Employment Opportunities',
  women: 'Jobs For Women',
  disability: 'Jobs For Persons With Disability',
  'armed-forces': 'Induction into Armed Forces',
  counselling: 'Counselling Services',
};

const JobListings = () => {
  const { language } = useContext(LanguageContext)!;
  const t = jobListingsTranslations[language];
  const { category = 'jobs' } = useParams();
  const location = useLocation(); // Get location object
  const { query } = (location.state as { query?: any }) || {}; // Access query from state

  const [activeTab, setActiveTab] = useState<'government' | 'private'>('government');
  
  let filteredJobs = [];

  if (query) {
    // Filter based on home page search query
    filteredJobs = jobsData.filter(job => {
      let matches = true;
      if (query.jobType && job.type !== query.jobType) matches = false;
      if (query.qualification && job.qualification !== query.qualification) matches = false;
      // Assuming experience is a number string, handle range if necessary
      if (query.experience && job.experience !== query.experience) matches = false; 
      if (query.placeOfPosting && !job.location.toLowerCase().includes(query.placeOfPosting.toLowerCase())) matches = false;
      if (query.jobTitleOrOrg && !(job.title.toLowerCase().includes(query.jobTitleOrOrg.toLowerCase()) || job.organization.toLowerCase().includes(query.jobTitleOrOrg.toLowerCase()))) matches = false;
      return matches;
    });
  } else {
    // Original category-based filtering
    filteredJobs = getJobsByCategory(category);
  }

  const governmentJobs = filteredJobs.filter(job => job.type === 'government');
  const privateJobs = filteredJobs.filter(job => job.type === 'private');

  const displayJobs = activeTab === 'government' ? governmentJobs : privateJobs;

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'jobs': return t.jobListings;
      case 'skill-training': return t.skillTrainingPrograms;
      case 'self-employment': return t.selfEmploymentOpportunities;
      case 'women': return t.jobsForWomen;
      case 'disability': return t.jobsForPersonsWithDisability;
      case 'armed-forces': return t.inductionIntoArmedForces;
      case 'counselling': return t.counsellingServices;
      default: return t.jobListings;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SocialSidebar />
      <ChatBot />

      <div className="flex-1 py-12 px-6 bg-background">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            {query ? t.jobListings : getCategoryTitle(category)}
          </h1>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="government">
                {t.government} ({governmentJobs.length})
              </TabsTrigger>
              <TabsTrigger value="private">
                {t.private} ({privateJobs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="government" className="mt-8">
              <div className="grid gap-6">
                {governmentJobs.length > 0 ? (
                  governmentJobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Building className="w-4 h-4" />
                              <span>{job.organization}</span>
                            </div>
                          </div>
                          <Badge className="bg-secondary">{t.government}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-primary" />
                            <span className="text-sm"><strong>{t.qualification}</strong> {job.qualification}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-sm"><strong>{t.location}</strong> {job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm"><strong>{t.lastDate}</strong> {job.lastDate}</span>
                          </div>
                          <div className="text-sm">
                            <strong>{t.salary}</strong> {job.salary}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                        <Link to={`/job/${job.id}`}>
                          <Button className="bg-primary hover:bg-primary/90">
                            {t.viewDetailsApply}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">{t.noJobsFound}</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="private" className="mt-8">
              <div className="grid gap-6">
                {privateJobs.length > 0 ? (
                  privateJobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Building className="w-4 h-4" />
                              <span>{job.organization}</span>
                            </div>
                          </div>
                          <Badge className="bg-accent">{t.private}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-primary" />
                            <span className="text-sm"><strong>{t.qualification}</strong> {job.qualification}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-sm"><strong>{t.location}</strong> {job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm"><strong>{t.lastDate}</strong> {job.lastDate}</span>
                          </div>
                          <div className="text-sm">
                            <strong>{t.salary}</strong> {job.salary}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                        <Link to={`/job/${job.id}`}>
                          <Button className="bg-primary hover:bg-primary/90">
                            {t.viewDetailsApply}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">{t.noJobsFound}</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobListings;

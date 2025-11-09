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
import { MapPin, Building, Calendar, Briefcase, DollarSign, TrendingUp } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <Header />
      <SocialSidebar />
      <ChatBot />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {query ? t.jobListings : getCategoryTitle(category)}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Discover opportunities that match your skills and aspirations
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="font-semibold">{filteredJobs.length} Opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-500" />
                <span>{governmentJobs.length} Government</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-500" />
                <span>{privateJobs.length} Private</span>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-8">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2 bg-white/80 backdrop-blur-sm shadow-lg border-2 border-primary/20">
              <TabsTrigger value="government" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold">
                <Building className="w-4 h-4 mr-2" />
                {t.government} ({governmentJobs.length})
              </TabsTrigger>
              <TabsTrigger value="private" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold">
                <Briefcase className="w-4 h-4 mr-2" />
                {t.private} ({privateJobs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="government" className="mt-8">
              <div className="overflow-x-auto pb-6 -mx-4 px-4">
                <div className="flex gap-6 min-w-max">
                  {governmentJobs.length > 0 ? (
                    governmentJobs.map((job) => (
                      <div key={job.id} className="flex-shrink-0 w-96">
                        <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-white/90 backdrop-blur-sm overflow-hidden h-full">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-cyan-500"></div>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start mb-3">
                              <Badge className="bg-blue-100 text-blue-800 border-blue-300 font-semibold">
                                {t.government}
                              </Badge>
                              <Building className="w-5 h-5 text-primary opacity-60" />
                            </div>
                            <CardTitle className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                              {job.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Building className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium truncate">{job.organization}</span>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="flex items-start gap-2 text-sm">
                                <Briefcase className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="font-semibold text-gray-700">{t.qualification}</span>
                                  <span className="text-gray-600 ml-1">{job.qualification}</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="font-semibold text-gray-700">{t.location}</span>
                                  <span className="text-gray-600 ml-1">{job.location}</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 text-sm">
                                <DollarSign className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="font-semibold text-gray-700">{t.salary}</span>
                                  <span className="text-gray-600 ml-1">{job.salary}</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="font-semibold text-gray-700">{t.lastDate}</span>
                                  <span className="text-gray-600 ml-1">{job.lastDate}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-3 pt-2 border-t">{job.description}</p>
                            <Link to={`/job/${job.id}`} className="block">
                              <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                                {t.viewDetailsApply}
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                    </div>
                  ))
                ) : (
                  <div className="flex-shrink-0 w-full">
                    <Card className="py-16 text-center">
                      <CardContent>
                        <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-lg text-gray-600">{t.noJobsFound}</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="private" className="mt-8">
              <div className="overflow-x-auto pb-6 -mx-4 px-4">
                <div className="flex gap-6 min-w-max">
                  {privateJobs.length > 0 ? (
                    privateJobs.map((job) => (
                      <div key={job.id} className="flex-shrink-0 w-96">
                        <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500/50 bg-white/90 backdrop-blur-sm overflow-hidden h-full">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start mb-3">
                              <Badge className="bg-purple-100 text-purple-800 border-purple-300 font-semibold">
                                {t.private}
                              </Badge>
                              <Briefcase className="w-5 h-5 text-purple-500 opacity-60" />
                            </div>
                            <CardTitle className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                              {job.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Building className="w-4 h-4 text-purple-500" />
                              <span className="text-sm font-medium truncate">{job.organization}</span>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="flex items-start gap-2 text-sm">
                                <Briefcase className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="font-semibold text-gray-700">{t.qualification}</span>
                                  <span className="text-gray-600 ml-1">{job.qualification}</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="font-semibold text-gray-700">{t.location}</span>
                                  <span className="text-gray-600 ml-1">{job.location}</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 text-sm">
                                <DollarSign className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="font-semibold text-gray-700">{t.salary}</span>
                                  <span className="text-gray-600 ml-1">{job.salary}</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="font-semibold text-gray-700">{t.lastDate}</span>
                                  <span className="text-gray-600 ml-1">{job.lastDate}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-3 pt-2 border-t">{job.description}</p>
                            <Link to={`/job/${job.id}`} className="block">
                              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-600/90 hover:to-pink-600/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                                {t.viewDetailsApply}
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                    </div>
                  ))
                ) : (
                  <div className="flex-shrink-0 w-full">
                    <Card className="py-16 text-center">
                      <CardContent>
                        <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-lg text-gray-600">{t.noJobsFound}</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
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

import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocialSidebar } from '@/components/SocialSidebar';
import { ChatBot } from '@/components/ChatBot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getJobById } from '@/data/jobsData';
import { MapPin, Building, Calendar, Briefcase, DollarSign, CheckCircle, ArrowLeft } from 'lucide-react';

const JobDetail = () => {
  const { id } = useParams();
  const job = getJobById(id || '');

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
            <Link to="/">
              <Button>Return to Home</Button>
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
        <div className="container mx-auto max-w-4xl">
          <Link to={`/jobs/${job.category}`}>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Listings
            </Button>
          </Link>

          <Card>
            <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl mb-3">{job.title}</CardTitle>
                  <div className="flex items-center gap-3 text-lg">
                    <Building className="w-5 h-5" />
                    <span>{job.organization}</span>
                  </div>
                </div>
                <Badge className={job.type === 'government' ? 'bg-secondary' : 'bg-accent'}>
                  {job.type}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              {/* Quick Info Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8 p-6 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Qualification</p>
                    <p className="text-muted-foreground">{job.qualification}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Experience</p>
                    <p className="text-muted-foreground">{job.experience}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-muted-foreground">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Salary</p>
                    <p className="text-muted-foreground">{job.salary}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-destructive mt-1" />
                  <div>
                    <p className="font-semibold">Last Date to Apply</p>
                    <p className="text-destructive font-semibold">{job.lastDate}</p>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Job Description</h3>
                <p className="text-muted-foreground leading-relaxed">{job.description}</p>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Requirements</h3>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Section */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                <p className="text-muted-foreground mb-6">
                  Click the button below to proceed with your application. Make sure you have all required documents ready.
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  Apply Now
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Application deadline: <strong>{job.lastDate}</strong>
                </p>
              </div>

              {/* Important Note */}
              <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-bold text-amber-900 mb-2">Important Note:</h4>
                <p className="text-sm text-amber-800">
                  Punjab Ghar Ghar Rozgar portal does not charge any money for job applications or placements. 
                  Beware of fraudulent websites and unauthorized agents claiming to provide jobs through this portal.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetail;

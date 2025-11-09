import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById, Job } from '../data/jobsData';
import { JobApplicationForm } from '../components/JobApplicationForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const JobApplicationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Initialize useNavigate
  const job = id ? getJobById(id) : undefined;

  if (!job) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
        <p>The job you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  const handleApplicationSubmit = (success: boolean) => {
    console.log("Application Submitted from dedicated page:", success);
    if (success) {
      // Redirect is handled by JobApplicationForm component
      // No need to navigate here as the form will redirect to /my-applications
    } else {
      alert(`Failed to submit application for ${job.title}. Please try again.`);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl bg-white shadow-lg rounded-lg my-8">
      <Button onClick={() => window.history.back()} variant="outline" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Chatbot
      </Button>
      <h2 className="text-3xl font-bold text-primary mb-4">Apply for {job.title}</h2>
      <div className="mb-6 p-4 border rounded-md bg-muted/20">
        <p className="text-lg font-semibold">Organization: {job.organization}</p>
        <p>Location: {job.location}</p>
        <p>Salary: {job.salary}</p>
        <p className="mt-2">{job.description}</p>
        <h3 className="font-semibold mt-3">Requirements:</h3>
        <ul className="list-disc list-inside ml-4">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
        <p className="mt-2">**Qualification:** {job.qualification}</p>
        <p>**Experience:** {job.experience}</p>
      </div>

      <JobApplicationForm jobTitle={job.title} jobId={job.id} onApplicationSubmit={handleApplicationSubmit} />
    </div>
  );
};

export default JobApplicationPage;

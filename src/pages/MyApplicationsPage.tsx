import React, { useEffect, useState, useContext } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, FileText, Mail, Phone, Calendar, TrendingUp, XCircle, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ApplicationData {
  _id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  status: 'Submitted' | 'Reviewed' | 'Interviewed' | 'Hired' | 'Rejected'; // Add status field
  applicationDate: string;
}

const MyApplicationsPage: React.FC = () => {
  const { token, user } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchMyApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs/my-applications', {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || 'Failed to fetch applications');
        }

        const data: ApplicationData[] = await response.json();
        setApplications(data);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyApplications();
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p>Loading your applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  };

  // Helper function to get status progress percentage
  const getStatusProgress = (status: string): number => {
    const statusMap: { [key: string]: number } = {
      'Submitted': 25,
      'Reviewed': 50,
      'Interviewed': 75,
      'Hired': 100,
      'Rejected': 0
    };
    return statusMap[status] || 0;
  };

  // Helper function to get status color classes - professional colors
  const getStatusStyles = (status: string) => {
    const styles: { [key: string]: { 
      badge: string; 
      progress: string; 
      icon: React.ReactNode;
      borderColor: string;
    } } = {
      'Submitted': {
        badge: 'bg-blue-100 text-blue-800 border-blue-300',
        progress: 'bg-blue-500',
        icon: <FileText className="w-4 h-4" />,
        borderColor: 'border-l-blue-500'
      },
      'Reviewed': {
        badge: 'bg-amber-100 text-amber-800 border-amber-300',
        progress: 'bg-amber-500',
        icon: <Clock className="w-4 h-4" />,
        borderColor: 'border-l-amber-500'
      },
      'Interviewed': {
        badge: 'bg-indigo-100 text-indigo-800 border-indigo-300',
        progress: 'bg-indigo-500',
        icon: <TrendingUp className="w-4 h-4" />,
        borderColor: 'border-l-indigo-500'
      },
      'Hired': {
        badge: 'bg-green-100 text-green-800 border-green-300',
        progress: 'bg-green-500',
        icon: <CheckCircle2 className="w-4 h-4" />,
        borderColor: 'border-l-green-500'
      },
      'Rejected': {
        badge: 'bg-red-100 text-red-800 border-red-300',
        progress: 'bg-red-500',
        icon: <XCircle className="w-4 h-4" />,
        borderColor: 'border-l-red-500'
      }
    };
    return styles[status] || styles['Submitted'];
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">
              My Job Applications
            </h1>
          </div>
          <p className="text-gray-600 ml-11">Track the status of all your submitted job applications</p>
        </div>

        {applications.length === 0 ? (
          <Card className="shadow-md border border-gray-200">
            <CardContent className="py-16 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Applications Yet</h3>
              <p className="text-gray-600">You haven't submitted any job applications yet. Start applying to see them here!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const statusStyles = getStatusStyles(app.status);
              const progressValue = getStatusProgress(app.status);
              
              return (
                <Card 
                  key={app._id} 
                  className={`shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 ${statusStyles.borderColor} bg-white`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      {/* Left Section - Job Title and Status */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {app.jobTitle}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="truncate max-w-xs">{app.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span>{app.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span>
                                  {new Date(app.applicationDate).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Application Progress</span>
                            <span className="font-semibold text-gray-900">{progressValue}%</span>
                          </div>
                          <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                            <div 
                              className={`h-full transition-all duration-500 ${statusStyles.progress}`}
                              style={{ width: `${progressValue}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Status Timeline - Horizontal */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between relative">
                            {/* Progress Line */}
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
                            <div 
                              className={`absolute top-1/2 left-0 h-0.5 ${statusStyles.progress} -translate-y-1/2 z-10 transition-all duration-1000`}
                              style={{ width: `${progressValue}%` }}
                            ></div>
                            
                            {/* Status Points */}
                            <div className={`relative z-20 flex flex-col items-center ${app.status !== 'Rejected' ? 'text-blue-600' : 'text-gray-400'}`}>
                              <div className={`w-3 h-3 rounded-full ${app.status !== 'Rejected' ? 'bg-blue-500' : 'bg-gray-300'} border-2 border-white shadow-sm`}></div>
                              <span className="text-xs font-medium mt-1">Submitted</span>
                            </div>
                            <div className={`relative z-20 flex flex-col items-center ${(app.status === 'Reviewed' || app.status === 'Interviewed' || app.status === 'Hired') ? 'text-amber-600' : 'text-gray-400'}`}>
                              <div className={`w-3 h-3 rounded-full ${(app.status === 'Reviewed' || app.status === 'Interviewed' || app.status === 'Hired') ? 'bg-amber-500' : 'bg-gray-300'} border-2 border-white shadow-sm`}></div>
                              <span className="text-xs font-medium mt-1">Reviewed</span>
                            </div>
                            <div className={`relative z-20 flex flex-col items-center ${(app.status === 'Interviewed' || app.status === 'Hired') ? 'text-indigo-600' : 'text-gray-400'}`}>
                              <div className={`w-3 h-3 rounded-full ${(app.status === 'Interviewed' || app.status === 'Hired') ? 'bg-indigo-500' : 'bg-gray-300'} border-2 border-white shadow-sm`}></div>
                              <span className="text-xs font-medium mt-1">Interview</span>
                            </div>
                            <div className={`relative z-20 flex flex-col items-center ${app.status === 'Hired' ? 'text-green-600' : 'text-gray-400'}`}>
                              <div className={`w-3 h-3 rounded-full ${app.status === 'Hired' ? 'bg-green-500' : 'bg-gray-300'} border-2 border-white shadow-sm`}></div>
                              <span className="text-xs font-medium mt-1">Hired</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Status Badge */}
                      <div className="lg:ml-6 flex-shrink-0">
                        <Badge variant="outline" className={`${statusStyles.badge} flex items-center gap-2 px-4 py-2 text-sm font-semibold border`}>
                          {statusStyles.icon}
                          <span>{app.status}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplicationsPage;

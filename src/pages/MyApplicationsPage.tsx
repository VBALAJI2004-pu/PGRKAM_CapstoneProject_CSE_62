import React, { useEffect, useState, useContext } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 container mx-auto py-8 px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">My Job Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <p className="text-center text-muted-foreground">You haven't submitted any applications yet.</p>
            ) : (
              <Table>
                <TableCaption>A list of all job applications you have submitted.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Applicant Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead> {/* New Status Column */}
                    <TableHead>Application Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app._id}>
                      <TableCell className="font-medium">{app.jobTitle}</TableCell>
                      <TableCell>{app.name}</TableCell>
                      <TableCell>{app.email}</TableCell>
                      <TableCell>{app.phone}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${app.status === 'Submitted' ? 'bg-blue-100 text-blue-800' : app.status === 'Reviewed' ? 'bg-yellow-100 text-yellow-800' : app.status === 'Interviewed' ? 'bg-purple-100 text-purple-800' : app.status === 'Hired' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                          >
                            {app.status}
                          </span>
                          {/* Add a simple visual indicator for the status bar */}
                          {app.status === 'Submitted' && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>}
                          {app.status === 'Reviewed' && <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>}
                          {app.status === 'Interviewed' && <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>}
                          {app.status === 'Hired' && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                          {app.status === 'Rejected' && <div className="w-2 h-2 rounded-full bg-red-500"></div>}
                        </div>
                      </TableCell> {/* New Status Cell */}
                      <TableCell>{new Date(app.applicationDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyApplicationsPage;

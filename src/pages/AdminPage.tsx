import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface UserData {
  _id: string;
  name: string;
  email: string;
  date: string;
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // In a real application, you would pass an authentication token here
        // For now, it's unprotected as per the backend implementation.
        const response = await fetch('http://localhost:5000/api/auth/users', {
          headers: {
            'Content-Type': 'application/json',
            // 'x-auth-token': localStorage.getItem('token') || '', // Uncomment for protected route
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || 'Failed to fetch users');
        }

        const data: UserData[] = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p>Loading users...</p>
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
            <CardTitle className="text-3xl font-bold text-center">Registered Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of registered users in the PGRKAM portal.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Registration Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{new Date(user.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;

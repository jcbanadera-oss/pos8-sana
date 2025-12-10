
'use client';

import { useRouter } from 'next/navigation';
import { getToken, logoutUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { 
  children: React.ReactNode; 
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = getToken(); // MUST be inside useEffect

    if (!token) {
      setIsAuth(false);
      router.push('/login');
    } else {
      setIsAuth(true);
    }

    setLoading(false);
  }, [router]);

  // Prevent flashing / infinite redirect loop
  if (loading) {
    return <div className="p-6">Checking authentication...</div>;
  }

  if (!isAuth) return null;

  function handleLogout() {
    logoutUser();
    router.push('/login');
  }

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="destructive" onClick={handleLogout}>Logout</Button>
      </header>

      {children}
    </div>
  );
}
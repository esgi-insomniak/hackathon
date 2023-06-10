'use client'
import SideBar from '@/components/navbar'
import './globals.css'
import { AlertInso, AlertProvider } from '@/providers/alert'
import { AuthProvider, useAuth } from '@/providers/auth';
import { checkLoggedIn, isLoggedIn, useUser, useUserProtected } from '@/helpers/utils/user';
import React from 'react';
import { getUserData } from '@/helpers/hook';

// export const metadata = {
//   title: 'Carbon IT',
//   description: 'Intranet Carbon',
// }

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const { id } = useAuth();
    
  React.useEffect(() => {
      console.log(getUserData("bxwzsxj9hckkags"));
  }, []);
  const user = true

  return (
    <html lang="fr">
      <AuthProvider>
        <AlertProvider>
          <body className="bg-slate-200 h-screen flex justify-end">
            <div className="w-full flex">
              {user && (
                <div className="w-1/6">
                  <SideBar />
                </div>
              )}
              <div className="w-5/6">
                {children}
              </div>
            </div>
            <AlertInso />
          </body>
        </AlertProvider>
      </AuthProvider>
    </html>
  )
}

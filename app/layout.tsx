import SideBar from "@/components/navbar";
import "./globals.css";
import { AlertInso, AlertProvider } from "@/providers/alert";
import { AuthProvider, UserType } from "@/providers/auth";
import {
  getUSerData, useUser,
} from "@/helpers/utils/user";
import React from "react";

export const metadata = {
  title: 'Carbon IT',
  description: 'Intranet Carbon',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const fetchData = async () => {
    try {
      const userData = await getUSerData();
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const userData = await fetchData()
  const plainUser: UserType = JSON.parse(JSON.stringify(userData));
  const user = useUser();

  return (
    <html lang="fr">
      <AuthProvider userData={plainUser}>
        <AlertProvider>
          <body className="bg-slate-200 h-screen flex justify-end">
            <div className="w-full flex">
              {user && (
                <div className="w-1/6">
                  <SideBar />
                </div>
              )}
              <div className={`${user ? 'w-5/6' : 'w-full'}`}>{children}</div>
            </div>
            <AlertInso />
          </body>
        </AlertProvider>
      </AuthProvider>
    </html>
  );
}

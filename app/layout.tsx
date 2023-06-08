import SideBar from '@/components/navbar'
import './globals.css'
import { ClerkProvider, RedirectToSignIn, currentUser } from '@clerk/nextjs'
import { AlertInso, AlertProvider } from '@/providers/alert'

export const metadata = {
  title: 'Carbon IT',
  description: 'Intranet Carbon',
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  const user = await currentUser()

  return (
    <ClerkProvider>
      <html lang="fr">
        <AlertProvider>
          <body className="bg-slate-200 h-screen flex justify-end">
            {user && (
              <div className="w-full flex">
                <div className="w-1/6">
                  <SideBar />
                </div>
                <div className="w-5/6">
                  {children}
                </div>
              </div>
            )}
            {!user && (
              <div className='h-full w-full'>
                <RedirectToSignIn />
                {children}
              </div>
            )}
            <AlertInso />
          </body>
        </AlertProvider>
      </html>
    </ClerkProvider>
  )
}

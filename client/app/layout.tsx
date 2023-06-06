import SideBar from '@/components/navbar'
import './globals.css'
import { ClerkProvider, RedirectToSignIn, currentUser } from '@clerk/nextjs'

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
        <body className="bg-slate-200 h-screen flex justify-end">
          {user && (
              <div className="w-full">
                <div className="w-1/4">
                  <SideBar />
                </div>
                <div className="w-3/4">
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
        </body>
      </html>
    </ClerkProvider>
  )
}

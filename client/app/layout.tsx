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
              <div className=''> <SideBar /></div>
            )}
            <div className={`h-full ${user ? 'w-[calc(100vw-16rem)]' : 'w-full'} `}>
              {!user && (
                <RedirectToSignIn />
              )}
              {children}
              <AlertInso />
            </div>
          </body>
        </AlertProvider>
      </html>
    </ClerkProvider>
  )
}

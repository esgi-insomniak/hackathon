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
            <div className=''> <SideBar /></div>
          )}
          <div className='h-full w-[calc(100vw-16rem)]'>
            {!user && (
              <RedirectToSignIn />
            )}
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}

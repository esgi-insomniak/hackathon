import ComplexNavbar from '@/components/navbar'
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
        <body className="bg-slate-200 h-screen">
          {user && (<ComplexNavbar />)}
          <div className='h-full'>
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

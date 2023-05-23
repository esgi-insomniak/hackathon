'use client'

import { useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"

export default function Home() {
  const { data: session, status } = useSession()
  return (
    <section className='px-24 py-10'>
      <div className='container'>
        <h1 className='text-2xl font-semibold tracking-tight'>Home page</h1>
        <p className='mt-2 text-gray-500'>
          {status === 'loading' ? 'Loading...' : session ? `Hello, ${session?.user?.name}` : (
            <div className="flex flex-col space-y-2">
              <span>You are not signed in</span>
              <Link href='/signIn' className='p-2 bg-blue-500 w-fit rounded-md text-white'>
                Sign in
              </Link>
            </div>
          )}
        </p>
      </div>
    </section>
  )
}

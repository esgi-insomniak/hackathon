'use client'

import { useUser } from "@clerk/nextjs"
import React from "react"

export default function Home() {
  const { user } = useUser()
  return (
    <section className='px-24 py-10'>
      <div className='container'>
        <h1 className='text-2xl font-semibold tracking-tight'>Home page</h1>
        <p className='mt-1 text-gray-500'>Bienvenue {user?.firstName} {user?.lastName} !</p>
      </div>
    </section>
  )
}

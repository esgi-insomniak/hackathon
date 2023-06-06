'use client'

import { EventItem } from "@/components/event"
import { useUser } from "@clerk/nextjs"
import React from "react"
import { BsCalendarEvent } from "react-icons/bs"

export default function Home() {
    const { user } = useUser()
    return (
        <section className='px-8 py-10 grid grid-cols-6 gap-5 grid-rows-3'>
            <div className="p-5 bg-carbon-blue text-carbon-white rounded-md drop-shadow-lg flex flex-col col-span-4">
                <h2 className='font-bold mb-5'>Bienvenue {user?.firstName} {user?.lastName} !</h2>
                <span>
                    Lance toi dans l'aventure et poursuis ton apprentissage !
                </span>
            </div>
            <div className="bg-carbon-white col-span-2 row-span-3 rounded-md drop-shadow-xl">
                <div className="h-14 rounded-t-md bg-carbon-blue w-full flex justify-center items-center text-carbon-white">
                    Mes évènements
                    <BsCalendarEvent className="h-5 w-5 ml-3" />
                </div>
                <div className="p-3 w-full h-full space-y-3">
                    <EventItem title="Event 1" type="off-work" date={'02/07/2023'} />
                    <EventItem title="Event 2" type="work" date={'02/07/2023'} />
                    <EventItem title="Event 3" type="off-work" date={'02/07/2023'} />
                    <EventItem title="Event 4" type="work" date={'02/07/2023'} />
                </div>
            </div>
        </section>
    )
}

'use client'

import { EventItem } from "@/components/event"
import Modal from "@/components/modal"
import useModal from "@/components/modal/hook"
import { useUser } from "@clerk/nextjs"
import React from "react"
import { BsCalendarEvent } from "react-icons/bs"
import TEST from "@/helpers/test.png"

export default function Home() {
    const { user } = useUser()
    const { toggle, isShowing, setData, data } = useModal()

    const handleOpenModal = (title: string, event: 'off' | 'work', date: string) => {
        toggle()
        setData({
            title,
            event,
            date
        })
    }

    return (
        <React.Fragment>
            <section className='px-8 py-10 grid grid-cols-6 gap-5 grid-rows-1 h-full'>
                <div className="col-span-4 space-y-4 overflow-scroll">
                    <div className="p-5 bg-carbon-blue text-carbon-white rounded-md drop-shadow-lg flex flex-col ">
                        <h2 className='font-bold mb-5'>Bienvenue {user?.firstName} {user?.lastName} !</h2>
                        <span>
                            Lance toi dans l'aventure et poursuis ton apprentissage !
                        </span>
                    </div>
                    <h2 className="font-bold">Quoi de neuf chez Carbon ? </h2>
                    {/* news */}
                </div>

                <div className="col-span-2">
                    <div className="flex flex-col bg-carbon-white rounded-md drop-shadow-xl">
                        <div className="h-14 rounded-t-md bg-carbon-blue w-full flex justify-center items-center text-carbon-white">
                            Mes évènements
                            <BsCalendarEvent className="h-5 w-5 ml-3" />
                        </div>
                        <div className="p-3 w-full space-y-3">
                            <EventItem title="Event 1" type="off-work" date={'02/07/2023'}
                                action={() => handleOpenModal("Event 1", 'off', "02/07/2023")} />
                            <EventItem title="Event 2" type="work" date={'02/07/2023'}
                                action={() => handleOpenModal("Event 2", 'work', "02/07/2023")} />
                            <EventItem title="Event 3" type="off-work" date={'02/07/2023'}
                                action={() => handleOpenModal("Event 3", 'off', "02/07/2023")} />
                            <EventItem title="Event 4" type="work" date={'02/07/2023'}
                                action={() => handleOpenModal("Event 4", 'work', "02/07/2023")} />
                        </div>
                    </div>
                </div>
            </section>
            <Modal
                toggle={toggle}
                isShowing={isShowing}
                title={data?.title || ""}
                content={
                    <>
                        {data?.event}
                        <br />
                        {data?.date}
                    </>
                }
            />
        </React.Fragment>
    )
}
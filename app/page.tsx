'use client'

import { EventItem } from "@/components/event"
import Modal from "@/components/modal"
import useModal from "@/components/modal/hook"
import { useUser } from "@clerk/nextjs"
import React from "react"
import { BsCalendarEvent } from "react-icons/bs"
import { HiOutlineUserCircle } from 'react-icons/hi';
import Sarah from "@/helpers/sarah.png"
import Tyler from "@/helpers/tyler.png"
import Image from "next/image"
import { Progress } from "@/components/progress"
import { dataEvent } from "./events/data"
import { RhContact } from "@/components/rh-contact"
import { mockNew } from "@/mock"

export default function Home() {
    const { user } = useUser()
    const { toggle, isShowing, setData, data } = useModal()

    const handleOpenModal = (title: string, event: 'off-work' | 'work', date: string) => {
        toggle()
        setData({
            title,
            event,
            date
        })
    }

    return (
        <React.Fragment>
            <section className="flex flex-row px-8 py-10 gap-5 grid-rows-5 w-full h-full">
                <section className="grid grid-cols-4 gap-5 h-full w-2/3">
                    <div className="col-span-4 row-span-1 space-y-4 overflow-scroll">
                        <div className="p-5 bg-carbon-blue text-carbon-white rounded-md drop-shadow-lg flex flex-col ">
                            <h2 className='font-bold mb-5'>Bienvenue {user?.firstName} {user?.lastName} !</h2>
                            <span>
                                Lance toi dans l'aventure et poursuis ton apprentissage !
                            </span>
                        </div>
                    </div>
                    <div className="col-span-4 row-span-2 space-y-4 rounded-md drop-shadow-lg overflow-scroll">
                        <div className="p-5 bg-white rounded-md drop-shadow-lg flex flex-col ">
                            <h2 className="font-semi-bold text-2xl mb-8">Progression formations </h2>
                            <div className="overflow-hidden">
                                <Progress title="React JS" color="orange" progress={80} />
                                <Progress title="Angular" color="purple" progress={40} />
                                <Progress title="Java" color="cyan" progress={60} />
                                <Progress title="C#" color="yellow" progress={55} />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 row-span-2 space-y-4 overflow-x-auto rounded-md drop-shadow-lg flex flex-wrap">
                        <div className="p-5 bg-white rounded-md drop-shadow-lg flex flex-col ">
                            <h2 className="font-semi-bold text-2xl mb-8">Dernières actualités </h2>
                            <div className="grid grid-cols-3 gap-4">
                                {mockNew.map((item) => (
                                    <div key={item.id} className="bg-white rounded-lg shadow-md text-center cursor-pointer transform transition-transform duration-300 hover:scale-105">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            loading="lazy"
                                            className="w-full object-cover rounded-md"
                                            width={500}
                                            height={300}
                                        />
                                        <h3 className="text-lg font-semi-bold mt-2">{item.title}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </section>
                <section className="grid grid-cols-2 grid-rows-2 w-1/3 gap-5">
                    <div className="col-span-2 space-y-4 overflow-scroll rounded-md drop-shadow-xl">
                        <div className="flex flex-col bg-carbon-white rounded-md drop-shadow-xl">
                            <div className="h-14 rounded-t-md bg-carbon-blue w-full flex justify-center items-center text-carbon-white font-bold">
                                Mes évènements
                                <BsCalendarEvent className="h-5 w-5 ml-3" />
                            </div>
                            <div className="p-3 w-full space-y-3">
                                {dataEvent.map((item) => (
                                    <EventItem key={item.id} title={item.title} type={item.type} date={item.date}
                                        action={() => handleOpenModal(item.title, item.type, item.date)} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 space-y-4 overflow-scroll rounded-md drop-shadow-xl">
                        <div className="flex flex-col bg-carbon-white rounded-md drop-shadow-xl">
                            <div className="h-14 rounded-t-md bg-carbon-blue w-full flex justify-center items-center text-carbon-white font-bold">
                                Mes contacts
                                <HiOutlineUserCircle className="h-5 w-5 ml-3" />
                            </div>
                            <div className="p-3 w-full space-y-3">
                                <RhContact name="Sarah Col" email="sarah.col@carbon-it.com" phone="+ 33 6 12 34 56 78" avatar={Sarah} title={"Contact Ressource Humaine"} />
                                <RhContact name="Tyler Nix" email="tyler.nix@carbon-it.com" phone="+ 33 7 12 34 56 78" avatar={Tyler} title={"Contact Commercial"} />
                            </div>
                        </div>
                    </div>
                </section>
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

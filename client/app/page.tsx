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

const news = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
        title: "L’agilité en mission",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
        title: "Le télétravail : bénéfique ou risque ?",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        title: "Le coworking : ce qu’il faut savoir",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
        title: "Le télétravail : bénéfique ou risque ?",
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        title: "Le coworking : ce qu’il faut savoir",
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
        title: "L’agilité en mission",
    },
];



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

                        {/* progression */}
                        <div className="p-5 bg-white rounded-md drop-shadow-lg flex flex-col ">
                            <h2 className="font-semi-bold text-2xl mb-8">Progression formations </h2>
                            <div className="overflow-hidden">
                                {/* Formations */}
                                <div className="flex items-center mb-4">
                                    <div className="w-2/4 pr-4">
                                        <span className="text-lg font-light">Développement front-end</span>
                                    </div>
                                    <div className="relative flex-grow h-3 bg-orange-200 rounded">
                                        <div className="absolute top-0 left-0 h-full bg-orange-500 rounded w-2/5"></div>
                                    </div>
                                </div>
                                <div className="flex items-center mb-4">
                                    <div className="w-2/4 pr-4">
                                        <span className="text-lg font-light">Développement back-end</span>
                                    </div>
                                    <div className="relative flex-grow h-3 bg-green-200 rounded">
                                        <div className="absolute top-0 left-0 h-full bg-green-500 rounded w-4/5"></div>
                                    </div>
                                </div>
                                <div className="flex items-center mb-4">
                                    <div className="w-2/4 pr-4">
                                        <span className="text-lg font-light">UX / UI</span>
                                    </div>
                                    <div className="relative flex-grow h-3 bg-red-200 rounded">
                                        <div className="absolute top-0 left-0 h-full bg-red-500 rounded w-1/5"></div>
                                    </div>
                                </div>
                                <div className="flex items-center mb-4">
                                    <div className="w-2/4 pr-4">
                                        <span className="text-lg font-light">Web Design</span>
                                    </div>
                                    <div className="relative flex-grow h-3 bg-green-500 rounded">
                                        <div className="absolute top-0 left-0 h-full bg-green-500 rounded w-5/5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 row-span-2 space-y-4 overflow-x-auto rounded-md drop-shadow-lg flex flex-wrap">

                        {/* progression */}
                        <div className="p-5 bg-white rounded-md drop-shadow-lg flex flex-col ">
                            <h2 className="font-semi-bold text-2xl mb-8">Dernières actualités </h2>
                            <div className="overflow-hidden">
                                <div className="grid grid-cols-3 gap-4">
                                    {news.map((item) => (
                                        <div key={item.id} className="bg-white rounded-lg shadow-md text-center cursor-pointer transform transition-transform duration-300 hover:scale-105">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-40 object-cover rounded-md"
                                            />
                                            <h3 className="text-lg font-semi-bold mt-2">{item.title}</h3>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <section className="grid grid-cols-2 grid-rows-2 w-1/3">
                    <div className="col-span-2 space-y-4 overflow-scroll rounded-md drop-shadow-xl">
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
                                <EventItem title="Event 4" type="work" date={'02/07/2023'}
                                    action={() => handleOpenModal("Event 4", 'work', "02/07/2023")} />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 space-y-4 overflow-scroll rounded-md drop-shadow-xl">
                        <div className="flex flex-col bg-carbon-white rounded-md drop-shadow-xl">
                            <div className="h-14 rounded-t-md bg-carbon-blue w-full flex justify-center items-center text-carbon-white">
                                Mes contacts
                                <HiOutlineUserCircle className="h-5 w-5 ml-3" />
                            </div>
                            <div className="p-3 w-full space-y-3">
                                <h2 className="font-bold">Contact Ressource Humaines</h2>
                                <div className="flex items-center flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-4 p-4 bg-white rounded-lg border">
                                    <div className="flex-shrink-0 w-12 h-12">
                                        <Image src={Sarah} alt="Avatar" width={100} height={100} loading="lazy" className="object-cover rounded-full" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold">Sarah Col</span>
                                        <span className="text-gray-600">sarah.col@carbon-it.com</span>
                                        <span className="text-gray-600">+ 33 6 12 34 56 78</span>
                                    </div>
                                    <div className="mt-4 sm:mt-0">
                                        <button className="block px-4 py-2 bg-blue-500 text-white rounded-md shadow-md mb-2 w-full">
                                            Prendre RDV
                                        </button>
                                    </div>
                                </div>
                                <h2 className="font-bold">Contact Commercial</h2>
                                <div className="flex items-center flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-4 p-4 bg-white rounded-lg border">
                                    <div className="flex-shrink-0 w-12 h-12">
                                        <Image src={Tyler} alt="Avatar" width={100} height={100} loading="lazy" className="object-cover rounded-full" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold">Tyler Nix</span>
                                        <span className="text-gray-600">tyler.nix@carbon-it.com</span>
                                        <span className="text-gray-600">+33 7 12 34 56 78</span>
                                    </div>
                                    <div className="mt-4 sm:mt-0">
                                        <button className="block px-4 py-2 bg-blue-500 text-white rounded-md shadow-md mb-2 w-full">
                                            Prendre RDV
                                        </button>

                                    </div>
                                </div>


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


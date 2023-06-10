'use client'

import { EventItem } from "@/components/event"
import Modal from "@/components/modal"
import useModal from "@/components/modal/hook"
import React from "react"
import { BsCalendarEvent } from "react-icons/bs"
import { HiOutlineUserCircle } from 'react-icons/hi';
import { FaReact, FaAngular, FaJava } from 'react-icons/fa';
import { SiCsharp } from 'react-icons/si';
import Sarah from "@/helpers/sarah.png"
import Tyler from "@/helpers/tyler.png"
import Image from "next/image"
import { dataEvent } from "./events/data"
import { RhContact } from "@/components/rh-contact"
import { mockNew } from "@/mock"
import { Button, Input } from "@material-tailwind/react"

export default function Home() {

    const { toggle, isShowing, setData, data } = useModal()
    const { toggle: rhToggle, isShowing: showRh, setData: setRh, data: dataRh } = useModal()

    const handleOpenModal = (title: string, event: 'off-work' | 'work', date: string) => {
        toggle()
        setData({
            title,
            event,
            date
        })
    }

    const formations = [
        { title: 'React JS', progress: 76, icon: <FaReact /> },
        { title: 'Angular', progress: 31, icon: <FaAngular /> },
        { title: 'Java', progress: 52, icon: <FaJava /> },
        { title: 'C#', progress: 19, icon: <SiCsharp /> },

    ];

    const getColor = (progress: number) => {
        if (progress === 0) {
            return 'gray';
        } else if (progress < 20) {
            return 'red';
        } else if (progress < 50) {
            return 'orange';
        } else if (progress <= 100) {
            return 'green';
        } else {
            return 'gray';
        }
    };

    const handleOpenRhModal = (name: string) => {
        rhToggle()
        setRh({
            name
        })
    }

    return (
        <React.Fragment>
            <section className="flex flex-row px-8 py-10 gap-5 grid-rows-5 w-full h-full">
                <section className="grid grid-cols-4 gap-5 h-full w-2/3">
                    <div className="col-span-4 row-span-1 space-y-4 overflow-scroll">
                        <div className="p-5 bg-carbon-blue text-carbon-white rounded-md drop-shadow-lg flex flex-col ">
                            <h2 className='font-bold mb-5'>Bienvenue !</h2>
                            <span>
                                Lance toi dans l'aventure et poursuis ton apprentissage !
                            </span>
                        </div>
                    </div>
                    <div className="col-span-4 row-span-2 space-y-4 rounded-md drop-shadow-lg overflow-scroll">
                        <div className="p-5 bg-white rounded-md drop-shadow-lg flex flex-col ">
                            <h2 className="font-semi-bold text-2xl mb-8">Progression formations </h2>
                            <div className="overflow-hidden">
                                {formations.map((formation, index) => (
                                    <div className="flex items-center mb-4" key={index}>
                                        <div className="w-2/4 pr-4 flex items-center">

                                            <span className="text-lg font-light mr-2">{formation.title}</span>
                                            {formation.icon}
                                        </div>
                                        <div
                                            className={`relative flex-grow h-5 bg-${getColor(
                                                formation.progress
                                            )}-200 rounded`}
                                        >
                                            <div
                                                className={`absolute top-0 left-0 h-full bg-${getColor(
                                                    formation.progress
                                                )}-500 rounded`}
                                                style={{ width: `${formation.progress}%`, padding: '0 20px' }}
                                            >
                                                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">
                                                    {formation.progress}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                                <RhContact name="Sarah Col" email="sarah.col@carbon-it.com" phone="+ 33 6 12 34 56 78" avatar={Sarah} title={"Contact Ressource Humaine"} action={() => handleOpenRhModal('Sarah Col')} />
                                <RhContact name="Tyler Nix" email="tyler.nix@carbon-it.com" phone="+ 33 7 12 34 56 78" avatar={Tyler} title={"Contact Commercial"} action={() => handleOpenRhModal('Tyler Nix')} />
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
            <Modal
                toggle={rhToggle}
                isShowing={showRh}
                title={`Prise de contact avec ${dataRh?.name}`}
                content={
                    <form className="flex flex-col space-y-3">
                        <Input type="text" label="Motif" />
                        <Input type="datetime-local" label="Date" />
                        <div className="w-full flex justify-end">
                            <Button color="blue" type="submit">Envoyer</Button>
                        </div>
                    </form>
                }
            />

        </React.Fragment>
    )
}

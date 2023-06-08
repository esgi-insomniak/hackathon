import React from "react"
import Image, { StaticImageData } from "next/image"
import { Button } from "@material-tailwind/react";

export interface RhContactProps {
    title: string;
    email: string;
    phone: string;
    avatar: StaticImageData;
    name: string;
}

export const RhContact = ({ title, email, phone, avatar, name }: RhContactProps) => {
    return (
        <React.Fragment>
            <h2 className="font-bold">{title}</h2>
            <div className="flex items-center flex-col rounded-lg space-y-2">
                <div className="w-full flex mx-auto space-x-5">
                    <div className="col-span-1">
                        <Image src={avatar} alt="Avatar" width={50} height={50} loading="lazy" className="object-cover rounded-full" />
                    </div>
                    <div className="flex flex-col text-sm w-full -space-y-1 col-span-2">
                        <span className="font-bold">{name}</span>
                        <span className="text-gray-600">{email}</span>
                        <span className="text-gray-600">{phone}</span>
                    </div>
                </div>
                <div className="flex space-x-5 w-full justify-center">
                    <Button variant="outlined" fullWidth style={{ paddingTop: 5, paddingBottom: 5 }}>
                        Contacter
                    </Button>
                    <Button fullWidth style={{ paddingTop: 5, paddingBottom: 5 }}>
                        Prendre RDV
                    </Button>
                </div>
            </div>
        </React.Fragment>
    )
}
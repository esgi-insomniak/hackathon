'use client'
import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import {
    HiOutlineUser
} from "react-icons/hi";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useAuth, useUser } from "@clerk/nextjs";
import { BsCalendarEvent } from "react-icons/bs";
import { MdOutlineDashboard, MdOutlineForum } from "react-icons/md";
import { AiOutlineCode } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Logo } from "@/helpers/svg/logo";

export default function SideBar() {
    const { user, isLoaded } = useUser()
    const { signOut } = useAuth()
    const router = useRouter()

    return (
        <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[15rem]  shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4 flex justify-center">
                <Logo />
            </div>
            <hr className="my-2 border-blue-gray-50" />
            <List>
                <ListItem onClick={() => router.push('/')}>
                    <ListItemPrefix>
                        <MdOutlineDashboard className="h-5 w-5" />
                    </ListItemPrefix>
                    Dashboard
                </ListItem>
                <ListItem onClick={() => router.push('/formations')}>
                    <ListItemPrefix>
                        <AiOutlineCode className="h-5 w-5" />
                    </ListItemPrefix>
                    Formations
                </ListItem>
                <ListItem onClick={() => router.push('/forum')}>
                    <ListItemPrefix>
                        <MdOutlineForum className="h-5 w-5" />
                    </ListItemPrefix>
                    Forum
                </ListItem>
                <ListItem onClick={() => router.push('/events')}>
                    <ListItemPrefix>
                        <BsCalendarEvent className="h-5 w-5" />
                    </ListItemPrefix>
                    Evenements
                </ListItem>
                <ListItem onClick={() => router.push(`/user/${user?.id}`)}>
                    <ListItemPrefix>
                        <HiOutlineUser className="h-5 w-5" />
                    </ListItemPrefix>
                    {!isLoaded ? "Loading..." : (user?.firstName + " " + user?.lastName)}
                </ListItem>
                <div className="absolute bottom-4 right-11">
                    <ListItem onClick={() => signOut()}>
                        <ListItemPrefix>
                            <AiOutlinePoweroff className="h-5 w-5 text-red-500" />
                        </ListItemPrefix>
                        <Typography color="red" variant="h6">
                            Déconnexion
                        </Typography>
                    </ListItem>
                </div>
            </List>
        </Card>
    );
}
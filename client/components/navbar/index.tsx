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
import { MdOutlineDashboard, MdOutlineForum, MdQuiz } from "react-icons/md";
import { AiOutlineCode } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Logo } from "@/helpers/svg/logo";

export default function SideBar() {
    const { user, isLoaded } = useUser()
    const { signOut } = useAuth()
    const router = useRouter()

    return (
        <Card className="w-full shadow-xl shadow-blue-gray-900/5 h-full">
            <div className="flex justify-center items-center">
                <Logo />
            </div>
            <hr className="my-2 border-blue-gray-50" />
            <List className="flex justify-between h-full">
                <div>
                    <ListItem onClick={() => router.push('/')}>
                        <ListItemPrefix>
                            <MdOutlineDashboard className="h-5 w-5" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                    <ListItem onClick={() => router.push('/quizz')}>
                        <ListItemPrefix>
                            <MdQuiz className="h-5 w-5" />
                        </ListItemPrefix>
                        Quizz
                    </ListItem>
                    <ListItem onClick={() => router.push('/formation')}>
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
                </div>
                <ListItem onClick={() => signOut()} className="flex justify-center items-center">
                    <ListItemPrefix>
                        <AiOutlinePoweroff className="h-5 w-5 text-red-500" />
                    </ListItemPrefix>
                    <Typography color="red" variant="h6">
                        Déconnexion
                    </Typography>
                </ListItem>
            </List>
        </Card>
    );
}
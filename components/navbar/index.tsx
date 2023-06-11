"use client";
import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  AiOutlinePoweroff,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import { BsCalendarEvent } from "react-icons/bs";
import { MdOutlineDashboard, MdOutlineForum } from "react-icons/md";
import { AiOutlineCode } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Logo } from "@/helpers/svg/logo";
import { SlMagnifier } from "react-icons/sl";
import { GrValidate } from "react-icons/gr";
import { useAuth } from "@/providers/auth";

export default function SideBar() {
  const router = useRouter();
  const { logout, record } = useAuth();

  return (
    <Card className="w-full shadow-xl shadow-blue-gray-900/5 h-full">
      <div className="flex justify-center items-center">
        <Logo />
      </div>
      <hr className="my-2 border-blue-gray-50" />
      <List className="flex justify-between h-full">
        <div>
          <ListItem onClick={() => router.push("/")}>
            <ListItemPrefix>
              <MdOutlineDashboard className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem onClick={() => router.push("/search")}>
            <ListItemPrefix>
              <SlMagnifier className="h-5 w-5" />
            </ListItemPrefix>
            Rechercher
          </ListItem>
          <ListItem onClick={() => router.push("/quizz")}>
            <ListItemPrefix>
              <AiOutlineCode className="h-5 w-5" />
            </ListItemPrefix>
            Formations / Quizz
          </ListItem>
          <ListItem onClick={() => router.push("/forum")}>
            <ListItemPrefix>
              <MdOutlineForum className="h-5 w-5" />
            </ListItemPrefix>
            Forum
          </ListItem>
          <ListItem onClick={() => router.push("/events")}>
            <ListItemPrefix>
              <BsCalendarEvent className="h-5 w-5" />
            </ListItemPrefix>
            Evenements
          </ListItem>
          <ListItem onClick={() => router.push("/succes")}>
            <ListItemPrefix>
              <GrValidate className="h-5 w-5" />
            </ListItemPrefix>
            Succès
          </ListItem>
          {/* <ListItem onClick={() => router.push(`/user/${record?.id}`)}>
                        <ListItemPrefix>
                            {record?.avatar && (
                                <Image src={record?.avatar} width={20} height={20} className="rounded-full" alt="ton-user" />
                            )}
                        </ListItemPrefix>
                        {record?.name}
                    </ListItem> */}
          <ListItem onClick={() => router.push(`/user/${record?.id}`)}>
            <ListItemPrefix>
              <AiOutlineUser className="h-5 w-5" />
            </ListItemPrefix>
            Mon profil
          </ListItem>
        </div>
        <ListItem onClick={logout} className="flex justify-center items-center">
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

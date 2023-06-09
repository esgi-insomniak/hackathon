"use client";

import React from "react";
import TableSearch from "@/components/search/TableSearch";

export default function SearchPage() {
  const data = [
    {
      name: "Bessonnier",
      firstname: "Raphaël",
      profilePicture: "https://www.w3schools.com/howto/img_avatar.png",
      poste: "Développeur",
      skills: [
        {
          color: "brown",
          logo: "/badgesImages/woodBlock.png",
          stack: "Javascript",
          level: "Niveau Bois",
        },
        {
          color: "brown",
          logo: "/badgesImages/woodBlock.png",
          stack: "Javascript",
          level: "Niveau Bois",
        },
        {
          color: "brown",
          logo: "/badgesImages/woodBlock.png",
          stack: "Javascript",
          level: "Niveau Bois",
        },
      ],
    },
    {
      name: "Cleris",
      firstname: "Loan",
      profilePicture: "https://www.w3schools.com/howto/img_avatar.png",
      poste: "Développeur",
      skills: [
        {
          color: "brown",
          logo: "/badgesImages/woodBlock.png",
          stack: "C#",
          level: "Niveau Bois",
        },
        {
          color: "brown",
          logo: "/badgesImages/woodBlock.png",
          stack: "C#",
          level: "Niveau Bois",
        },
        {
          color: "brown",
          logo: "/badgesImages/woodBlock.png",
          stack: "C#",
          level: "Niveau Bois",
        },
      ],
    },
    {
      name: "Jamin",
      firstname: "Mael",
      profilePicture: "https://www.w3schools.com/howto/img_avatar.png",
      poste: "Développeur",
      skills: [
        {
          color: "brown",
          logo: "/badgesImages/woodBlock.png",
          stack: "C#",
          level: "Niveau Bois",
        },
        {
          color: "brown",
          logo: "/badgesImages/woodBlock.png",
          stack: "C#",
          level: "Niveau Bois",
        },
        {
          color: "brown",
          logo: "/badgesImages/woodBlock.png",
          stack: "C#",
          level: "Niveau Bois",
        },
      ],
    },
    {
      name: "Cuillandre",
      firstname: "Tom",
      profilePicture: "https://www.w3schools.com/howto/img_avatar.png",
      poste: "Développeur",
      skills: [
        {
          color: "brown",
          logo: "/badgesImages/woodBlock.png",
          stack: "C#",
          level: "Niveau Bois",
        },
        {
          color: "brown",
          logo: "/badgesImages/woodBlock.png",
          stack: "C#",
          level: "Niveau Bois",
        },
        {
          color: "brown",
          logo: "/badgesImages/woodBlock.png",
          stack: "C#",
          level: "Niveau Bois",
        },
      ],
    },
    {
      name: "Mohamed",
      firstname: "Kassim",
      profilePicture: "https://www.w3schools.com/howto/img_avatar.png",
      poste: "Développeur",
      skills: [
        {
          color: "cyan",
          logo: "/badgesImages/diamondBlock.png",
          stack: "PHP",
          level: "Niveau Diamant",
        },
        {
          color: "yellow",
          logo: "/badgesImages/goldBlock.png",
          stack: "JS",
          level: "Niveau Or",
        },
        {
          color: "blue-gray",
          logo: "/badgesImages/ironBlock.png",
          stack: "ReactJS",
          level: "Niveau Fer",
        },
      ],
    },
    {
      name: "Laurence",
      firstname: "Yann",
      profilePicture: "https://www.w3schools.com/howto/img_avatar.png",
      poste: "Marketeur",
      skills: [
        {
          color: "brown",
          logo: "/badgesImages/woodBlock.png",
          stack: "C#",
          level: "Niveau Bois",
        },
        {
          color: "brown",
          logo: "/badgesImages/woodBlock.png",
          stack: "C#",
          level: "Niveau Bois",
        },
        {
          color: "brown",
          logo: "/badgesImages/woodBlock.png",
          stack: "C#",
          level: "Niveau Bois",
        },
      ],
    },
  ];

  return (
    <React.Fragment>
      <div className="pt-2 relative text-gray-600">
            <TableSearch data={data}/>
      </div>
    </React.Fragment>
  );
}

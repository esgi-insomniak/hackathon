"use client";

import React from "react";
import CardSearch from "@/components/search/CardSearch";

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

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const fullName = `${item.firstname} ${item.name}`.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    const matchingSkills = item.skills
      .map((skill) => skill.stack.toLowerCase())
      .filter((skill) => skill.includes(searchTermLower));

    return fullName.includes(searchTermLower) || matchingSkills.length > 0;
  });

  return (
    <React.Fragment>
      <div className="pt-2 relative text-gray-600">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-1/3 mx-auto"
          type="search"
          name="search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="flex flex-wrap justify-center my-10">
        {!filteredData.length
          ? data.map((item, index) => <CardSearch data={item} key={index} />)
          : filteredData.map((item, index) => (
              <CardSearch data={item} key={index} />
            ))}
      </div>
    </React.Fragment>
  );
}

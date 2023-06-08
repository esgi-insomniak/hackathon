"use client";

import React from "react";
import MissionAccordeons from "@/components/FollowUp/MissionAccordeons";
import BadgesSkills from "@/components/FollowUp/BadgesSkills";
import { Button, Card } from "@material-tailwind/react";
import ListComponent from "@/components/FollowUp/List";
import { IoSchoolSharp } from "react-icons/io5";
import { SiGooglemaps } from "react-icons/si";
import { GrUserWorker } from "react-icons/gr";
import { AiOutlineMail, AiFillPhone } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";

const data = {
  name: "Bessonnier",
  firstname: "Raphaël",
  profilePicture: "https://www.w3schools.com/howto/img_avatar.png",
  poste: "Développeur",
};

export default function Page() {
  const fullName = `${data.firstname}-${data.name}`;
  console.log("ok");
  console.log(fullName);
  const data2 = [
    ["Soirée Pizza", "08/06/2023", "afterwork"],
    ["Bienvenue chez CarbonIT", "08/06/2023", "badges"],
    ["Formation React", "08/06/2023", "formation"],
    ["Mission CarbonIT", "08/06/2023", "mission"],
  ];

  const missionAccordeons = [
    {
      missionName: "Mission 1",
      missionDate: "15/03/2023 au 15/03/2023",
      missionDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi vitae nunc aliquam aliquet. Sed vitae nisi vitae nunc aliquam aliquet.",
    },
    {
      missionName: "Mission 2",
      missionDate: "15/03/2023 au 15/03/2023",
      missionDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi vitae nunc aliquam aliquet. Sed vitae nisi vitae nunc aliquam aliquet.",
    },
    {
      missionName: "Mission 3",
      missionDate: "15/03/2023 au 15/03/2023",
      missionDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi vitae nunc aliquam aliquet. Sed vitae nisi vitae nunc aliquam aliquet.",
    },
  ];

  const badgesSkills1 = {
    color: "blue-gray",
    logo: "/badgesImages/ironBlock.png",
    stack: "Java",
    level: "Niveau Fer",
  };

  const badgesSkills2 = {
    color: "yellow",
    logo: "/badgesImages/goldBlock.png",
    stack: ".NET",
    level: "Niveau Or",
  };

  const badgesSkills3 = {
    color: "brown",
    logo: "/badgesImages/woodBlock.png",
    stack: "C#",
    level: "Niveau Bois",
  };
  const badgesSkills4 = {
    color: "blue-gray",
    logo: "/badgesImages/ironBlock.png",
    stack: "ReactJS",
    level: "Niveau Fer",
  };
  const badgesSkills5 = {
    color: "gray",
    logo: "/badgesImages/cobbleBlock.png",
    stack: "Angular",
    level: "Niveau Pierre",
  };
  const badgesSkills6 = {
    color: "cyan",
    logo: "/badgesImages/diamondBlock.png",
    stack: "VueJS",
    level: "Niveau DIamant",
  };

  return (
    <React.Fragment>
      <div className="">
        <div className="flex justify-around items-center my-5">
          <div className="flex items-center my-5">
            <div>
              <img
                className="w-32 h-32 rounded-full mx-5"
                src={data.profilePicture}
                alt="nature image"
              />
            </div>
            <div>
              <h1 className="block font-sans text-3xl font-semibold leading-tight tracking-normal text-inherit antialiased mx-auto">
                {fullName}
              </h1>
              <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased mx-auto">
                {data.poste}
              </h2>
            </div>
          </div>
          <div className="w-2/5">
            <div className="mx-auto">
              <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center my-3">
                Informations
              </h2>
              <hr />
              <div className="flex justify-between items-center my-3">
                <div className="mx-3 w-1/2">
                  <p className="flex gap-4 items-center">
                    <SiGooglemaps />1 rue de la paix - Paris
                  </p>
                  <p className="flex gap-4 items-center">
                    <GrUserWorker />3 ans d'expérience
                  </p>
                  <p className="flex gap-4 items-center">
                    <IoSchoolSharp /> Bac +5
                  </p>
                </div>
                <div className="mx-3 w-1/3">
                  <p className="flex gap-4 items-center">
                    <AiOutlineMail />
                    test@test.fr
                  </p>
                  <p className="flex gap-4 items-center">
                    <AiFillPhone />
                    010203040506
                  </p>
                  <p className="flex gap-4 items-center">
                    <CgWebsite />
                    https://www.test.fr
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-around items-start">
          <div className="w-1/2">
            <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
              Compétences
            </h2>
            <div className="mt-5 mx-5 grid xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-4">
              <BadgesSkills props={badgesSkills1} />
              <BadgesSkills props={badgesSkills2} />
              <BadgesSkills props={badgesSkills3} />
              <BadgesSkills props={badgesSkills4} />
              <BadgesSkills props={badgesSkills5} />
              <BadgesSkills props={badgesSkills6} />
            </div>
            <Button className="flex items-center mx-auto my-5">
              Se former sur une formation
            </Button>
          </div>
          <div className="w-1/3">
            <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
              Dernières missions
            </h2>
            <div className="mx-auto w-full flex justify-around flex-wrap mt-5">
              <MissionAccordeons data={missionAccordeons} />
            </div>
          </div>
        </div>
        <div className="flex justify-around items-start mt-8 mb-5">
          <div className="w-1/2">
            <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
              Badges acquis
            </h2>
            <p className="text-center">Aucun badges acquis pour le moment</p>
          </div>
          <div className="w-1/3">
            <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
              Historiques
            </h2>
            <div>
              <ListComponent data={data2} fullname={fullName} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

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
import colors from "tailwindcss/colors";

const data = {
  name: "Bessonnier",
  firstname: "Raphaël",
  profilePicture: "https://www.w3schools.com/howto/img_avatar.png",
  poste: "Développeur",
};

export default function Page() {
  const data1 = [
    ["Afterwork", "15/03/2023"],
    ["Présentation de sujet", "02/02/2023"],
    ["Accompagnement de junior", "01/11/2022"],
  ];

  const data2 = [
    ["PHP - Confirmé", "89% / Acquis"],
    ["React - Expert", "30% / Révision recommandé"],
    ["Angular - Novice", "54% / Consolidation"],
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
    color: "yellow",
    logo: "/badgesImages/goldBlock.png",
    stack: "Java",
    level: "Niveau Or",
  };

  const badgesSkills2 = {
    color: "gray",
    logo: "/badgesImages/ironBlock.png",
    stack: ".NET",
    level: "Niveau Fer",
  };

  const badgesSkills3 = {
    color: "orange",
    logo: "/badgesImages/copperBlock.png",
    stack: "C#",
    level: "Niveau Cuivre",
  };
  const badgesSkills4 = {
    color: "green",
    logo: "/badgesImages/emeraldBlock.png",
    stack: "ReactJS",
    level: "Niveau Emeraude",
  };
  const badgesSkills5 = {
    color: "gray",
    logo: "/badgesImages/ironBlock.png",
    stack: "Angular",
    level: "Niveau Fer",
  };
  const badgesSkills6 = {
    color: "cyan",
    logo: "/badgesImages/diamondBlock.png",
    stack: "VueJS",
    level: "Niveau DIamant",
  };

  return (
    <React.Fragment>
      <div className="mx-3">
        <div className="flex justify-around items-center my-5">
          <div className="flex items-center my-5">
            <div>
              <img
                className="w-32  h-32 rounded-full m-5"
                src={data.profilePicture}
                alt="nature image"
              />
            </div>
            <div>
              <h1 className="block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased mx-auto">
                {data.firstname} {data.name}
              </h1>
              <h2 className="block font-sans text-3xl font-semibold leading-tight tracking-normal text-inherit antialiased mx-auto">
                {data.poste}
              </h2>
            </div>
          </div>
          <div className="w-2/5">
            <Card className="mx-auto">
              <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center my-3">
                Informations sur le collaborateurs
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
            </Card>
          </div>
        </div>
        <div className="flex justify-around items-start mt-8">
          <div className="w-1/2">
            <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
              Compétences du collaborateurs
            </h2>
            <div className="mt-8 mx-5 grid grid-cols-5 gap-4">
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
              Dernières missions du collaborateurs
            </h2>
            <div className="mx-auto w-full flex justify-around flex-wrap mt-8">
              <MissionAccordeons data={missionAccordeons} />
            </div>
          </div>
        </div>
        <div className="flex justify-around items-start mt-8 mb-5">
          <div className="w-1/2">
            <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
              Mes badges acquis
            </h2>
            <p className="text-center">Aucun badges acquis pour le moment</p>
          </div>
          <div className="w-1/3">
            <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
              Mes dernières formations
            </h2>
            <div>
              <ListComponent data={data2} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

'use client'

import React from "react";

import { useUser } from "@clerk/nextjs";
import BadgesSkills from "@/components/FollowUp/BadgesSkills";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@material-tailwind/react";
import { BsBuilding } from "react-icons/bs";



export default function Page() {
  
  const { user } = useUser();
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

  const experiences = [
    {
      id: 1,
      title: "Développeur Web",
      company: "ABC Company",
      duration: "Janvier 2019 - Présent",
      description:
        "Responsable du développement et de la maintenance des applications web de l'entreprise.",
    },
    {
      id: 2,
      title: "Stagiaire en design UX",
      company: "XYZ Agency",
      duration: "Mai 2018 - Août 2018",
      description:
        "Travaillé sur des projets de conception d'interfaces utilisateur conviviales et attrayantes.",
    },
    {
      id: 3,
      title: "Ingénieur logiciel",
      company: "DEF Corporation",
      duration: "Septembre 2017 - Décembre 2018",
      description:
        "Conception et développement de logiciels pour des clients internationaux.",
    },
  ];
  
  return (
    <div className="flex justify-start items-start h-screen flex-col mx-8 p-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center space-x-4">
          <img
            src="/path/to/profile-image.jpg"
            alt="Profile Image"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-500">Développeur web</p>
            <p className="text-gray-500">Paris, France</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">À propos</h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            ullamcorper cursus risus in gravida. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia Curae; Duis vitae
            sapien sit amet risus malesuada auctor.
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Compétences</h3>
          <div className="grid grid-cols-5 gap-4">
            <BadgesSkills props={badgesSkills1} />
            <BadgesSkills props={badgesSkills2} />
            <BadgesSkills props={badgesSkills3} />
            <BadgesSkills props={badgesSkills4} />
            <BadgesSkills props={badgesSkills5} />
            <BadgesSkills props={badgesSkills6} />
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Expérience professionnelle</h3>
          <div className="flex flex-col space-y-4">
          <div className="w-[35rem]">
          <Timeline>
            {experiences.map((experience, index) => (
              <TimelineItem key={experience.id} className="mb-4">
                {index !== 0 && <TimelineConnector className="!w-[78px]" />}
                <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                  <TimelineIcon className="p-3" variant="ghost">
                    <BsBuilding className="h-5 w-5" />
                  </TimelineIcon>
                  <div className="flex flex-col gap-1">
                    <Typography variant="h6" color="blue-gray">
                      {experience.title}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      {experience.company}
                    </Typography>
                    <Typography variant="caption" color="gray" className="font-normal">
                      {experience.duration}
                    </Typography>
                    <Typography variant="body2">
                      {experience.description}
                    </Typography>
                  </div>
                </TimelineHeader>
              </TimelineItem>
            ))}
          </Timeline>
</div>






          </div>
        </div>
      </div>
    </div>
  );
}

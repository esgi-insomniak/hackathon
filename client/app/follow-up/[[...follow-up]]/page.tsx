"use client";

import React from "react";
import CardMission from "@/components/FollowUp/Card";
import ProgressBar from "@/components/FollowUp/ProgressBar";
import { Button, Card } from "@material-tailwind/react";
import ListComponent from "@/components/FollowUp/List";

const data = {
  name: "Bessonnier",
  firstname: "Raphaël",
  profilePicture: "https://www.w3schools.com/howto/img_avatar.png",
  poste: "Développeur",
};

export default function Page() {
  const data1 = [
    ["Développement Front", "Senior"],
    ["Développement Back", "Senior"],
    ["Développement Mobile", "Senior"],
    ["Développement Web", "Senior"],
    ["Développement Front", "Senior"],
  ];

  const data2 = [
    ["React", "Senior"],
    ["NodeJS", "Senior"],
    ["React Native", "Senior"],
    ["Angular", "Senior"],
    ["VueJS", "Senior"],
  ];

  const cardMission1 = {
    missionName: "Mission 1",
    missionDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.",
    missionDate: "01/01/2021 au 01/01/2022",
  };
  const cardMission2 = {
    missionName: "Mission 2",
    missionDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.",
    missionDate: "01/01/2022 au 01/01/2023",
  };
  const cardMission3 = {
    missionName: "Mission 3",
    missionDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.",
    missionDate: "01/01/2023 au 01/01/2024",
  };

  const progressBar1 = {
    value: 75,
    label: "Senior",
    color: "green",
  }

  const progressBar2 = {
    value: 100,
    label: "Senior",
    color: "red",
  }

  const progressBar3 = {
    value: 55,
    label: "Confirmé",
    color: "blue",
  }

  const progressBar4 = {
    value: 41,
    label: "Iron ingot",
    color: "indigo",
  }

  const progressBar5 = {
    value: 75,
    label: "Senior",
    color: "orange",
  }

  return (
    <React.Fragment>
      <div className="flex justify-around items-center my-5">
        <div className="flex items-center my-5">
          <div className="">
            <img
              className="h-44 w-44 rounded-full m-5"
              src={data.profilePicture}
              alt="nature image"
            />
          </div>
          <div className="">
            <h1 className="block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased mx-auto">
              {data.firstname} {data.name}
            </h1>
            <h2 className="block font-sans text-3xl font-semibold leading-tight tracking-normal text-inherit antialiased mx-auto">
              {data.poste}
            </h2>
          </div>
        </div>
        <div className="w-1/2">
          <Card className="mx-auto">
            <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center my-5">
              Informations sur le collaborateurs
            </h2>
            <hr />
            <div className="flex justify-between items-center my-5 mx-3">
              <div>
                <p>Age : 25 ans</p>
                <p>Adresse : 1 rue de la paix</p>
                <p>Code postal : 75000</p>
                <p>Ville : Paris</p>
              </div>
              <div>
                <p>Experience: 3 ans</p>
                <p>Formation : Bac +5</p>
                <p>Disponibilité : 1 mois</p>
                <p>Secteur: Banque, Informatique...</p>
              </div>
              <div>
                <p>Adresse mail: test@test.fr</p>
                <p>Téléphone: 010203040506</p>
                <p>Portfolio: https://www.test.fr</p>
                <p>Linkedin: </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="flex justify-around items-start mt-20">
        <div className="w-1/2">
          <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
            Compétences du collaborateurs
          </h2>
          <div className="mt-8 mx-5">
            <div className="my-5">
              <p>Développement Front : </p>
              <ProgressBar props={progressBar1} />
              <p>Technologies : React (Débutant), Vue, Angular, HTML, CSS</p>
            </div>
            <div className="my-5">
              <p>Développement Back : </p>
              <ProgressBar props={progressBar2} />
              <p>Technologies : PHP (Senior), C#, Java, .net</p>
            </div>
            <div className="my-5">
              <p>Base de données : </p>
              <ProgressBar props={progressBar3} />
              <p>Technologies : SEO, SEA</p>
            </div>
            <div className="my-5">
              <p>DevOps : </p>
              <ProgressBar props={progressBar4} />
              <p>Technologies : Docker, Kubernetes, DevOps</p>
            </div>
            <div className="my-5">
              <p>Management : </p>
              <ProgressBar props={progressBar5} />
              <p>Technologies : Esprit d'équipe, motivation</p>
            </div>
          </div>
          <div className="my-5">
            <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
              Badges acquis
            </h2>
            <p className="text-center">Aucun badges acquis pour le moment</p>
          </div>
          <Button className="flex items-center mx-auto mt-5">
            Se former sur une formation
          </Button>
        </div>
        <div className="w-1/2">
          <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
            Dernières missions du collaborateurs
          </h2>
          <div className="mx-auto w-full flex justify-around flex-wrap">
            <CardMission props={cardMission1} />
            <CardMission props={cardMission1} />
            <CardMission props={cardMission1} />
          </div>
        </div>
      </div>
      <div className="flex justify-around items-start mt-20 mb-5">
        <div>
          <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
            Mon impact dans l'entreprise
          </h2>
          <div>
            <ListComponent data={data1} />
          </div>
        </div>
        <div>
          <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
            Mes dernières formations
          </h2>
          <div>
            <ListComponent data={data2} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

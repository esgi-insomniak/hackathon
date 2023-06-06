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
            <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
              Informations sur le collaborateurs
            </h2>
            <hr />
            <div className="flex justify-between items-center">
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
          <div className="w-full mt-6 mx-5">
            <div className="my-5">
              <ProgressBar />
              <p>Technologies : React (Débutant), Vue, Angular, HTML, CSS</p>
            </div>
            <div className="my-5">
              <ProgressBar />
              <p>Technologies : PHP (Senior), C#, Java, .net</p>
            </div>
            <div className="my-5">
              <ProgressBar />
              <p>Technologies : SEO, SEA</p>
            </div>
            <div className="my-5">
              <ProgressBar />
              <p>Technologies : Docker, Kubernetes, DevOps</p>
            </div>
            <div className="my-5">
              <ProgressBar />
              <p>Technologies : Esprit d'équipe, motivation</p>
            </div>
          </div>
          <div>
            <Button className="mx-auto">Se former sur une formation</Button>
          </div>
        </div>
        <div className="w-1/2">
          <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
            Dernières missions du collaborateurs
          </h2>
          <div className="mx-auto w-full flex justify-around flex-wrap mt-6">
            <CardMission />
            <CardMission />
            <CardMission />
          </div>
          <Button className="mx-auto text-center">
            Se placer sur une nouvelle mission
          </Button>
        </div>
      </div>
      <div className="flex justify-around items-start mt-20 mb-5">
        <div>
          <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
            Mon impact dans l'entreprise
          </h2>
          <div>
            <ListComponent />
          </div>
        </div>
        <div>
          <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
            Mes dernières formations
          </h2>
          <div>
            <ListComponent />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

"use client";

import React from "react";
import { IoSchoolSharp } from "react-icons/io5";
import { SiGooglemaps } from "react-icons/si";
import { GrUserWorker } from "react-icons/gr";
import { AiOutlineMail, AiFillPhone } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import TableHistorique from "@/components/historique/Table";

const data = {
  name: "Bessonnier",
  firstname: "Raphaël",
  profilePicture: "https://www.w3schools.com/howto/img_avatar.png",
  poste: "Développeur",
};

export default function Page() {
  const data2 = [
    ["Rendu du hackathon", "formation", "09/06/2023"],
    ["Soirée Pizza", "afterwork", "08/06/2023"],
    ["Bienvenue chez CarbonIT", "badges", "08/06/2023"],
    ["Début de la formation", "badges", "08/06/2023"],
    ["Formation React", "formation", "08/06/2023"],
    ["Mission CarbonIT", "mission", "08/06/2023"],
  ];

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
                {data.firstname} {data.name}
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
        <div className="flex justify-around items-start mt-8 mb-5">
          <TableHistorique data={data2} />
        </div>
      </div>
    </React.Fragment>
  );
}

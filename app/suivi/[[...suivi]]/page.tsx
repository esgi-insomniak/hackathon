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
import Avis from "@/components/FollowUp/Avis";
import { useParams, useRouter } from "next/navigation";
import PocketbaseHelper from "@/helpers/pocketbase/pocketbase";
import Link from "next/link";
import { useAuth } from "@/providers/auth";
import { MdWebAsset } from "react-icons/md";

export default function Page() {
  const id = useParams().suivi;
  const router = useRouter();
  const { record } = useAuth();
  const userRole = record?.roles;

  if (userRole !== "consultant" || record?.id !== id) {
    router.push("/");
  }

  const [data, setData] = React.useState<Array<any>>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [skills, setSkills] = React.useState<Array<any>>([]);
  const [userSkills, setUserSkills] = React.useState<Array<any>>([]);
  const [missions, setMissions] = React.useState<Array<any>>([]);
  const [userMissions, setUserMissions] = React.useState<Array<any>>([]);
  const pb = PocketbaseHelper.pocketbase;

  React.useEffect(() => {
    const fetchUsers = async () => {
      const fetchedData = await pb.collection("users").getOne(id, {
        $autoCancel: false,
      });
      setData(fetchedData);
    };
    const fetchSkills = async () => {
      const fetchedSkills = await pb.collection("skills").getFullList({
        $autoCancel: false,
      });

      setSkills(fetchedSkills);
    };
    const fetchMissions = async () => {
      const fetchedMissions = await pb.collection("missions").getFullList({
        $autoCancel: false,
      });

      setMissions(fetchedMissions);
    };

    setLoading(false);
    fetchUsers();
    fetchSkills();
    fetchMissions();
  }, []);

  if (!data) {
    // Add loading state or return null while data is being fetched
    return null;
  }

  skills.map((skill: any) => {
    if (
      record?.defaultSkills.includes(skill.id) &&
      !userSkills.includes(skill.id)
    ) {
      setUserSkills((userSkills: any) => [...userSkills, skill.id]);
    }
  });

  missions.map((mission: any) => {
    if (
      record?.missions.includes(mission.id) &&
      !userMissions.includes(mission.id)
    ) {
      setUserMissions((userMissions: any) => [...userMissions, mission.id]);
    }
  });

  const data2 = [
    ["Soirée Pizza", "08/06/2023", "afterwork"],
    ["Bienvenue chez CarbonIT", "08/06/2023", "badges"],
    ["Formation React", "08/06/2023", "formation"],
    ["Mission CarbonIT", "08/06/2023", "mission"],
  ];

  return (
    <React.Fragment>
      {!loading ? (
        <div className="">
          <div className="flex justify-around items-center my-5">
            <div className="flex items-center my-5">
              <div>
                {data.avatar != "" ? (
                  <img
                    className="w-32 h-32 rounded-full mx-5"
                    src={`http://localhost:8090/api/files/users/${data.id}/${data.avatar}?thumb=50x50`}
                    alt="nature image"
                  />
                ) : (
                  <img
                    className="w-32 h-32 rounded-full mx-5"
                    src={`https://www.w3schools.com/w3images/avatar2.png`}
                    alt="nature image"
                  />
                )}
              </div>
              <div>
                <h1 className="block font-sans text-3xl font-semibold leading-tight tracking-normal text-inherit antialiased mx-auto">
                  {data.name}
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
                      <MdWebAsset />
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
                {userSkills.map((skill, index) => (
                  <BadgesSkills props={skill} key={index} />
                ))}
              </div>
              {userRole == "consultant" && (
                <Button className="flex items-center mx-auto my-5">
                  <Link href="/quizz">Se former sur une formation</Link>
                </Button>
              )}
            </div>
            <div className="w-1/3">
              <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
                Dernières missions
              </h2>
              <div className="mx-auto w-full flex justify-around flex-wrap mt-5">
                <MissionAccordeons data={userMissions} />
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
                Historique
              </h2>
              <div>
                <ListComponent data={data2} fullname={id} />
              </div>
            </div>
          </div>
          {userRole == "rh" ||
            (userRole == "admin" && (
              <div className="mb-5 mx-auto mt-5">
                <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-inherit antialiased text-center">
                  Avis client
                </h2>
                <Avis />
              </div>
            ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}
    </React.Fragment>
  );
}

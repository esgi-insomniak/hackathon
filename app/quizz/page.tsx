"use client";

import { SlMagnifier } from "react-icons/sl";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  Select,
  Option,
} from "@material-tailwind/react";
import { BiPlus } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { FaRocket } from "react-icons/fa";
import PocketbaseHelper from "@/helpers/pocketbase/pocketbase";
import { useEffect, useState } from "react";
import BadgesSkills from "@/components/FollowUp/BadgesSkills";
import { useAuth } from "@/providers/auth";

const TABS = [
  { label: "Tous", value: "all" },
  { label: "Formations", value: "formations" },
  { label: "Quizz", value: "quizz" },
  { label: "Parcours", value: "parcours" },
];

const LANGUAGES = [
  { label: "JAVA", value: "java" },
  { label: ".NET", value: "dotnet" },
  { label: "C#", value: "csharp" },
  { label: "ANGULAR", value: "angular" },
  { label: "REACT", value: "react" },
  { label: "VUE", value: "vue" },
];

const NIVEAUX = [
  { label: "Bois", value: "wood" },
  { label: "Pierre", value: "stone" },
  { label: "Argent", value: "irone" },
  { label: "Or", value: "gold" },
  { label: "Diamant", value: "diamond" },
];

export default function Page() {
  const pb = PocketbaseHelper.pocketbase;
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);
  const [formations, setFormations] = useState([]);
  const [parcours, setParcours] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const { record } = useAuth();
  const userRole = record?.roles;

  useEffect(() => {
    pb.collection("skills")
      .getFullList({ $autoCancel: false })
      .then((data) => {
        const skillsFormatted = data.map((skill) => {
          return {
            id: skill.id,
            name: skill.name,
          };
        });
        //array unique by name
        let skillsGroupedByName = [];
        skillsFormatted.forEach((skill) => {
          if (!skillsGroupedByName[skill.name]) {
            skillsGroupedByName[skill.name] = skill;
          }
        });
        setSkills(Object.values(skillsGroupedByName));
      });
    pb.collection("quizz")
      .getFullList({
        sort: "-created",
        expand: "skill,skill.skill_level",
        $autoCancel: false,
      })
      .then((data) => {
        setQuizzes(data);
      });
    pb.collection("formations")
      .getFullList({
        sort: "-created",
        $autoCancel: false,
      })
      .then((data) => {
        setFormations(data);
      });
    pb.collection("roadmaps").getFullList({
        sort: "-created",
        $autoCancel: false,
        expand: "formations, quizz"
    }).then((data) => {
      console.log(data);
        setParcours(data);
    });
  }, []);

  return (
    <div className="w-full max-h-screen">
      <Card className="flex flex-col justify-center items-center p-5">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none w-full"
        >
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Liste des formations
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Retrouvez ici la liste des quizz / formations
              </Typography>
            </div>
            {userRole == "admin" ||
              (userRole == "rh" && (
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button
                    className="flex items-center gap-3"
                    color="blue"
                    size="sm"
                    onClick={() => router.push("/quizz/add")}
                  >
                    <BiPlus strokeWidth={2} className="h-4 w-4" /> Creer un quiz
                  </Button>
                  <Button
                    className="flex items-center gap-3"
                    color="blue"
                    size="sm"
                    onClick={() => router.push("/formation/add")}
                  >
                    <BiPlus strokeWidth={2} className="h-4 w-4" /> Creer une
                    formation
                  </Button>
                </div>
              ))}
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" id="tabs" className="w-full">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value} onClick={() => setSelectedTab(value)}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>

            <Select size="md" label="Sélectionner une compétence">
              {skills.map((skill: any) => (
                <Option key={skill.id} value={skill.id}>
                  {skill.name}
                </Option>
              ))}
            </Select>

            <Select size="md" label="Sélectionner un niveau">
              {NIVEAUX.map(({ label, value }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>

            <Input
              label="Rechercher"
              icon={<SlMagnifier className="h-5 w-5" />}
            />
          </div>
        </CardHeader>

        <hr className="w-full m-5" />

        <CardBody className="px-0 w-full flex-grow overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
            { (selectedTab === "all" || selectedTab === "quizz") && quizzes.map((quizz) => (
              <Card key={quizz.id} className="flex-row w-full max-w-[48rem]">
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="w-2/5 shrink-0 m-0 rounded-r-none"
                >
                  <img
                    src="https://www.decheterie-pro-grenoble.veolia.fr/sites/g/files/dvc3066/files/styles/crop_freeform/public/image/2017/08/pictogramme_quizz_0.jpg?h=205d396d&itok=bCjn9mUf"
                    alt="image"
                    className="w-full h-full object-cover"
                  />
                </CardHeader>
                <CardBody className="w-full">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Typography variant="h6" color="blue" className="uppercase">
                      QUIZZ
                    </Typography>
                    {quizz.expand.skill &&
                      quizz.expand.skill.expand.skill_level && (
                        <BadgesSkills
                          props={{
                            color: quizz.expand.skill.expand.skill_level.color,
                            logo: pb.files.getUrl(
                              quizz.expand.skill.expand.skill_level,
                              quizz.expand.skill.expand.skill_level.icon,
                              { thumb: "20x20" }
                            ),
                            stack: quizz.expand.skill.name,
                            level: quizz.expand.skill.expand.skill_level.name,
                            width: 20,
                            height: 20,
                          }}
                        />
                      )}
                  </div>
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                    {quizz.name}
                  </Typography>
                  <Typography color="gray" className="font-normal mb-8">
                    {quizz.description}
                  </Typography>
                  <Button
                    onClick={() => router.push(`/quizz/view/${quizz.id}`)}
                    variant="filled"
                    className="inline-block float-right flex items-center gap-2"
                  >
                    GO !
                    <FaRocket strokeWidth={2} className="h-4 w-4" />
                  </Button>
                </CardBody>
              </Card>
            ))}

            { (selectedTab === "all" || selectedTab === "formations") &&
              formations.map((formation) => (
              <Card
                key={formation.id}
                className="flex-row w-full max-w-[48rem]"
              >
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="w-2/5 shrink-0 m-0 rounded-r-none"
                >
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                    alt="image"
                    className="w-full h-full object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h6"
                    color="blue"
                    className="uppercase mb-4"
                  >
                    FORMATION
                  </Typography>
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                    {formation.name}
                  </Typography>
                  <Typography color="gray" className="font-normal mb-8">
                    {formation.description}
                  </Typography>
                  <Button
                    variant="filled"
                    className="inline-block float-right flex items-center gap-2"
                  >
                    GO !
                    <FaRocket strokeWidth={2} className="h-4 w-4" />
                  </Button>
                </CardBody>
              </Card>
            ))}

            { (selectedTab === "all" || selectedTab === "parcours") &&
                parcours.map((parcour) => (
                <Card
                  key={parcour.id}
                  className="flex-row w-full max-w-[48rem]"
                >
                    <CardHeader
                        shadow={false}
                        floated={false}
                        className="w-2/5 shrink-0 m-0 rounded-r-none"
                    >
                        <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                        alt="image"
                        className="w-full h-full object-cover"
                        />
                    </CardHeader>
                    <CardBody>
                        <Typography
                        variant="h6"
                        color="blue"
                        className="uppercase mb-4"
                        >
                        PARCOURS
                        </Typography>
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                        {parcour.name}
                        </Typography>
                        <Typography color="gray" className="font-normal mb-8">
                        {parcour.description}
                        </Typography>
                        <Button
                        variant="filled"
                        className="inline-block float-right flex items-center gap-2"
                        >
                        GO !
                        <FaRocket strokeWidth={2} className="h-4 w-4" />
                        </Button>
                    </CardBody>
                </Card>
                ))}

          </div>
        </CardBody>
      </Card>
    </div>
  );
}

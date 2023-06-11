"use client";
import React from "react";
import BadgesSkills from "@/components/FollowUp/BadgesSkills";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@material-tailwind/react";
import { BsBuilding, BsPencil } from "react-icons/bs";
import { useAuth } from "@/providers/auth";
import PocketbaseHelper from "@/helpers/pocketbase/pocketbase";

export default function Page() {
  const { record: user } = useAuth();
  const [userName, setUserName] = React.useState<string>("");
  const [userPoste, setUserPoste] = React.useState<string>("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setUserName(user?.name);
      setUserPoste(user?.poste);
    }
  }, []);

  const pb = PocketbaseHelper.pocketbase;
  const data = {
    profilePicture: "https://www.w3schools.com/w3images/avatar2.png",
  };
  const [skillsData, setSkillsData] = React.useState([]);
  const [isAboutEditing, setIsAboutEditing] = React.useState(false);
  const [isSkillsEditing, setIsSkillsEditing] = React.useState(false);
  const [aboutContent, setAboutContent] = React.useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ullamcorper cursus risus in gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis vitae sapien sit amet risus malesuada auctor."
  );
  const [modifiedSkillNames, setModifiedSkillNames] = React.useState<string[]>(
    []
  );

  React.useEffect(() => {
    const fetchSkills = async () => {
      const fetchedData = await pb.collection("skills").getFullList({
        $autoCancel: false,
      });
      setSkillsData(fetchedData);
    };

    fetchSkills();
  }, []);

  const [experiences, setExperiences] = React.useState([
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
  ]);

  const handleAboutEdit = () => {
    setIsAboutEditing(!isAboutEditing);
  };

  const handleAboutSave = () => {
    setIsAboutEditing(false);
  };

  const handleSkillsEdit = () => {
    setIsSkillsEditing(!isSkillsEditing);
  };

  const handleSkillsSave = () => {
    skillsData.forEach(async (skill, index) => {
      const modifiedSkillName = modifiedSkillNames[index];
      await pb
        .collection("skills")
        .update(skill.id, { name: modifiedSkillName });
    });

    setIsSkillsEditing(false);
  };

  const handleExperienceEdit = (index: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index].isEditing = true;
    setExperiences(updatedExperiences);
  };

  const handleExperienceSave = (index: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index].isEditing = false;
    setExperiences(updatedExperiences);
  };

  return (
    <div className="flex justify-start items-start h-screen flex-col mx-8 p-8 overflow-scroll">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center space-x-4">
          <img
            src={data.profilePicture}
            alt="Profile Image"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold" suppressHydrationWarning>
              {userName}
            </h2>
            <p className="text-gray-500" suppressHydrationWarning>
              {userPoste}
            </p>
            <p className="text-gray-500">Paris, France</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">À propos</h3>
          {isAboutEditing ? (
            <textarea
              className="w-full h-32 border rounded-md p-2"
              value={aboutContent}
              onChange={(e) => setAboutContent(e.target.value)}
            ></textarea>
          ) : (
            <p className="text-gray-600">{aboutContent}</p>
          )}
          <div className="mt-4">
            {isAboutEditing ? (
              <button
                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-24"
                onClick={handleAboutSave}
              >
                Enregistrer
              </button>
            ) : (
              <button
                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-24"
                onClick={handleAboutEdit}
              >
                <BsPencil className="mr-2" />
                Éditer
              </button>
            )}
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Compétences</h3>
          {isSkillsEditing ? (
            <div className="grid grid-cols-5 gap-4">
              {user?.defaultSkills.map((skill: any, index: number) => {
                // Find the corresponding skill object in skillsData
                const skillObj = skillsData.find(
                  (obj: any) => obj.id === skill
                );

                const skillName = skillObj ? skillObj.name : "";

                return (
                  <div key={index}>
                    <input
                      className="w-full border rounded-md p-2"
                      value={skillName}
                      onChange={(e) => {
                        const modifiedSkillName = e.target.value;

                        setSkillsData((prevSkillsData) => {
                          const updatedSkillsData = prevSkillsData.map(
                            (skill, i) => {
                              if (i === index) {
                                return { ...skill, name: modifiedSkillName };
                              }
                              return skill;
                            }
                          );
                          return updatedSkillsData;
                        });
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-4">
              {/* Afficher les badges de compétences */}
              {user?.defaultSkills.map((skill, index) => (
                <BadgesSkills key={index} props={skill} />
              ))}
            </div>
          )}
          <div className="mt-4">
            {isSkillsEditing ? (
              <button
                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-24"
                onClick={handleSkillsSave}
              >
                Enregistrer
              </button>
            ) : (
              <button
                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-24"
                onClick={handleSkillsEdit}
              >
                <BsPencil className="mr-2" />
                Éditer
              </button>
            )}
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">
            Expérience professionnelle
          </h3>
          <div className="w-[35rem]">
            <Timeline>
              {experiences.map((experience, index) => (
                <TimelineItem key={experience.id} className="mb-4">
                  {index !== 0 && <TimelineConnector className="!w-[78px]" />}
                  <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                    <TimelineIcon className="p-3" variant="ghost">
                      <BsBuilding className="h-5 w-5" />
                    </TimelineIcon>
                    <div className="flex flex-col gap-1 w-full">
                      {experience.isEditing ? (
                        <>
                          <input
                            className="w-full mb-2 border rounded-md p-2"
                            value={experience.title}
                            onChange={(e) => {
                              const updatedExperiences = [...experiences];
                              updatedExperiences[index].title = e.target.value;
                              setExperiences(updatedExperiences);
                            }}
                          />
                          <input
                            className="w-full mb-2 border rounded-md p-2"
                            value={experience.company}
                            onChange={(e) => {
                              const updatedExperiences = [...experiences];
                              updatedExperiences[index].company =
                                e.target.value;
                              setExperiences(updatedExperiences);
                            }}
                          />
                          <input
                            className="w-full mb-2 border rounded-md p-2"
                            value={experience.duration}
                            onChange={(e) => {
                              const updatedExperiences = [...experiences];
                              updatedExperiences[index].duration =
                                e.target.value;
                              setExperiences(updatedExperiences);
                            }}
                          />
                          <textarea
                            className="w-full mb-2 border rounded-md p-2"
                            value={experience.description}
                            onChange={(e) => {
                              const updatedExperiences = [...experiences];
                              updatedExperiences[index].description =
                                e.target.value;
                              setExperiences(updatedExperiences);
                            }}
                          ></textarea>
                          <button
                            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-24"
                            onClick={() => handleExperienceSave(index)}
                          >
                            Enregistrer
                          </button>
                        </>
                      ) : (
                        <>
                          <Typography variant="h6" color="blue-gray">
                            {experience.title}
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                          >
                            {experience.company}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="gray"
                            className="font-normal"
                          >
                            {experience.duration}
                          </Typography>
                          <Typography variant="body2">
                            {experience.description}
                          </Typography>
                          <button
                            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-24"
                            onClick={() => handleExperienceEdit(index)}
                          >
                            <BsPencil className="mr-2" />
                            Éditer
                          </button>
                        </>
                      )}
                    </div>
                  </TimelineHeader>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Input,
} from "@material-tailwind/react";
import BadgesSkills from "../FollowUp/BadgesSkills";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import React from "react";
import PocketbaseHelper from "@/helpers/pocketbase/pocketbase";
import { useAuth } from "@/providers/auth";

const TABLE_HEAD = ["Nom", "Poste", "Compétences principales", ""];

export default function TableSearch({ data }: any) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [skills, setSkills] = React.useState<string[]>([]);
  const pb = PocketbaseHelper.pocketbase;
  const { record } = useAuth();
  const userRole = record?.roles;
  const userId = record?.id;

  React.useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await pb
          .collection("skills")
          .getFullList({ $autoCancel: false });
        const skillIds = response.map((skill: any) => skill);
        setSkills(skillIds);
      } catch (error) {}
    };
    fetchSkills();
  }, []);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getSkillByNames = (searchTerm: string) => {
    const skillObj: any = {};
    skills.forEach((skill: any) => {
      skillObj[skill.id] = skill;
    });

    const matchingSkills = Object.values(skillObj).filter((skill: any) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchingSkills;
  };

  const filteredData = data.filter((item: any) => {
    const fullName = `${item.firstname} ${item.name}`.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    const matchingSkills = getSkillByNames(searchTermLower);
    const matchingSkillIds = matchingSkills.map((skill: any) => skill.id);

    return (
      fullName.includes(searchTermLower) ||
      item.defaultSkills.some((skillId: string) =>
        matchingSkillIds.includes(skillId)
      )
    );
  });

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recherche de collaborateurs
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Trouvez les meilleurs profils pour votre projet
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Recherche"
                icon={<BsSearch className="h-5 w-5" />}
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, columnIndex) => (
                <th
                  key={columnIndex}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length != 0 ? (
              filteredData.map((data: any, index: number) => {
                const isLast = index === filteredData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {data.avatar != "" ? (
                          <Avatar
                            src={`http://localhost:8090/api/files/users/${data.id}/${data.avatar}?thumb=24x24`}
                            alt={data.name}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                        ) : (
                          <Avatar
                            src={`https://www.w3schools.com/w3images/avatar2.png`}
                            alt={data.name}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                        )}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {data.name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data.poste}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex justify-around items-center">
                        {data.defaultSkills.map((skill: any, index: number) => (
                          <BadgesSkills key={index} props={skill} />
                        ))}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        {userId == data.id || userRole != "consultant" ? (
                          <Button>
                            <Link href={`/suivi/${data.id}`}>
                              {/* <AiOutlinePlusCircle size={25} /> */}
                              Voir le profil
                            </Link>
                          </Button>
                        ) : (
                          <Button>Vous n'avez pas accès à ce profil</Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="p-4 text-center" colSpan={4}>
                  <Typography variant="small" color="blue-gray">
                    Aucun résultat
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" color="blue-gray" size="sm">
            1
          </IconButton>
        </div>
      </CardFooter>
    </Card>
  );
}

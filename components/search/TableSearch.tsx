import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import BadgesSkills from "../FollowUp/BadgesSkills";
import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import React from "react";

const TABLE_HEAD = ["Nom", "Poste", "Compétences principales", ""];

const TABLE_ROWS = [
  {
    img: "/img/logos/logo-spotify.svg",
    name: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-amazon.svg",
    name: "Amazon",
    amount: "$5,000",
    date: "Wed 1:00pm",
    status: "paid",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-pinterest.svg",
    name: "Pinterest",
    amount: "$3,400",
    date: "Mon 7:40pm",
    status: "pending",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-google.svg",
    name: "Google",
    amount: "$1,000",
    date: "Wed 5:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
];

type TableSearchType = {
  data: {
    name: string;
    firstname: string;
    profilePicture: string;
    poste: string;
    skills: {
      color: string;
      logo: string;
      stack: string;
      level: string;
    }[];
  }[];
};

export default function TableSearch({ data }: any) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item: any) => {
    const fullName = `${item.firstname} ${item.name}`.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    // const matchingSkills = item.kills
    //   .map((skill: any) => skill.stack.toLowerCase())
    //   .filter((skill: any) => skill.includes(searchTermLower));

    return fullName.includes(searchTermLower);
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
                label="Search"
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
                const isLast = index === TABLE_ROWS.length - 1;
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
                        <p>{data.poste}</p>
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
                        <Button>
                          <Link href={`/suivi/${data.id}`}>
                            {/* <AiOutlinePlusCircle size={25} /> */}
                            Voir le profil
                          </Link>
                        </Button>
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

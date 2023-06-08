import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import Link from "next/link";
import BadgesSkills from "../FollowUp/BadgesSkills";

type CardSearchProps = {
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
  };
};

export default function CardSearch({ data }: CardSearchProps) {
  const fullName = `${data.firstname}-${data.name}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return (
    <Card className="my-6 w-96 mx-3">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={data.profilePicture}
          alt="img-blur-shadow"
          className="h-52 w-52 rounded-full mx-auto my-auto"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {data.firstname} {data.name}
        </Typography>
        <Typography>{data.poste}</Typography>
        <br />
        <div className="flex justify-between items-center my-5 flex-wrap">
          {data.skills.map((item, index) => {
            return <BadgesSkills key={index} props={item} />;
          })}
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>
          <Link href={`/suivi/${fullName}`}>Voir plus d'informations</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

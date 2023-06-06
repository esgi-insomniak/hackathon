import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

type CardMissionType = {
    props: {
        missionName: string;
        missionDescription: string;
        missionDate: string;
    }
}

export default function CardMission({props}: CardMissionType) {
  return (
    <Card className="my-6 w-96 mx-auto">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
            {props.missionName}
        </Typography>
        <Typography>
            {props.missionDescription}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button className="flex items-center mx-auto">{props.missionDate}</Button>
      </CardFooter>
    </Card>
  );
}

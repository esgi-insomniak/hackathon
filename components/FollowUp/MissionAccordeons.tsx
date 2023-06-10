import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import React from "react";
import PocketbaseHelper from "@/helpers/pocketbase/pocketbase";

function Icon({ id, open }: { id: number; open: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function MissionAccordeons({ data }: any) {
  const [open, setOpen] = useState(4);
  const [mission, setMission] = useState<Array<any>>([]);
  const [userMissions, setUserMissions] = useState<Array<any>>([]);
  const pb = PocketbaseHelper.pocketbase;

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  React.useEffect(() => {
    const fetchMission = async () => {
      const fetchedData = await pb.collection("missions").getFullList({
        sort: "-created",
        $autoCancel: false,
      });
      setMission(fetchedData);
    };

    fetchMission();
  }, []);

  mission.map((missions: any) => {
    if (data.includes(missions.id) && !userMissions.includes(missions)) {
      setUserMissions((userMissions: any) => [...userMissions, missions]);
    }
  });
  return (
    <Fragment>
      {userMissions.slice(0,3).map((mission: any, index) => (
        <Accordion
          open={open === index}
          icon={<Icon id={index} open={open} />}
          key={index}
          className="border border-blue-gray-100 px-4 rounded-lg mb-2"
        >
          <AccordionHeader
            onClick={() => handleOpen(index)}
            className={`border-b-0 transition-colors`}
          >
            {mission.name} -{" "}
            {new Date(mission.start_date).toLocaleDateString("en-GB")} au{" "}
            {new Date(mission.end_date).toLocaleDateString("en-GB")}
          </AccordionHeader>
          <AccordionBody className="text-base font-normal pt-0">
            {mission.description}
          </AccordionBody>
        </Accordion>
      ))}
    </Fragment>
  );
}

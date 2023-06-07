import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

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

type MissionAccordeonsType = {
  data: {
    missionName: string;
    missionDate: string;
    missionDescription: string;
  }[];
};

export default function MissionAccordeons({ data }: MissionAccordeonsType) {
  console.log(data);
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Fragment>
      {data.map((mission, index) => (
        <Accordion
          open={open === index}
          icon={<Icon id={index} open={open} />}
          className="border border-blue-gray-100 px-4 rounded-lg mb-2"
        >
          <AccordionHeader
            onClick={() => handleOpen(index)}
            className={`border-b-0 transition-colors`}
          >
            {mission.missionName} - {mission.missionDate}
          </AccordionHeader>
          <AccordionBody className="text-base font-normal pt-0">
            {mission.missionDescription}
          </AccordionBody>
        </Accordion>
      ))}
    </Fragment>
  );
}

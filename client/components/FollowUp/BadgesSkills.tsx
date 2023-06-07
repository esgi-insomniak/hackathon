import { Button, Tooltip } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";
import Image from "next/image";

type BadgesType = {
  props: {
    color: string;
    logo: string;
    stack: string;
    level: string;
  };
};

export default function BadgesSkills({ props }: BadgesType) {
  const color = props.color as colors;
  return (
    <Tooltip content={props.level}>
      <Button
        color={color}
        className="flex justify-between items-center gap-3 my-2"
      >
        {props.stack}
        <Image
          src={props.logo}
          alt={props.stack}
          width={25}
          height={25}
          className="flex-shrink-0"
        />
      </Button>
    </Tooltip>
  );
}

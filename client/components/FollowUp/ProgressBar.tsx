import { Progress } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";

type ProgressBarProps = {
  props: {
    value: number;
    label: string;
    color: colors;
  };
};

export default function ProgressBar({ props }: ProgressBarProps) {
  return (
    <Progress
      value={props.value}
      label={props.label}
      size="lg"
      color={props.color}
      className=""
    />
  );
}

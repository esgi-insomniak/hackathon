import PocketbaseHelper from "@/helpers/pocketbase/pocketbase";
import { Button, Tooltip } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";
import Image from "next/image";
import React from "react";

export default function BadgesSkills({ props }: any) {
  const [data, setData] = React.useState([]);
  const [typeBadges, setTypeBadges] = React.useState([]);
  const pb = PocketbaseHelper.pocketbase;

  React.useEffect(() => {
    const fetchSkills = async () => {
      const fetchedData = await pb.collection("skills").getOne(props, {
        $autoCancel: false,
      });
      setData(fetchedData);

      const fetchedTypeBadge = await pb
        .collection("skill_levels")
        .getOne(fetchedData.skill_level, {
          $autoCancel: false,
        });
      setTypeBadges(fetchedTypeBadge);
    };

    fetchSkills();
  }, [props]);

  if (!data || !typeBadges) {
    // Add loading state or return null while data is being fetched
    return null;
  }

  const color = typeBadges.color as colors;
  return (
    <Tooltip content={`Niveau ${typeBadges.name}`}>
      <Button
        color={color}
        className="flex justify-around items-center gap-3 my-2"
      >
        <p>{data.name}</p>
        <Image  
          src={`/badgesImages/${typeBadges.icon}`}
          alt={data.name}
          width={25}
          height={25}
          className="flex-shrink-0"
        />
      </Button>
    </Tooltip>
  );
}

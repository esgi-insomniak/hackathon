import {
  List,
  ListItem,
  ListItemSuffix,
  Chip,
  Card,
  Button,
} from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";
import Link from "next/link";

type ListComponentProps = {
  data: string[][],
};

export default function ListComponent({ data }: ListComponentProps) {
  console.log(data);
  return (
    <Card className="w-full mx-auto">
      <List>
        {data.slice(0, 5).map((item, index) => {
          const value = item[2];

          let color: colors;

          if (value === "afterwork") {
            color = "green";
          } else if (value === "formation") {
            color = "blue";
          } else if (value === "mission") {
            color = "red";
          } else if (value === "badges") {
            color = "yellow";
          } else {
            color = "gray";
          }

          return (
            <ListItem key={index}>
              <div className="flex justify-between items-center w-full mr-3">
                <div className="w-1/2">{item[0]}</div>
                <div className="w-1/3">
                  <Chip
                    value={item[2]}
                    size="sm"
                    color={color}
                    className="rounded-full text-center"
                  />
                </div>
              </div>
              <ListItemSuffix>
                <Chip
                  value={item[1]}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
          );
        })}
        <ListItem>
          <div className="flex justify-between items-center w-full mr-3">
            {/* <Button className="mx-auto">
              <Link href={`/historique/${fullname}`}>Voir l'historique complets</Link>
            </Button> */}
          </div>
        </ListItem>
      </List>
    </Card>
  );
}

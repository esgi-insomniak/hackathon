import {
  List,
  ListItem,
  ListItemSuffix,
  Chip,
  Card,
} from "@material-tailwind/react";

type ListComponentProps = {
    data: string[][];
}

export default function ListComponent({data}: ListComponentProps) {
  return (
    <Card className="w-96 mx-auto">
      <List>
        {data.map((item, index) => {
          return (
            <ListItem key={index}>
              {item[0]}
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
      </List>
    </Card>
  );
}

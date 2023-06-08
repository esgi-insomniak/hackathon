import { Card, Chip, Typography } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";
import { useState } from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

const TABLE_HEAD = [
  "Nom de l'évènement",
  "Type de l'évènement",
  "Date de l'évènement",
];

type TableHistoriqueType = {
  data: string[][];
};

export default function TableHistorique({ data }: TableHistoriqueType) {
  const [sortByColumn, setSortByColumn] = useState(0); // Column index to sort by
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order: "asc" or "desc"

  const compareValues = (a: any, b: any) => {
    const valueA = a[sortByColumn];
    const valueB = b[sortByColumn];

    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    } else if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  };

  return (
    <Card className="overflow-scroll h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, columnIndex) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer"
                onClick={() => {
                  setSortByColumn(columnIndex);
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
              >
                <div className="flex items-center">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                  {sortByColumn === columnIndex && (
                    <div className="ml-2">
                      {sortOrder === "asc" ? (
                        <FiArrowUp size={14} />
                      ) : (
                        <FiArrowDown size={14} />
                      )}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.sort(compareValues).map((allData, index) => {
            const isLast = index === data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            const value = allData[1];

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
              <tr key={index} className="px-20">
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {allData[0]}
                  </Typography>
                </td>
                <td className={`${classes}`}>
                  <Chip
                    value={value}
                    size="sm"
                    color={color}
                    className="rounded-full text-center w-1/3"
                  />
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {allData[2]}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

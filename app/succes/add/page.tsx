"use client";

import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import React, { FormEvent } from "react";

export default function Page() {
  const [successData, setSuccessData] = React.useState([]);

  const handleSubmit = (event: any) => {
    console.log(event);
    event.preventDefault();

    const id = event.target[0].value
      .toLowerCase()
      .replace(/\s+/g, "-");
    const name = event.target[1].value;
    const description = event.target[2].value;
    const imageUrl = event.target[3].value;

    const data = [id, name, description, imageUrl];
    console.log("Success Data:", data);

    setSuccessData(data);

    window.location.href = "/succes";
  };

  return (
    <Card className="mx-auto my-10 w-1/3" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Ajouter un succès
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Entrer ci-dessous, le succès que vous souhaiter ajouter
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Id du succès" />
          <Input size="lg" label="Nom du succès" />
          <Textarea size="lg" label="Description du succès" />
          <Input size="lg" label="Lien de l'image du succès" />
        </div>

        <Button className="mt-6 bg-carbon-blue" fullWidth type="submit">
          Enregistrer le succès
        </Button>
      </form>
    </Card>
  );
}

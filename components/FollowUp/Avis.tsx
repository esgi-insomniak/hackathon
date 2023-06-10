import { Rating, Textarea } from "@material-tailwind/react";
import React from "react";

export default function Avis() {
  return (
    <React.Fragment>
      <div className="w-4/5 mx-auto">
        <Rating />
        <Textarea size="lg" label="Laisser un avis sur le collaborateur" />
      </div>
    </React.Fragment>
  );
}

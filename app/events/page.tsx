"use client";

import { EventItemUI, EventUIProps } from "@/components/event";
import LinkChecker from "@/components/linkChecker";
import { Button, Input, Switch } from "@material-tailwind/react";
import React from "react";
import moment from "moment";
import { BsChevronBarLeft, BsChevronBarRight } from "react-icons/bs";
import { dataEvent } from "./data";

export default function Page() {
  const [searchValue, setSearchValue] = React.useState("");
  const searchRegex = new RegExp(searchValue, "i");
  const [currentMonth, setCurrentMonth] = React.useState(
    moment().locale("fr").format("MMMM YYYY")
  );

  const [type, setType] = React.useState<"off-work" | "work">("off-work");
  const [form, setForm] = React.useState<EventUIProps>({
    title: "",
    description: "",
    location: "",
    type: "off-work",
    date: "",
  });
  const [fakeEvent, setFakeEvent] = React.useState<EventUIProps[]>(dataEvent);

  const handleCreateEvent = (title: string, description: string, location: string, type: 'off-work' | 'work') => {
    const id = crypto.randomUUID();
    const newEvent: EventUIProps = {
      id,
      title,
      description,
      location,
      date: moment().format("DD/MM/YYYY"),
      type,
    };
    setFakeEvent([...fakeEvent, newEvent]);
  };

  return (
    <section className="px-8 py-10 grid grid-cols-6 gap-5 grid-rows-1 h-full">
      <div className="col-span-4 space-y-4 overflow-scroll">
        <div className="flex items-center">
          <Button
            variant="outlined"
            className="flex items-center"
            onClick={() =>
              setCurrentMonth(
                moment().locale("fr").subtract(1, "month").format("MMMM YYYY")
              )
            }
          >
            <BsChevronBarLeft />
            {moment(currentMonth)
              .locale("fr")
              .subtract(1, "month")
              .format("MMMM YYYY")}
          </Button>
          <h2 className="flex justify-center w-full text-2xl font-bold text-carbon-black/70">
            {currentMonth}
          </h2>
          <Button
            variant="outlined"
            className="flex items-center"
            onClick={() =>
              setCurrentMonth(
                moment().locale("fr").add(1, "month").format("MMMM YYYY")
              )
            }
          >
            {moment(currentMonth)
              .locale("fr")
              .add(1, "month")
              .format("MMMM YYYY")}
            <BsChevronBarRight className="w-5 h-5" />
          </Button>
        </div>
        <div>
          <Input
            type="text"
            label="Rechercher (id de l'évenement)"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        {fakeEvent
          .filter((e) => e.id && searchRegex.test(e.id))
          .map((event) => (
            <EventItemUI {...event} key={event.id} />
          ))}
      </div>

      <div className="col-span-2">
        <div className="flex flex-col bg-carbon-white rounded-md drop-shadow-xl">
          <div
            className={`h-14 rounded-t-md ${type === "off-work" ? "bg-green-500" : "bg-purple-500"
              } w-full flex justify-center items-center text-carbon-white`}
          >
            Creation d'un evenement
          </div>
          <div className="p-3 w-full space-y-3 flex flex-col">
            <Input type="text" label="Titre" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
            <Input type="text" label="Description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
            <Input type="date" label="Date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
            {type === "work" && <LinkChecker />}
            {type === "off-work" && <Input type="text" label="Adresse du RDV" />}
            <Switch
              color={type === "off-work" ? "green" : "purple"}
              checked={type === "off-work"}
              onChange={() => {
                setType(type === "off-work" ? "work" : "off-work");
                setForm({ ...form, type: type === "off-work" ? "work" : "off-work" });
              }}
              label={`${type === "off-work" ? "🍻" : "💻"}`}
              value={form.type}
            />
            <Button
              color={type === "off-work" ? "green" : "purple"}
              className="w-full"
              onClick={() => handleCreateEvent(form.title, form.description, form.location, type)}
            >
              Créer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

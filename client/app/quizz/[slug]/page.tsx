'use client'

import {
    List,
    ListItem,
    ListItemSuffix,
    Card,
    IconButton,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import {Button} from "@material-tailwind/react/components/Button";
import {BiListPlus, BiPlus} from "react-icons/bi";


const QUESTIONS = [
    "Quelle est la capitale de la France ?",
    "Quelle est la capitale de l'Espagne ?",
    "Quelle est la capitale de l'Italie ?",
    "Quelle est la capitale de l'Allemagne ?",
    "Quelle est la capitale de la Belgique ?",
    "Quelle est la capitale de la Suisse ?",
    "Quelle est la capitale du Luxembourg ?",
];
export default function Page({ params }) {
    return (
        <div className="h-full flex gap-4 p-4">
            <Card className="w-1/3">
                <List>
                    {QUESTIONS.map((question, index) => (
                        <ListItem ripple={false} className="py-1 pr-1 pl-4" key={index}>
                            {question}
                            <ListItemSuffix>
                                <IconButton variant="text" color="blue-gray">
                                    <TrashIcon className="h-5 w-5" />
                                </IconButton>
                            </ListItemSuffix>
                        </ListItem>
                    ))}
                    <Button className="flex justify-center items-center gap-3" color="blue" ripple="light">
                        <BiPlus strokeWidth={2} className="h-4 w-4" /> Ajouter une question
                    </Button>
                </List>
            </Card>

            <Card className="w-2/3">
                <div className="flex flex-col w-full">
                    pourcentage de réussite
                </div>
            </Card>
        </div>
    );
}
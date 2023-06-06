'use client'

import {
    List,
    ListItem,
    ListItemSuffix,
    Card,
    IconButton,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";


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
        <div className="h-full">
            <Card>
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
                </List>
            </Card>
        </div>
    );
}
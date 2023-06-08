'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip, Select,
} from "@material-tailwind/react";
import {BiPlus} from "react-icons/bi";
import {useRouter} from "next/navigation";

const TABS = [
    { label: "Tous", value: "all" },
    { label: "En cours", value: "active" },
    { label: "Terminé", value: "completed" },
];

const LANGUAGES = [
    { label: "JAVA", value: "java"},
    { label: ".NET", value: "dotnet"},
    { label: "C#", value: "csharp"},
    { label: "ANGULAR", value: "angular"},
    { label: "REACT", value: "react"},
    { label: "VUE", value: "vue"},
];


function RocketLaunchIcon(props: { className: string }) {
    return null;
}

function ArrowLongRightIcon(props: { strokeWidth: number, className: string }) {
    return null;
}

export default function Page() {

    const router = useRouter();

    return (
        <div className="h-full w-full">
            <Card className="flex justify-center items-center p-5">
                <CardHeader floated={false} shadow={false} className="rounded-none w-full">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Liste des quizz
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all members
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button className="flex items-center gap-3" color="blue" size="sm" onClick={() => router.push('/quizz/add')}>
                                <BiPlus strokeWidth={2} className="h-4 w-4" /> Creer un quiz
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value="all" className="w-full md:w-1/2" id="tabs">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab key={value} value={value}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input label="Rechercher" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                        </div>
                    </div>
                </CardHeader>

                <hr className="w-full pt-5" />

                <CardBody className="px-0 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">


                        <Card>
                            <CardBody>
                                <RocketLaunchIcon className="text-blue-500 w-12 h-12 mb-4" />
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    UI/UX Review Check
                                </Typography>
                                <Typography>
                                    Because it's about motivating the doers. Because I'm here to follow my dreams and inspire others.
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <a href="#" className="inline-block">
                                    <Button size="sm" variant="text" className="flex items-center gap-2">
                                        Participer
                                        <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                                    </Button>
                                </a>
                            </CardFooter>
                        </Card>


                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
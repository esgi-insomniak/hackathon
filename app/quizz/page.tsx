'use client'

import { SlMagnifier } from "react-icons/sl";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Tabs,
    TabsHeader,
    Tab, Select, Option
} from "@material-tailwind/react";
import {BiPlus} from "react-icons/bi";
import { useRouter } from "next/navigation";
import {FaRocket} from "react-icons/fa";
import * as SkillLevels from "../../helpers/data/skill_levels.json";

const TABS = [
    { label: "Tous", value: "all" },
    { label: "Formations", value: "formations" },
    { label: "Quizz", value: "quizz" },
    { label: "Parcours", value: "parcours" }
];

const LANGUAGES = [
    { label: "JAVA", value: "java" },
    { label: ".NET", value: "dotnet" },
    { label: "C#", value: "csharp" },
    { label: "ANGULAR", value: "angular" },
    { label: "REACT", value: "react" },
    { label: "VUE", value: "vue" },
];

const NIVEAUX = [
    { label: "Bois", value: "wood" },
    { label: "Pierre", value: "stone" },
    { label: "Argent", value: "irone" },
    { label: "Or", value: "gold" },
    { label: "Diamant", value: "diamond" },
];


export default function Page() {

    const router = useRouter();

    return (
        <div className="w-full max-h-screen">
            <Card className="flex flex-col justify-center items-center p-5">
                <CardHeader floated={false} shadow={false} className="rounded-none w-full">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Liste des formations
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Retrouvez ici la liste des quizz / formations
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button className="flex items-center gap-3" color="blue" size="sm" onClick={() => router.push('/quizz/add')}>
                                <BiPlus strokeWidth={2} className="h-4 w-4" /> Creer un quiz
                            </Button>
                            <Button className="flex items-center gap-3" color="blue" size="sm" onClick={() => router.push('/formation/add')}>
                                <BiPlus strokeWidth={2} className="h-4 w-4" /> Creer une formation
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value="all" id="tabs" className="w-full">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab key={value} value={value}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>

                        <Select size="md" label="Sélectionner une compétence">
                            {LANGUAGES.map(({ label, value }) => (
                                <Option key={value} value={value}>{label}</Option>
                            ))}
                        </Select>

                        <Select size="md" label="Sélectionner un niveau">
                            {NIVEAUX.map(({ label, value }) => (
                                <Option key={value} value={value}>{label}</Option>
                            ))}
                        </Select>

                        <Input label="Rechercher" icon={<SlMagnifier className="h-5 w-5" />} />
                    </div>
                </CardHeader>

                <hr className="w-full m-5" />

                <CardBody className="px-0 w-full flex-grow overflow-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">

                        <Card className="flex-row w-full max-w-[48rem]">
                            <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                    alt="image"
                                    className="w-full h-full object-cover"
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h6" color="blue" className="uppercase mb-4">FORMATION</Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    Dev PHP Junior
                                </Typography>
                                <Typography color="gray" className="font-normal mb-8">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                                </Typography>
                                <Button variant="filled" className="inline-block float-right flex items-center gap-2">
                                    GO !
                                    <FaRocket strokeWidth={2} className="h-4 w-4" />
                                </Button>
                            </CardBody>
                        </Card>

                        <Card className="flex-row w-full max-w-[48rem]">
                            <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
                                <img
                                    src="https://www.decheterie-pro-grenoble.veolia.fr/sites/g/files/dvc3066/files/styles/crop_freeform/public/image/2017/08/pictogramme_quizz_0.jpg?h=205d396d&itok=bCjn9mUf"
                                    alt="image"
                                    className="w-full h-full object-cover"
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h6" color="blue" className="uppercase mb-4">QUIZZ</Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    Dev PHP Junior
                                </Typography>
                                <Typography color="gray" className="font-normal mb-8">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                                </Typography>
                                <Button variant="filled" className="inline-block float-right flex items-center gap-2">
                                    GO !
                                    <FaRocket strokeWidth={2} className="h-4 w-4" />
                                </Button>
                            </CardBody>
                        </Card>

                        <Card className="flex-row w-full max-w-[48rem]">
                            <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                    alt="image"
                                    className="w-full h-full object-cover"
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h6" color="blue" className="uppercase mb-4">FORMATION</Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    Dev PHP Junior
                                </Typography>
                                <Typography color="gray" className="font-normal mb-8">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                                </Typography>
                                <Button variant="filled" className="inline-block float-right flex items-center gap-2">
                                    GO !
                                    <FaRocket strokeWidth={2} className="h-4 w-4" />
                                </Button>
                            </CardBody>
                        </Card>

                        <Card className="flex-row w-full max-w-[48rem]">
                            <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
                                <img
                                    src="https://www.decheterie-pro-grenoble.veolia.fr/sites/g/files/dvc3066/files/styles/crop_freeform/public/image/2017/08/pictogramme_quizz_0.jpg?h=205d396d&itok=bCjn9mUf"
                                    alt="image"
                                    className="w-full h-full object-cover"
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h6" color="blue" className="uppercase mb-4">QUIZZ</Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    Dev PHP Junior
                                </Typography>
                                <Typography color="gray" className="font-normal mb-8">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                                </Typography>
                                <Button variant="filled" className="inline-block float-right flex items-center gap-2">
                                    GO !
                                    <FaRocket strokeWidth={2} className="h-4 w-4" />
                                </Button>
                            </CardBody>
                        </Card>


                        <Card className="flex-row w-full max-w-[48rem]">
                            <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                    alt="image"
                                    className="w-full h-full object-cover"
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h6" color="blue" className="uppercase mb-4">FORMATION</Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    Dev PHP Junior
                                </Typography>
                                <Typography color="gray" className="font-normal mb-8">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                                </Typography>
                                <Button variant="filled" className="inline-block float-right flex items-center gap-2">
                                    GO !
                                    <FaRocket strokeWidth={2} className="h-4 w-4" />
                                </Button>
                            </CardBody>
                        </Card>

                        <Card className="flex-row w-full max-w-[48rem]">
                            <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
                                <img
                                    src="https://www.decheterie-pro-grenoble.veolia.fr/sites/g/files/dvc3066/files/styles/crop_freeform/public/image/2017/08/pictogramme_quizz_0.jpg?h=205d396d&itok=bCjn9mUf"
                                    alt="image"
                                    className="w-full h-full object-cover"
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h6" color="blue" className="uppercase mb-4">QUIZZ</Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    Dev PHP Junior
                                </Typography>
                                <Typography color="gray" className="font-normal mb-8">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                                </Typography>
                                <Button variant="filled" className="inline-block float-right flex items-center gap-2">
                                    GO !
                                    <FaRocket strokeWidth={2} className="h-4 w-4" />
                                </Button>
                            </CardBody>
                        </Card>

                        <Card className="flex-row w-full max-w-[48rem]">
                            <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                    alt="image"
                                    className="w-full h-full object-cover"
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h6" color="blue" className="uppercase mb-4">FORMATION</Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    Dev PHP Junior
                                </Typography>
                                <Typography color="gray" className="font-normal mb-8">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                                </Typography>
                                <Button variant="filled" className="inline-block float-right flex items-center gap-2">
                                    GO !
                                    <FaRocket strokeWidth={2} className="h-4 w-4" />
                                </Button>
                            </CardBody>
                        </Card>

                        <Card className="flex-row w-full max-w-[48rem]">
                            <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
                                <img
                                    src="https://www.decheterie-pro-grenoble.veolia.fr/sites/g/files/dvc3066/files/styles/crop_freeform/public/image/2017/08/pictogramme_quizz_0.jpg?h=205d396d&itok=bCjn9mUf"
                                    alt="image"
                                    className="w-full h-full object-cover"
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h6" color="blue" className="uppercase mb-4">QUIZZ</Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    Dev PHP Junior
                                </Typography>
                                <Typography color="gray" className="font-normal mb-8">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                                </Typography>
                                <Button variant="filled" className="inline-block float-right flex items-center gap-2">
                                    GO !
                                    <FaRocket strokeWidth={2} className="h-4 w-4" />
                                </Button>
                            </CardBody>
                        </Card>

                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
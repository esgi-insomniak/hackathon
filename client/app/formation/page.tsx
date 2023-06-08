"use client"

import {Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import {Button} from "@material-tailwind/react/components/Button";
import {BiPlus} from "react-icons/bi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";


export default function Page() {


    return (
        <div className="h-full w-full">
            <Card className="flex justify-center items-center p-5">
                <CardHeader floated={false} shadow={false} className="rounded-none w-full">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Liste des formations
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all members
                            </Typography>
                        </div>
                        <div className="flex gap-4">
                            <Input
                                type="text"
                                label="Rechercher"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                            <Button color="blue" size="sm">
                                <BiPlus strokeWidth={2} className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-0 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <Card>
                            <CardBody>
                                Formation 1
                            </CardBody>
                        </Card>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
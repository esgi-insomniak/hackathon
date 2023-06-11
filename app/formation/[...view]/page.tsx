"use client"

import {Button, Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {useRouter} from "next/navigation";
import React from "react";
import PocketbaseHelper from "@/helpers/pocketbase/pocketbase";

export default function Page({ params }) {
    const router = useRouter();
    const slug = params.view[1];
    const pb = PocketbaseHelper.pocketbase;
    const [formation, setFormation] = React.useState({});

    React.useEffect(() => {
        pb.collection("formations").getOne(slug, {
            $autoCancel: false,
            expand: "quizz",
        }).then((data) => {
            console.log(data);
            setFormation(data);
        });
    }, [slug]);


    return (
        <div className="h-full w-full">

            <Card className="flex justify-center items-center p-5">
                <CardHeader floated={false} shadow={false} className="rounded-none w-full">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                {formation.name}
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                {formation.description}
                            </Typography>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-0 w-full" id="formation-content">
                    <div dangerouslySetInnerHTML={
                        {__html: formation.content}
                    } />

                    {formation && formation.expand && formation.expand.quizz && (
                        <div className="flex justify-center items-center">
                            <Button
                                color="blue"
                                buttonType="filled"
                                size="regular"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="light"
                                onClick={() => router.push(`/quizz/view/${formation.quizz}`)}
                            >
                                Quizz
                            </Button>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    )
}
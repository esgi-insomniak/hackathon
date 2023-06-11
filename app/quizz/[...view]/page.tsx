"use client";

import {useRouter} from "next/navigation";
import PocketbaseHelper from "@/helpers/pocketbase/pocketbase";
import React, {useEffect} from "react";
import {Button, Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";

export default function Page({ params }) {
    const router = useRouter();
    const slug = params.view[1];
    const pb = PocketbaseHelper.pocketbase;
    const [quizz, setQuizz] = React.useState<Array<any>>([]);
    const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
    const [score, setScore] = React.useState<number>(0);
    const [showScore, setShowScore] = React.useState<boolean>(false);

    let answers = [];

    useEffect(() => {
        pb.collection("quizz").getOne(slug, {
            $autoCancel: false,
            expand: "questions, skill, questions.answers",
        }).then((data) => {
            setQuizz(data);
        });
    }, [slug]);

    function handleNextQuestion() {
        let correct = true;
        answers.forEach((answer) => {
            if (!answer.correct) {
                correct = false;
            }
        });
        answers = [];

        if (correct) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 === quizz.expand.questions.length) {
            setShowScore(true);
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    return (
        <div className="w-full max-h-screen">
            {!showScore && quizz.length === 0 && (
                <div className="flex justify-center items-center h-screen">
                    <p>Loading...</p>
                </div>
            )}
            {!showScore && quizz && quizz.expand && (
                <Card className="flex flex-col justify-center items-center p-5">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        className="rounded-none w-full"
                    >
                        <div className="mb-8 flex items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    {quizz.name}
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    {quizz.description}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Score : {score}
                                </Typography>
                            </div>
                        </div>
                    </CardHeader>

                    <CardBody>
                        <div className="flex flex-col justify-center items-center">
                            <Typography variant="h2" color="blue-gray">
                                {quizz.expand.questions[currentQuestion].content}
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Question {currentQuestion + 1}/{quizz.expand.questions.length}
                            </Typography>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {quizz.expand.questions[currentQuestion].expand.answers.map((answer, index) => (
                                    <Button
                                        variant="outlined"
                                        key={index}
                                        color="blue"
                                        className="w-full"
                                        onClick={() => {
                                            answers.push(answer);
                                        }}
                                    >
                                        {answer.content}
                                    </Button>
                                ))}
                            </div>
                            <Button color="blue" className="mt-8 w-full" onClick={() => handleNextQuestion()}>
                                Suivant
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            )}

            {showScore && (
                <div className="flex justify-center items-center h-screen">
                    <div className="flex flex-col justify-center items-center">
                        {score === quizz.expand.questions.length && (
                            <Typography variant="h2" color="green">
                                Bravo !
                            </Typography>
                        )}
                        {score !== quizz.expand.questions.length && (
                            <Typography variant="h2" color="red">
                                Dommage, peut-être pour une prochaine !
                            </Typography>
                        )}
                        <Typography variant="h2" color="blue-gray">
                            Score : {score}
                        </Typography>
                        <Button color="blue" className="mt-8 w-full" onClick={() => router.push("/")}>
                            Retour
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

'use client'

import {
    List,
    ListItem,
    ListItemSuffix,
    Card,
    IconButton,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Input,
    CardHeader,
    Select,
    Option,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import {Button} from "@material-tailwind/react/components/Button";
import {BiCheck, BiPen, BiPlus} from "react-icons/bi";
import ContentEditable from "react-contenteditable";
import React, {useRef, useState} from "react";


const QUESTIONS = [
    {
        id: 1,
        content: "Quelle est la capitale de la France ?",
        answers: [
            {
                id: 1,
                content: "Paris",
                isCorrect: true
            },{
                id: 2,
                content: "Lyon",
                isCorrect: false
            },{
                id: 3,
                content: "Marseille",
                isCorrect: false
            }
        ]
    },
    {
        id: 2,
        content: "Quelle est la capitale de l'Espagne ?",
        answers: [
            {
                id: 1,
                content: "Madrid",
                isCorrect: true
            },{
                id: 2,
                content: "Barcelone",
                isCorrect: false
            },{
                id: 3,
                content: "Valence",
                isCorrect: false
            },{
                id: 4,
                content: "Séville",
                isCorrect: false
            }
        ]
    }
];

export default function Page({ params }) {
    const [questions, setQuestions] = useState(QUESTIONS);
    const questionText = useRef(questions[0]?.content || "");
    const [selectedQuestion, setSelectedQuestion] = useState(0);

    const handleChange = evt => {
        questionText.current = evt.target.value;
    };

    const handleBlur = () => {
        //console.log(questionText.current);
        const question = findQuestion(selectedQuestion);
        question.content = questionText.current;
        setQuestions([...questions]);
    };

    const handleAnswerClick = (questionId, answerId) => {
        const newQuestions = questions.map((question) => {
            if (question.id === questionId) {
                question.answers = question.answers.map((answer) => {
                    if (answer.id === answerId) {
                        answer.isCorrect = !answer.isCorrect;
                    }
                    return answer;
                });
            }
            return question;
        });
        setQuestions(newQuestions);
    }

    const handleAddQuestion = () => {
        const newQuestion = {
            id: questions.length + 1,
            content: "Nouvelle question ?",
            answers: []
        }
        setQuestions([...questions, newQuestion]);
        selectQuestion(newQuestion);
    }

    const handleDeleteQuestion = (questionId) => {
        const newQuestions = questions.filter((question) => question.id !== questionId);
        setQuestions(newQuestions);
        if (newQuestions.length > 0){
            selectQuestion(newQuestions[0]);
        }
    }

    const handleAddAnswer = (questionId) => {
        const newQuestions = questions.map((question) => {
            if (question.id === questionId) {
                const newAnswer = {
                    id: question.answers.length + 1,
                    content: "Nouvelle réponse ?",
                    isCorrect: false
                }
                question.answers.push(newAnswer);
            }
            return question;
        });
        setQuestions(newQuestions);
    }

    const selectQuestion = (question) => {
        setSelectedQuestion(question.id);
        questionText.current = question.content;
    }

    const findQuestion = (questionId) => {
        return questions.find((question) => question.id === questionId);
    }

    function handleDeleteAnswer(selectedQuestion, id) {
        const question = findQuestion(selectedQuestion);
        question.answers = question.answers.filter((answer) => answer.id !== id);
        setQuestions([...questions]);
    }

    return (
        <div className="h-full flex flex-col gap-4 p-4">
            <Card>
                <CardHeader floated={false} shadow={false} className="rounded-none w-full">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Création d'un quizz
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Personnaliser votre quizz
                            </Typography>
                        </div>
                    </div>
                </CardHeader>

                <div className="flex justify-between gap-8 pl-2 pr-2">
                    <Input type="text" placeholder="Nom du quizz" className="w-1/3" />
                    <Input type="text" placeholder="Description du quizz" className="w-1/3" />
                    <Select
                        size="lg"
                        label="Sélectionner un niveau"
                        selected={(element) =>
                            element &&
                            React.cloneElement(element, {
                                className: "flex items-center px-0 gap-2 pointer-events-none",
                            })
                        }
                        >
                        <Option value="1" className="flex items-center gap-2">Facile</Option>
                        <Option value="2" className="flex items-center gap-2">Moyen</Option>
                        <Option value="3" className="flex items-center gap-2">Difficile</Option>
                    </Select>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between gap-8 mt-5">
                    <div className="w-1/3 flex flex-col gap-4">
                        <Typography variant="h6" color="blue-gray" className="pl-4">
                            Liste des questions
                        </Typography>
                        <List>
                            {questions.map((question, index) => (
                                <ListItem ripple={false} className="py-1 truncate max-w-md" key={index} onClick={() => {selectQuestion(question);}}>
                                    {question.content}
                                    <ListItemSuffix>
                                        <IconButton variant="text" color="blue-gray" onClick={() => handleDeleteQuestion(question.id)}>
                                            <TrashIcon className="h-5 w-5" />
                                        </IconButton>
                                    </ListItemSuffix>
                                </ListItem>
                            ))}
                            <Button className="flex justify-center items-center gap-3" color="blue" onClick={handleAddQuestion}>
                                <BiPlus strokeWidth={2} className="h-4 w-4" /> Ajouter une question
                            </Button>
                        </List>
                    </div>
                    <div className="w-2/3">
                        {questions.length > 0 && selectedQuestion > 0 && (
                            <div className="flex flex-col w-full h-full items-center justify-center">
                                <ContentEditable
                                    html={questionText.current} // innerHTML of the editable div
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-blue-gray-900"
                                />

                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    {questions.find(question => question.id === selectedQuestion)?.answers.map((answer, index) => (
                                        <SpeedDial>
                                            <SpeedDialHandler>
                                                <Button
                                                    variant={answer.isCorrect ? "filled" : "outlined"}
                                                    color={answer.isCorrect ? "green" : "blue"}
                                                    className="flex items-center justify-center gap-3"
                                                    key={answer.id}
                                                >
                                                    {answer.content}
                                                </Button>
                                            </SpeedDialHandler>
                                            <SpeedDialContent>
                                                <div className="flex flex-col items-center justify-center gap-3">
                                                    <Button onClick={() => handleAnswerClick(selectedQuestion, answer.id)} variant="filled" color="green" className="flex items-center justify-center gap-3  w-full">
                                                        <BiCheck className="h-4 w-4" /> Valider
                                                    </Button>
                                                    <Button variant="filled" color="blue" className="flex items-center justify-center gap-3 w-full">
                                                        <BiPen className="h-4 w-4" /> Modifier
                                                    </Button>
                                                    <Button onClick={() => handleDeleteAnswer(selectedQuestion, answer.id)} variant="filled" color="red" className="flex items-center justify-center gap-3 w-full">
                                                        <TrashIcon className="h-4 w-4" /> Supprimer
                                                    </Button>
                                                </div>
                                            </SpeedDialContent>
                                        </SpeedDial>
                                    ))}
                                    <Button variant="filled" className="flex items-center justify-center gap-3 col-span-2" onClick={() => handleAddAnswer(selectedQuestion)}>
                                        <BiPlus strokeWidth={2} className="h-4 w-4" /> Ajouter une réponse
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}
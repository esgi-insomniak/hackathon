import { useAlert } from "@/providers/alert";
import { Button } from "@material-tailwind/react";
import { CgCopy } from "react-icons/cg";

type EventProps = {
    title: string;
    date: string;
    type: 'work' | 'off-work';
    action?: () => void;
}

export interface EventUIProps extends EventProps {
    description?: string;
    location?: string;
    author?: string;
    id?: string;
}

export const EventItem = ({ title, date, type, action }: EventProps) => {
    return (
        <div className="w-full h-14 bg-carbon-white rounded-sm border flex cursor-pointer hover:drop-shadow" onClick={action}>
            <div className={`h-full ${type === 'off-work' ? 'bg-carbon-green' : 'bg-purple-500'} w-2 rounded-l-sm mr-4`} />
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col tracking-tighter -space-y-2">
                    <span className="font-bold">{title}</span>
                    <span className="italic text-sm text-carbon-black/30">{type === 'off-work' ? 'Off Work' : 'Work'}</span>
                </div>
                <div>
                    <span className="text-sm text-carbon-black/50 mr-4">{date}</span>
                </div>
            </div>
        </div>
    )
}

export const EventItemUI = ({ title, date, type, action, description, author, id }: EventUIProps) => {

    const alert = useAlert()

    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        alert?.success('ID copié dans le presse papier')
        console.log('copied')
    }

    return (
        <div className="w-full h-24 bg-carbon-white rounded-lg border flex hover:drop-shadow">
            <div className={`h-full ${type === 'off-work' ? 'bg-carbon-green' : 'bg-purple-500'} w-2 rounded-l-lg mr-4`} />
            <div className="flex justify-between items-center w-full">
                <div className="flex w-1/4 items-start justify-start flex-col">
                    <div className="flex tracking-tighter space-x-2 ">
                        <span className="text-xl">{type === 'off-work' ? '🍻' : '💻'}</span>
                        <span className="font-bold">{title}</span>
                    </div>
                    <span className='text-sm italic text-carbon-black/30'>{author}</span>
                </div>
                <div className="flex flex-col w-fit">
                    <span className="text-sm text-justify">{description}</span>
                </div>
                <div className="w-1/3 flex justify-center items-center flex-col space-y-3 relative">
                    <span className="text-sm text-carbon-black/50 mr-4">{date}</span>
                    <Button color={type === 'off-work' ? 'green' : 'purple'} onClick={action}>
                        Rejoindre
                    </Button>
                    <CgCopy className="text-xl text-carbon-black/50 cursor-pointer hover:scale-105 duration-150 hover:drop-shadow-md absolute -top-4 right-1" onClick={() => !!id && handleCopy(id)} />
                </div>
            </div>
        </div>
    )
}
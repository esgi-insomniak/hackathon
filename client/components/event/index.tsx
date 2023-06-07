type EventProps = {
    title: string;
    date: string;
    type: 'work' | 'off-work';
    action?: () => void;
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
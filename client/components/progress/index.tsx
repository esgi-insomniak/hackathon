
export interface ProgressProps {
    title: string;
    progress: number;
    color: string
}

export const Progress = ({ title, progress, color }: ProgressProps) => {
    return (
        <div className="flex items-center mb-4">
            <div className="w-2/4 pr-4">
                <span className="text-lg font-light">{title}</span>
            </div>
            <div className={`relative flex-grow h-3 bg-${color}-200 rounded shadow-inner shadow-carbon-black/60`}>
                <div className={`absolute top-0 left-0 h-full bg-${color}-500 rounded w-2/5 shadow-inner shadow-carbon-white border border-carbon-black/10`} style={{ width: `${progress}%` }} />
            </div>
        </div>
    )
}
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
export default function EditTask({ EditTaskAction }: any) {
    const { TaskData, BoardId, getBoardData } = EditTaskAction
    const [isInput, setInput] = useState<boolean>(false)
    const [Name, SetName] = useState<string>(TaskData.TaskName)
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isInput]);

    async function HandleSubmit(event: React.FormEvent) {
        event.preventDefault()
        console.log(Name);
        const response = await axios.patch(`/api/Board/Tasks/Update?BoardId=${BoardId}&TaskId=${TaskData?._id}`, { Name })
        console.log(response.data);
        setInput(!isInput)
        getBoardData()

    }

    const element = isInput ? (
        <form onSubmit={HandleSubmit} method="post">
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                value={Name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => SetName(event.target.value)}
                onBlur={() => setInput(!isInput)}
                ref={inputRef}
            />
        </form>
    ) : (
        <h1 className='text-md' onClick={() => setInput(!isInput)}>{Name}</h1>
    );


    return (
        <div>
            {element}
        </div>
    )
}

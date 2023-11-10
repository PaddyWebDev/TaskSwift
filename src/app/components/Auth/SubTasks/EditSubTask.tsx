import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
export default function EditSubTask({ EditSubTaskActions }: any) {
    const { SubTaskData, BoardId, getBoardData, TaskId } = EditSubTaskActions
    const [isInput, setInput] = useState<boolean>(false)
    const [Name, SetName] = useState<string>(SubTaskData.SubTaskName)
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isInput]);

    async function HandleSubmit(event: React.FormEvent) {
        event.preventDefault()
        await axios.patch(`/api/Board/Tasks/SubTasks/Update?BoardId=${BoardId}&TaskId=${TaskId}&Id=${SubTaskData?._id}`, { Name })
        setInput(!isInput)
        getBoardData()

    }

    const element = isInput ? (
        <form onSubmit={HandleSubmit} method="post">
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                value={Name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => SetName(event.target.value)}
                onBlur={() => setInput(!isInput)}
                ref={inputRef}
            />
        </form>
    ) : (
        <h1 className='text-sm break-all ' onClick={() => setInput(!isInput)}>{Name}</h1>
    );


    return (
        <div>
            {element}
        </div>
    )
}

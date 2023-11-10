import React from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { X } from 'lucide-react';


interface AddTaskForm {
    SubTaskName: string;
}
export default function AddSubTask({ AddSubTaskActions }: any) {
    
    const { Close, BoardId, getBoardData, TaskId } = AddSubTaskActions
    const AddTaskSchema: any = z.object({
        SubTaskName: z.string().min(1, { message: 'Task Name is required' }),
    });
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AddTaskForm>({ resolver: zodResolver(AddTaskSchema) });

    const onSubmit: SubmitHandler<AddTaskForm> = async (data) => {
        try {
            await axios.post(`/api/Board/Tasks/SubTasks/Create?BoardId=${BoardId}&TaskId=${TaskId}`, { data })
            getBoardData()
            reset()
        } catch (error) {
            console.log("error encountered" + error);
        }
    }

    return (
        <>
            <div className=' p-2 w-12/12 '>
                <form onSubmit={handleSubmit(onSubmit)} method="post">
                    <div className="mb-6">
                        <Controller
                            name="SubTaskName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => < input type="search"{...field} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg: John" />}
                        />
                        {errors.SubTaskName && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.SubTaskName.message}</p>}
                    </div>
                </form>
                <button type="button" onClick={Close} className="py-2 px-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><X /></button>
            </div>
        </>
    )
}

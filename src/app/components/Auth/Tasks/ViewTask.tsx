import React, { useState } from 'react'
import ViewSubTask from '../SubTasks/ViewSubTask'
import { Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import AddSubTask from '../SubTasks/AddSubTask';
import EditTask from './EditTask';

type SubTaskType = {
    SubTaskName: string,
    _id: string,
}
export default function ViewTask({ TaskData, TaskActions }: any) {
    const [SubTaskDiv, SetSubTaskDiv] = useState<boolean>(false)
    const { GetBoardData, BoardId } = TaskActions

    async function deleteTask(TaskId: string) {
        await axios.delete(`/api/Board/Tasks/Delete?BoardId=${BoardId}&TaskId=${TaskId}`)
        GetBoardData()
    }

    const EditTaskAction = {
        getBoardData: GetBoardData,
        TaskData: TaskData,
        BoardId: BoardId
    }
    const AddSubTaskAction = {
        TaskId: TaskData._id,
        BoardId: BoardId,
        getBoardData: GetBoardData,
        Close: () => SetSubTaskDiv(!SubTaskDiv)
    }

    const ViewSubTaskAction = {
        TaskId: TaskData._id,
        getBoardData: GetBoardData,
        BoardId: BoardId
    }

    return (
        <>
            <div className='flex items-center justify-between gap-5  mb-2' >
                <EditTask EditTaskAction={EditTaskAction} />
                <button onClick={() => deleteTask(TaskData._id)} type="button"><Trash2 /></button>
            </div>
            <div className='flex flex-col gap-2'>
                {
                    TaskData.SubTasks.map((subTaskData: SubTaskType, index: number) => (
                        <div className='p-2 dark:bg-[#000000] bg-stone-100 rounded-lg ' key={index} >
                            <ViewSubTask subTaskData={subTaskData} ViewSubTaskActions={ViewSubTaskAction} />
                        </div>
                    ))
                }
            </div>
            <div className=' mt-[1vh]'>
                {SubTaskDiv && SubTaskDiv ? (<AddSubTask AddSubTaskActions={AddSubTaskAction} />) : (<button onClick={() => SetSubTaskDiv(!SubTaskDiv)} className='dark:bg-stone-950 bg-stone-50 flex items-center justify-start gap-2 px-5  w-full rounded-lg py-2' type="button"><Plus />Add Card</button>)}
            </div>
        </>
    )
}

import axios from 'axios'
import { Trash2 } from 'lucide-react'
import React from 'react'
import EditSubTask from './EditSubTask'
export default function ViewSubTask({ ViewSubTaskActions, subTaskData }: any) {
    const { getBoardData, BoardId, TaskId } = ViewSubTaskActions

    async function deleteSubTask(SubTaskId: string) {
        await axios.delete(`/api/Board/Tasks/SubTasks/Delete?Id=${SubTaskId}&TaskId=${TaskId}&BoardId=${BoardId}`)
        console.log(`Deleted SubTask with Id ${SubTaskId}`)
        getBoardData()
    }

    const EditSubTaskAction = {
        BoardId: BoardId,
        getBoardData: getBoardData,
        TaskId: TaskId,
        SubTaskData: subTaskData
    }
    return (
        <div className='flex items-center justify-between flex-row gap-2 px-3'>
            <EditSubTask EditSubTaskActions={EditSubTaskAction} />
            <button className='hover:text-red-500' onClick={() => deleteSubTask(subTaskData._id)} type="button"><Trash2 size={20} /></button>
        </div>
    )
}

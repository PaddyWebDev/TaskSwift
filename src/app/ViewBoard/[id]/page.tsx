"use client"
import AddTask from '@/app/components/Auth/Tasks/AddTask';
import Navbar from '@/app/components/Auth/Navbar';
import ViewTask from '@/app/components/Auth/Tasks/ViewTask';
import axios from 'axios';
import { Plus } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react'
import Sidebar from '@/app/components/Auth/Sidebar';

type BoardDt = {
  _id: string;
  Tasks: Array<TaskType>
}

type TaskType = {
  TaskName: string,
  _id: string,
  SubTasks: Array<SubTaskType>
}

type SubTaskType = {
  SubTaskName: string,
  _id: string,
}

interface UserType {
  id: any,
  name: string,
  email: string,
  iat: number,
  exp: number
}
export default function ViewBoard({ params }: any) {
  const [BoardData, SetBoardData] = useState<BoardDt>()
  const [AddDiv, SetAddDiv] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [User, SetUser] = useState<UserType>()



  const getUser = useCallback(async () => {
    try {
      const res = await axios.get("/api/User/Session");
      const userData = res.data?.UserData;
      SetUser(userData);
    } catch (error) {
      console.error('Error fetching user session:', error);
    }
  }, [])


  const getData = useCallback(async () => {
    const response = await axios.get("/api/Board/Get", { params: { Id: params.id } })
    SetBoardData(response.data.BoardData)
    setLoading(!loading)
  }, [loading, params])


  useEffect(() => {
    if (!BoardData)
      getData()

    if (!User)
      getUser()
  }, [getData, User, BoardData, getUser])




  const TaskActions = {
    BoardId: BoardData?._id,
    GetBoardData: getData,
  }

  const AddTaskAction = {
    BoardId: BoardData?._id,
    getBoardData: getData,
    Close: () => SetAddDiv(!AddDiv)
  }

  return (
    <>
      <main className='dashBoardBackground min-h-screen'>

        <Navbar />
        <Sidebar BoardId={params.id} />

        <section className='border p-5 lg:ml-[15vw] sm:ml-[40vw] mx-auto mt-[5vh] flex items-center sm:justify-start justify-center flex-wrap gap-5'>

          {BoardData && BoardData.Tasks.map((taskData: TaskType, index: number) => (
            <div className=' p-5 dark:bg-[#1e1e1e] bg-slate-300 rounded-lg sm:w-[18rem] ' key={index}>
              <ViewTask TaskData={taskData} TaskActions={TaskActions} />
            </div >
          ))}
          <div className=' rounded-lg dark:bg-[#1e1e1e] bg-slate-300 p-2'>
            {AddDiv && AddDiv ? (<AddTask AddTaskActions={AddTaskAction} />) : (<button className='flex items-center justify-start gap-2 px-5 py-3 rounded-lg dark:bg-[#000000] bg-slate-50' onClick={() => SetAddDiv(!AddDiv)} type="button"><Plus />Add Another</button>)}
          </div>
        </section>
      </main >
    </>
  )
}

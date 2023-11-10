import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { ChevronDown, ChevronLeft, Users2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import axios from 'axios';

interface UserData {
    id: string,
    name: string,
    email: string,
    iat: number,
    exp: number
}

interface Board {
    _id: string,
    BoardName: string
}
export default function Sidebar({ BoardId }: any) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showDropDown, SetShowDropdown] = useState<boolean>(false);
    const [User, SetUser] = useState<UserData>()
    const [BoardData, SetBoard] = useState<any>()

    const Router = useRouter();
    const getUser = useCallback(async () => {
        try {
            const res = await axios.get("/api/User/Session");
            SetUser(res.data?.UserData);
        } catch (error: any) {
            if (error.response.status === 404) {
                Router.push("/Login")
            }
        }
    }, [Router])

    const GetBoard = useCallback(async () => {
        if (User) {
            const response = await axios.get(`/api/Board/GetAll?UserId=${User?.id}`)
            SetBoard(response.data.BoardData);
        }
    }, [User])

    useEffect(() => {

        if (!User)
            getUser(); // Call the function directly here

        if (User && !BoardData)
            GetBoard()
        // You can return an empty function or omit the return statement if you don't need any cleanup.
    }, [getUser, User, BoardData, GetBoard]);

    return (
        <>

            <div
                className={`fixed mt-0    h-screen  dark:bg-slate-800 bg-slate-100 ${isOpen ? `w-64` : `w-6`} transition-all duration-500 ease-out `}
            >
                <div className='relative flex items-center justify-end mt-[3vh] dark:bg-slate-900 bg-slate-300 '>
                    <div className={`flex items-center justify-center absolute ${isOpen ? `-right-3` : `-right-3`} dark:bg-slate-800 bg-slate-200  rounded-full  `}>
                        <button onClick={() => setIsOpen(!isOpen)} className={`dark:bg-slate-800 border border-indigo-500 rounded-full ${isOpen && `rotate-180`}  flex items-center justify-center transition-all ease-in-out duration-700 `}>
                            <ChevronLeft />
                        </button>
                    </div>
                </div>
                <div className={`h-full   ${!isOpen && ` scale-0`} p-4  `}>
                    <div className='mb-3  '>
                        <h1 className='mb-1 text-lg'>Boards</h1>
                        <Link href={`/ViewMembers/${BoardId}`} className='flex items-center justify-start gap-2 ml-3'>
                            <Users2 />   Members
                        </Link>
                    </div>
                    <div className='mb-2 '>
                        <button type="button" className='flex items-center justify-evenly text-lg gap-2' onClick={() => SetShowDropdown(!showDropDown)}>
                            Your Boards  <ChevronDown />
                        </button>
                        {
                            showDropDown && (
                                <ul className="space-y-2 ml-4">
                                    {BoardData && BoardData.map((board: Board, index: number) => (
                                        <li key={index}>
                                            <Link href={`/ViewBoard/${board._id}`} className={`flex items-center space-x-2 ${!isOpen && `scale-0`} `}>
                                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                <span>{board.BoardName}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                            )
                        }
                    </div>

                </div>
            </div >
        </>
    )
}

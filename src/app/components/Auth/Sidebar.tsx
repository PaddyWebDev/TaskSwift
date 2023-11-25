import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { ChevronDown, ChevronLeft, Users2, Home } from 'lucide-react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import ViewInvites from './ViewInvites';

interface UserData {
    id: string,
    name: string,
    email: string,
    iat: number,
    exp: number
}

interface BoardType {
    _id: string,
    BoardName: string
}

interface InviteProps {
    BoardId: string,
    invite: {
        invitedTo: string,
        invitedBy: string,
        status: string
    }
    message: string,
}


interface DropdownState {
    [key: string]: boolean;
}

export default function Sidebar({ BoardId }: any) {

    const [Invites, SetInvites] = useState<Array<InviteProps>>()
    const [User, SetUser] = useState<UserData>()
    const [BoardData, SetBoard] = useState<Array<BoardType>>()
    const [CollaboratedBoards, SetCollaboratedBoards] = useState<Array<BoardType>>()

    const [Dropdown, SetDropdown] = useState<DropdownState>({
        Board: false,
        Invites: false,
        SideBar: false,
        CB: false
    })
    const Status: Array<string> = ["accepted", "rejected"]


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

    const GetInvites = async () => {
        Toggle('Invites')
        if (User) {
            const response = await axios.get(`/api/Board/ViewInvites?UserId=${User.id}`)
            SetInvites(response.data.InviteData);
        }
    }

    const Toggle = (dropdownKey: string) => {
        SetDropdown((prevDropdowns: DropdownState) => ({
            ...prevDropdowns,
            [dropdownKey]: !prevDropdowns[dropdownKey],
        }));
    };


    useEffect(() => {

        if (!User)
            getUser(); // Call the function directly here

        if (User && !BoardData)
            GetBoard()

        // You can return an empty function or omit the return statement if you don't need any cleanup.
    }, [getUser, User, BoardData, GetBoard]);


    async function getCollaboratedBoards() {
        Toggle('CB')
        const response = await axios.get(`/api/User/SharedWorkspaces?UserId=${User?.id}`)
        SetCollaboratedBoards(response.data.message)
    }
    return (
        <>

            <aside
                className={`sm:fixed absolute min-h-screen    dark:bg-slate-800 bg-slate-100 transition-all duration-500 ease-out ${Dropdown.Sidebar ? `w-64` : `w-6`}`}
            >
                <div className='relative flex items-center justify-end mt-[3vh] dark:bg-slate-900 bg-slate-300 '>
                    <div className={`flex items-center justify-center absolute ${Dropdown.Sidebar ? `-right-3` : `-right-3`} dark:bg-slate-800 bg-slate-200  rounded-full  `}>
                        <button onClick={() => Toggle('Sidebar')} className={`dark:bg-slate-800 border border-indigo-500 rounded-full ${Dropdown.Sidebar && `rotate-180`}  flex items-center justify-center transition-all ease-in-out duration-700 `}>
                            <ChevronLeft />
                        </button>
                    </div>
                </div>
                <section className={`h-full p-4 ${!Dropdown.Sidebar && `scale-0`}`}>

                    <div className='my-[2vh] hover: '>
                        <Link className=' flex items-center justify-start gap-2' href={`/Dashboard`}>
                            <Home />
                            Dashboard
                        </Link>
                    </div>

                    <div className='mb-3  '>
                        <h1 className='mb-1 text-lg'>Board Actions</h1>
                        <Link href={`/ViewMembers/${BoardId}`} className='flex items-center justify-start gap-2 ml-3'>
                            <Users2 /> View Members
                        </Link>
                    </div>
                    <div className='mt-[3vh] '>
                        <button type="button" className='flex items-center justify-evenly text-lg gap-2' onClick={() => Toggle('Board')}>
                            Your Boards  <ChevronDown />
                        </button>
                        {
                            Dropdown.Board && (
                                <ul className="space-y-2 ml-4">
                                    {BoardData && BoardData.map((board: BoardType, index: number) => (
                                        <li key={index}>
                                            <Link href={`/ViewBoard/${board._id}`} className={`flex items-center space-x-2 ${!Dropdown.Sidebar && `scale-0`} `}>
                                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                <span>{board.BoardName}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                            )
                        }
                    </div>

                    <div className='mt-[3vh]'>
                        <button type="button" className='text-lg flex items-center justify-start gap-2 mb-[1vh]' onClick={() => GetInvites()}>Show Invites  <ChevronDown /> </button>

                        {
                            Dropdown?.Invites ?
                                Invites?.length === 0 ? Invites.map((invite: InviteProps, index: number) => (
                                    <div key={index} className='dark:bg-stone-950 py-2 px-4 rounded-lg ml-4'>
                                        {
                                            Status.includes(invite.invite.status) ? (<h1>Currently there are no Invites</h1>) : (
                                                <ViewInvites InviteData={invite} />
                                            )
                                        }
                                    </div>
                                )) : (<h1>Currently there are no Invites</h1>)
                                : ""
                        }
                    </div>

                    <div className=' mt-[3vh]'>
                        <button type="button" onClick={getCollaboratedBoards} className='text-lg flex items-center justify-start gap-2 '>Collaborated Boards  <ChevronDown /> </button>
                        {
                            Dropdown.CB ?
                                (
                                    <ul className="space-y-3 ml-4">
                                        {CollaboratedBoards && CollaboratedBoards.map((board: BoardType, index: number) => (
                                            <li key={index}>
                                                <Link href={`/ViewBoard/${board._id}`} className={`flex items-center space-x-2 ${!Dropdown.Sidebar && `scale-0`} `}>
                                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                    <span>{board.BoardName}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : ""
                        }
                    </div>

                </section>
            </aside >
        </>
    )
}

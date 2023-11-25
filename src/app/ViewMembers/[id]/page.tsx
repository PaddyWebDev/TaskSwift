"use client"
// Import necessary modules
import React, { useCallback, useEffect, useState } from 'react'
import Navbar from "@/app/components/Auth/Navbar"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import InviteMembers from '@/app/components/Auth/Board/InviteMembers'
import toast from 'react-hot-toast'
import { UserX, LogOutIcon } from 'lucide-react'

// Define interfaces for data types
interface UserData {
    id: string,
    name: string,
    email: string,
    iat: number,
    exp: number
}

interface MemberData {
    Members: Array<MemberType>
    Admin: AdminType
}

interface AdminType {
    _id: string,
    name: string,
}

interface MemberType {
    _id: string,
    MemberId: string
    MemberName: string
}

// Define the ViewMember component
export default function ViewMember({ params }: any) {
    const router = useRouter()
    const [isAdmin, SetAdmin] = useState<boolean>(false)
    const [SessionUser, SetSessionUser] = useState<UserData>()
    const [memberData, setMemberData] = useState<MemberData>()

    // Function to get the session user
    async function GetSessionUser() {
        const response = await axios.get("/api/User/Session")
        SetSessionUser(response.data.UserData);
    }

    // Function to get the member data
    const GetMember = useCallback(async () => {
        const response = await axios.get(`/api/Board/GetMembers?BoardId=${params.id}`)
        setMemberData(response.data.data);
    }, [params.id])

    // UseEffect to handle side effects
    useEffect(() => {

        if (!SessionUser)
            GetSessionUser()

        if (!memberData)
            GetMember()

        if (memberData && SessionUser) {
            SetAdmin(memberData.Admin._id === SessionUser.id)
        }

    }, [memberData, SessionUser, params, GetMember, isAdmin])

    // Function to remove a member from the workspace
    async function RemoveMember(MemberId: string) {
        const response = await axios.delete(`/api/Board/RemoveMember?BoardId=${params.id}&MemberId=${MemberId}`)
        toast.success(response.data.message)
        GetMember()
        if (!isAdmin)
            router.push(`/Dashboard`)

    }

    // Render the ViewMember component
    return (
        <main className='min-h-screen relative'>
            <Navbar />
            {memberData && (
                <section className='mx-auto mt-[10vh] sm:w-[80vw] dark:bg-[#1c1c1c] bg-slate-200 p-2 rounded-xl'>
                    <div className='flex items-center md:justify-between justify-center flex-wrap sm:w-[70vw] mb-[8vh] dark:bg-[#111111] bg-slate-100 mx-auto rounded-xl p-10'>
                        <h1 className='text-3xl font-semibold md:mb-0 mb-[3vh]'>{isAdmin ? "Your" : ` ${memberData?.Admin.name}'s`} Workspace</h1>
                        {isAdmin ? (
                            <InviteMembers GetMembers={GetMember} BoardId={params.id} SenderId={SessionUser?.id} />
                        ) : ""}
                    </div>
                    <div className='sm:w-[60vw] mx-auto p-6 rounded-xl m-5'>
                        <h3 className='text-xl mb-3'> {memberData.Members.length === 0 ? "Currently, There are no member's in your workspace" : `Workspace Members ${memberData?.Members.length}`} </h3>
                        <p className='text-sm'>Workspace members can view and join all Workspace visible boards and create new boards in the Workspace.</p>
                    </div>

                    {/* displaying all the members */}
                    <div>
                        <div className='flex items-center sm:justify-between justify-center flex-wrap dark:bg-[#000001] bg-slate-50 rounded-lg sm:w-[60vw] w-[80vw] mx-auto p-4 rounded-lg m-5'>
                            <h1 className='text-xl font-bold m-2 sm:text-right text-center'>{isAdmin ? "You" : memberData?.Admin.name} </h1>
                            <div className='flex items-center justify-start gap-2 p-2'>
                                <h1 className='border py-2 px-4 rounded-lg text-slate-100 dark:text-slate-100 dark:bg-indigo-600 dark:border-indigo-600 bg-indigo-500 border-indigo-500'>Admin</h1>
                            </div>
                        </div>
                        {memberData?.Members.map((member: MemberType, index: number) => (
                            <div className='flex items-center flex-wrap dark:bg-[#000001] bg-slate-50 rounded-lg sm:justify-between justify-center sm:w-[60vw] mx-auto p-5 m-5' key={index}>
                                <h1 className='text-xl font-bold m-2 sm:text-right text-center'>{member.MemberName === SessionUser?.name ? "You" : member.MemberName}</h1>
                                <div className='flex items-center sm:justify-start flex-wrap justify-center gap-2 p-2'>
                                    <h1 className='border py-2 px-4 rounded-lg text-slate-100 dark:text-slate-100 dark:bg-indigo-600 dark:border-indigo-600 bg-indigo-500 border-indigo-500'>Member</h1>
                                    {
                                        isAdmin ? (<button type="button" className="flex items-center justify-start gap-1 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm py-2.5 px-3 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => RemoveMember(member.MemberId)}> <UserX /> Remove </button>) : member.MemberName === SessionUser?.name ?
                                            (<button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg flex items-center justify-start gap-1 text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => RemoveMember(member.MemberId)}><LogOutIcon /> Leave</button>) : ""

                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            )}
        </main>
    )
}
//
//This code defines a `ViewMember` component that displays the members of a workspace. It uses the `useState` and `useEffect` hooks to manage the state and side effects of the component. The `GetSessionUser` function retrieves the session user, while the `GetMember` function retrieves the member data. The `RemoveMember` function allows the removal of a member from the workspace. The component is rendered with proper styling and layout.
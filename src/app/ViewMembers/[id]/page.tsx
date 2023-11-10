"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Navbar from "@/app/components/Auth/Navbar"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import InviteMembers from '@/app/components/Auth/Board/InviteMembers'
import toast, { Toaster } from 'react-hot-toast'
import { UserMinus } from 'lucide-react'

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
export default function ViewMember({ params }: any) {
    const router = useRouter()
    const [isAdmin, SetAdmin] = useState<boolean>(false)
    const [SessionUser, SetSessionUser] = useState<UserData>()
    const [memberData, setMemberData] = useState<MemberData>()




    async function GetSessionUser() {
        const response = await axios.get("/api/User/Session")
        SetSessionUser(response.data.UserData);
    }


    const GetMember = useCallback(async () => {
        const response = await axios.get(`/api/Board/GetMembers?BoardId=${params.id}`)
        setMemberData(response.data.data);
    }, [params.id])

    useEffect(() => {

        if (!SessionUser)
            GetSessionUser()

        if (!memberData)
            GetMember()

        if (memberData && SessionUser) {
            SetAdmin(memberData.Admin._id === SessionUser.id)
        }

    }, [memberData, SessionUser, params, GetMember, isAdmin])




    async function RemoveMember(MemberId: string) {
        const response = await axios.delete(`/api/Board/RemoveMember?BoardId=${params.id}&MemberId=${MemberId}`)
        toast.success(response.data.message)
        GetMember()
        if (!isAdmin)
            router.push(`/Dashboard`)

    }


    return (
        <main className='min-h-screen'>
            <Navbar />
            <div><Toaster
                position="top-center"

                reverseOrder={false}
            /></div>
            {memberData && (
                <section className=' mx-auto mt-[5vh] sm:w-[80vw] dark:bg-[#1c1c1c] bg-slate-200 p-2 rounded-xl '>
                    <div className='flex items-center md:justify-between justify-center  flex-wrap sm:w-[70vw] mb-[8vh] dark:bg-[#111111] bg-slate-100 mx-auto rounded-xl p-10'>
                        <h1 className='text-3xl font-semibold md:mb-0 mb-[3vh]'>{isAdmin ? "Your" : ` ${memberData?.Admin.name}'s`} Workspace</h1>
                        {isAdmin ? (
                            <InviteMembers GetMembers={GetMember} BoardId={params.id} />
                        ) : ""}
                    </div>
                    <div className=' w-[60vw] mx-auto p-6 rounded-xl  m-5'>
                        <h3 className='text-xl mb-3'> {memberData.Members.length === 0 ? "Currently, There are no member's in your workspace" : `Workspace Members ${memberData?.Members.length}`} </h3>
                        <p className='text-sm'>Workspace members can view and join all Workspace visible boards and create new boards in the Workspace.</p>
                    </div>

                    {/* displaying all the members */}
                    <div >
                        <div className='flex items-center sm:justify-between justify-center  flex-wrap  dark:bg-[#000001] bg-slate-50  w-[60vw] mx-auto p-4 rounded-lg m-5'>
                            <h1 className='text-xl font-bold m-2 sm:text-right text-center '>{isAdmin ? "You" : memberData?.Admin.name} </h1>
                            <div className='flex items-center justify-start gap-2 p-2 '>
                                <h1 className='border  py-2 px-4 rounded-lg text-slate-100 dark:text-slate-100 dark:bg-indigo-600 dark:border-indigo-600 bg-indigo-500  border-indigo-500'>Admin</h1>
                            </div>
                        </div>
                        {memberData?.Members.map((member: MemberType, index: number) => (
                            <div className='flex items-center  flex-wrap  dark:bg-[#000001]  bg-slate-50 rounded-lg  sm:justify-between justify-center   w-[60vw] mx-auto p-5 m-5' key={index}>
                                <h1 className='text-xl font-bold m-2 sm:text-right text-center'>{member.MemberName === SessionUser?.name ? "You" : member.MemberName}</h1>
                                <div className='flex items-center justify-start gap-2  p-2'>
                                    <h1 className='border py-2 px-4 rounded-lg text-slate-100 dark:text-slate-100 dark:bg-indigo-600 dark:border-indigo-600 bg-indigo-500  border-indigo-500'>Member</h1>
                                    {
                                        isAdmin ? (<button type="button" className=" flex items-center justify-start gap-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm p-2   me-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => RemoveMember(member.MemberId)}> <UserMinus /></button>) : member.MemberName === SessionUser?.name ?
                                            (<button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => RemoveMember(member.MemberId)}>Leave</button>) : ""

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


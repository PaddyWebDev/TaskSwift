"use client"
import axios from 'axios';
import { UserPlusIcon, X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
// interface InviteProps {
//     BoardId: string,
//     invite: {
//         invitedTo: string,
//         invitedBy: string,
//         status: string
//     }
//     message: string,
// }

interface SenderData {
    name: string,
    email: string
}

export default function ViewInvites({ InviteData }: any) {
    const [ModalState, SetModalState] = useState<boolean>(false)
    const [SenderData, SetSenderData] = useState<SenderData>()
    console.log(InviteData);

    async function AcceptInvitation() {
        try {
            const { invitedTo } = InviteData.invite
            const { _id } = InviteData
            const response = await axios.post(`/api/Board/AcceptInvite?BoardId=${InviteData.BoardId}`, { invitedTo, _id })
            toast.success(response.data.message)
        } catch (error: any) {
            if (error.response.status === 409)
                toast.error(error.response.data.message)
        }
    }

    const GetSender = useCallback(
        async () => {
            if (InviteData) {
                const response = await axios.get(`/api/User/ListUserById?UserId=${InviteData.invite.invitedBy}`)
                SetSenderData(response.data.UserData)
                console.log(response.data);
            }
        },
        [InviteData])

    async function RejectInvitation() {
        try {
            const { invitedTo } = InviteData.invite
            const { _id, BoardId } = InviteData
            const response = await axios.patch(`/api/Board/RejectInvite`, { BoardId, invitedTo, _id })
            toast.success(response.data.message)
        } catch (error: any) {
            if (error.response.status === 409)
                toast.error(error.response.data.message)
        }
    }




    async function OpenModal() {
        SetModalState(!ModalState)
        GetSender()
    }

    return (
        <div className='flex items-center justify-start gap-2'>
            <h1>{InviteData.message}</h1>
            <div className='ml-auto'>
                <button type="button" onClick={() => OpenModal()}>
                    Info
                </button>
            </div>
            <Modal
                className={`dark:bg-slate-950 bg-slate-300 mt-[15vh] sm:w-[30vw] w-[90vw] mx-auto p-5 rounded-lg`}
                isOpen={ModalState}
                ariaHideApp={false}
                onRequestClose={() => SetModalState(!ModalState)}
                contentLabel=" View Invitation Modal"
                overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-50"
            >
                <section>
                    <div className='flex items-center justify-end'>
                        <button onClick={() => SetModalState(!ModalState)}><X /></button>
                    </div>
                    <div>
                        <div className=''>
                            <h1 className=' text-2xl text-center mb-3'>{InviteData.message}</h1>
                            <h4 className=' text-center'>Sender: {SenderData?.name}</h4>
                        </div>

                        <div className='flex items-center justify-center gap-5 mt-[6vh]'>
                            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => RejectInvitation()}>Reject</button>
                            <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => AcceptInvitation()}>Accept</button>
                        </div>
                    </div>

                </section>
            </Modal>
        </div>
    )
}


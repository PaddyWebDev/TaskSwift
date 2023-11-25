import axios from 'axios';
import React, { Suspense, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import SolitaireRing from '../SolitaireRing';
const LoadingSpinner = React.lazy(() => import('../SolitaireRing'));

interface UserType {
    _id: string,
    name: string
}
export default function AddMembers({ BoardId, GetMembers, SenderId }: any) {
    const [Name, SetName] = useState<string>("")
    const [Users, SetUsers] = useState<Array<UserType>>([])
    const [loading, setLoading] = useState<boolean>(true);

    async function DataHandler() {
        setTimeout(async () => {
            if (Name.trim() === '') {
                // If the input is empty, display no results
                SetUsers([]);
                return;
            }
            const response = await axios.get(`/api/User/ListUsers?Name=${Name}`)
            SetUsers(response.data.data)
            setLoading(!loading)
        }, 500);
    }


    async function AddMember(MemberId: string) {
        try {
            const response = await axios.post(`/api/Board/SendInvite`, { BoardId, MemberId, SenderId })
            toast.success(response.data.message)

        } catch (error: any) {
            if (error.response.status === 409)
                toast.error(error.response.data.message)
        }
    }
    return (
        <section className='sm:w-[30vw] mx-auto m-5' >

            <input type="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" value={Name} onChange={(e) => SetName(e.target.value)} onInput={() => DataHandler()} required />
            <div className='mt-[3vh]'>
                {
                    Name && (
                        <Suspense fallback={<LoadingSpinner />}>
                            {loading ? (
                                <div className=' flex items-center justify-center'>
                                    <SolitaireRing />
                                </div>
                            ) :
                                Users && Users ? (Users.map((user: UserType, index: number) => (
                                    <div className='px-5 py-1 flex items-center' key={index}>
                                        <button className='dark:bg-stone-800 bg-stone-200 py-2 px-4 rounded-lg' onClick={() => AddMember(user._id)}>{user.name}</button>
                                    </div>
                                ))) : (<h1> Nothing Found</h1>)
                            }
                        </Suspense>
                    )
                }

            </div>
        </section >
    )
}



"use client"
import Navbar from '@/app/components/Auth/Navbar'
import ChangePassword from '@/app/components/Auth/User/ChangePassword'
import ViewImage from '@/app/components/Auth/User/ViewImage'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { string, z } from 'zod'

type Genders = 'Male' | 'Female' | 'Others';


type UserType = {
    name: string,
    _id: string,
    email: string,
    gender: Genders,
    phoneNumber: string,
    profilePicture: string
}



const UpdateProfileSchema = z.object({
    name: string().min(1, "Name is Required"),
    email: string().min(1, "Email is Required").email(),
    gender: z.enum(['Male', 'Female', 'Others']),
    phoneNumber: string().min(10, "Phone Number be above 10 digits").max(12, "Phone Number shouldn't be above 10 digits")
})



export default function Profile({ params }: any) {
    const [User, SetUser] = useState<UserType>()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UserType>({ resolver: zodResolver(UpdateProfileSchema) })

    const GetUser = useCallback(async () => {
        const response = await axios.get(`/api/User/ListUserById?UserId=${params.Id}`)
        SetUser(response.data.UserData)
    }, [params, SetUser])

    useEffect(() => {
        if (!User)
            GetUser()
    }, [GetUser, User])


    const HandleUpdateData: SubmitHandler<UserType> = async (UserData: UserType) => {
        try {
            const response = await axios.patch(`/api/User/Update/Details?UserId=${params.Id}`, { UserData })
            if (response.status === 200)
                toast.success(response.data.message)
        } catch (error: any) {
            if (error.response.status === 500)
                toast.error(error.response.data.message)
            console.log(error);
        }
    }


    return (
        <main>
            <Navbar />
            {User && (
                <section className=' sm:w-[60vw] w-[95vw] mx-auto mt-[5vh] dark:bg-zinc-900 dark:border border-zinc-900 sm:p-5 p-2 rounded-lg'>
                    <div className='flex  flex-col flex-wrap w-10/12 mx-auto'>

                        <div className='my-5'>
                            <h1 className='text-3xl'>Your Profile</h1>
                        </div>

                        <div className='flex  justify-between'>
                            <ViewImage GetUser={GetUser} ImageSource={User.profilePicture ? User.profilePicture : "/Images/NoProfilePic.png"} UserId={params.Id} />

                            <ChangePassword UserId={params.Id} />
                        </div>


                    </div>

                    <div className=' sm:m-12 p-2'>

                        <form method="post" onSubmit={handleSubmit(HandleUpdateData)}>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <Controller
                                        name="name"
                                        control={control}
                                        defaultValue={User?.name}
                                        render={({ field }) => < input type="search"{...field} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" />}
                                    />
                                    {errors.name && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.name.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        defaultValue={User?.email}
                                        render={({ field }) => < input type="search" {...field} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="youremail@example.com" />}
                                    />
                                    {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.email.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                    <Controller
                                        name='phoneNumber'
                                        control={control}
                                        defaultValue={User.phoneNumber}
                                        render={({ field }) => <input type="number" {...field} id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="123-45-678" />}
                                    />

                                </div>
                                <div>
                                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose Your Gender</label>
                                    <Controller
                                        name="gender"
                                        control={control}
                                        defaultValue={User.gender}
                                        render={({ field }) =>
                                            <select id="gender" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value={""} disabled>Choose Your Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        }
                                    />

                                </div>

                            </div>
                            <div>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </div>
                        </form>
                    </div>
                </section >
            )}

        </main >
    )
}

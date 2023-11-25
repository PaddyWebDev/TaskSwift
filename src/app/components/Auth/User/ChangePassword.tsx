import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { X, KeyRoundIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import Modal from 'react-modal'
import { string, z } from 'zod';



interface StatesType {
    [key: string]: boolean;
}

interface ChangePassword {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}

interface ChangePasswordProps {
    UserId: string
}

export default function ChangePassword({ UserId }: ChangePasswordProps) {
    const UpdatePasswordSchema = z.object({
        oldPassword: string().min(1, "Old Password is required for Verification"),
        newPassword: string().min(1, "New Password is required to update the password"),
        confirmPassword: string().min(1, "Password Confirmation is required")
    })


    const [State, SetState] = useState<StatesType>({
        Passwords: false,
        Modal: false
    })



    const Toggle = (ElementKey: string) => {
        SetState((prevState: StatesType) => ({
            ...prevState,
            [ElementKey]: !prevState[ElementKey],
        }));
    };

    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: { errors },

    } = useForm<ChangePassword>({ resolver: zodResolver(UpdatePasswordSchema) })

    const HandleUpdateData: SubmitHandler<ChangePassword> = async (PasswordData: ChangePassword) => {
        try {
            console.log(PasswordData);
            const response = await axios.patch(`/api/User/Update/Password?UserId=${UserId}`, PasswordData)
            if (response.status == 200)
                toast.success("Password Updated")
            console.log(response.data);
            reset();
        } catch (error: any) {
            if (error.request.status === 400)
                setError('oldPassword', { message: error.response.data.message });

            if (error.request.status === 422)
                setError('confirmPassword', { message: error.response.data.message });

            console.log(error);
        }
    }




    return (
        <div>
            <button className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 flex items-center justify-start gap-2 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={() => Toggle('Modal')}> <KeyRoundIcon /> Change Password</button>

            <div>
                <Modal
                    className={`dark:bg-slate-950 bg-slate-300 mt-[25vh] md:w-[35vw] sm:w-[50vw] w-[90vw] mx-auto p-5 rounded-lg`}
                    isOpen={State.Modal}
                    ariaHideApp={false}
                    onRequestClose={() => Toggle('Modal')}
                    contentLabel="Change Password Modal"
                    overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-50"
                >
                    <section className='p-2'>
                        <div className='flex items-center justify-end'>
                            <button onClick={() => Toggle('Modal')}><X /></button>
                        </div>
                        <h1 className='text-2xl'>Change Password</h1>

                        <div className=' sm:p-5 p-4 rounded-lg mt-[2vh]'>
                            <form method="post" className='flex flex-col gap-5' onSubmit={handleSubmit(HandleUpdateData)}>

                                <div>
                                    <label htmlFor='oldPassword'>Old Password</label  >
                                    <Controller
                                        name='oldPassword'
                                        defaultValue=''
                                        control={control}
                                        render={({ field }) => <input {...field} type={State.Passwords ? 'search' : 'password'} className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />}
                                    />

                                    {errors.oldPassword && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.oldPassword.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor='newPassword'  > New Password</label  >
                                    <Controller
                                        name='newPassword'
                                        defaultValue=''
                                        control={control}
                                        render={({ field }) => <input {...field} type={State.Passwords ? 'search' : 'password'} className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />}
                                    />

                                    {errors.newPassword && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.newPassword.message}</p>}

                                </div>

                                <div>
                                    <label htmlFor='confirmPassword'  >Confirm Password</label  >
                                    <Controller
                                        defaultValue=''
                                        name='confirmPassword'
                                        control={control}
                                        render={({ field }) => <input {...field} type={State.Passwords ? 'search' : 'password'} className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />}
                                    />

                                    {errors.confirmPassword && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.confirmPassword.message}</p>}

                                </div>
                                <div className="flex items-start mb-3">
                                    <div className="flex items-center h-5">
                                        <input id="remember" onClick={() => Toggle('Passwords')} type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                                    </div>
                                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show Password</label>
                                </div>

                                <div>
                                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                                </div>


                            </form>
                        </div>

                    </section>

                </Modal>

            </div>

        </div >
    )
}

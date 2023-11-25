"use client"

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';
import React, { useState } from 'react';

interface RegistrationForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    gender: Gender;
}

type Gender = 'Male' | 'Female' | 'Others';



const RegistrationSchema: any = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email' }),
    phoneNumber: z.string().min(10, { message: 'Phone number should be greater than 10 digits' }).max(12, "Phone Number should be less than 12 digits"),
    gender: z.enum(['Male', 'Female', 'Others'] as const),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
});
export default function Register() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter()
    const {
        control,
        handleSubmit,
        reset,
        setError,  // Add setError from react-hook-form
        formState: { errors },
    } = useForm<RegistrationForm>({ resolver: zodResolver(RegistrationSchema) });

    const Register: SubmitHandler<RegistrationForm> = async (data: RegistrationForm) => {
        try {
            // Check if passwords match
            if (data.password !== data.confirmPassword) {
                setError('confirmPassword', { message: 'Passwords do not match' });
                toast.error("Passwords Don't Match")
            } else {
                const { name, password, email, gender, phoneNumber } = data;
                await axios.post("/api/User/register", { name, email, password, gender, phoneNumber })
                reset()
                toast.success("Success, Redirecting you to Login", {
                    duration: 1000,
                })
                setTimeout(() => {
                    router.push('/Login')
                }, 1000);
            }


        } catch (error: any) {
            if (error.response.status === 409) {
                toast.error(error.response.data.message)
            }
            else if (error.response.status === 422) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Internal Server Error")

            }
        }
    };



    return (
        <main
            className='min-h-screen background flex items-center  '
        >
            <section className='dark:bg-slate-950 bg-slate-200 p-5 rounded-3xl lg:w-[40vw] md:w-[50vw] w-[80vw] mx-auto'>
                <h1 className='text-3xl mb-5'>Register</h1>
                <form onSubmit={handleSubmit(Register)}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=''
                                render={({ field }) => <input type="search" {...field} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />}
                            />

                            {errors.name && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.name.message}</p>}

                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=''
                                render={({ field }) => <input type="search" {...field} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="johndoe@gmail.com" />}
                            />
                            {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.email.message}</p>}

                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                            <Controller
                                name="phoneNumber"
                                defaultValue=''
                                control={control}
                                render={({ field }) => <input type="number" {...field} id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="123-45-678" />}
                            />
                            {errors.phoneNumber && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.phoneNumber.message}</p>}
                        </div>

                        <div>
                            <div>
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose Your Gender</label>
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({ field }) => <select id="gender" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option defaultValue={""}>Choose Your Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Other</option>
                                    </select>
                                    }
                                />

                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <Controller
                            defaultValue=''
                            name="password"
                            control={control}
                            render={({ field }) => <input type={showPassword ? `search` : `password`} {...field} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />}
                        />
                        {errors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.password.message}</p>}

                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <Controller
                            name="confirmPassword"
                            defaultValue=''
                            control={control}
                            render={({ field }) => <input type={showPassword ? `search` : `password`} {...field} id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />}
                        />
                        {errors.confirmPassword && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.confirmPassword.message}</p>}

                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="remember" onChange={() => setShowPassword(!showPassword)} type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show Password</label>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    <p className='text-center my-[1vh]'>Already Registered?<Link href={"/Login"} className='hover:text-blue-500 active:bg-blue-500 ' > Sign In</Link></p>

                </form>
            </section>
        </main >
    );
}

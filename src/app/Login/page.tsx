"use client"


import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';
const schema = z.object({
    email: z.string().email('Invalid email').min(1, 'Email is Required'),
    password: z.string().min(1, "Password is Required"),
});

interface LoginForm {
    email: string;
    password: string;
}
export default function Login() {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({ resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        try {
            const { email, password } = data;
            await axios.post("/api/User/login", { email, password })
            toast.success("Success, Redirecting you to Dashboard", {
                duration: 2000
            })
            setTimeout(() => {
                router.push("/Dashboard")
            }, 2000);
        } catch (error: any) {
            if (error.response.status === 401 || error.response.status === 404) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Error while submitting the form")
            }
        }
    };

    return (
        <main className='min-h-screen background border  flex items-center  '>
            <section className='dark:bg-slate-950 bg-slate-200 p-5 lg:w-[30vw] md:w-[40vw] w-[80vw] mx-auto rounded-3xl'>
                <div><Toaster
                    position="top-center"

                    reverseOrder={false}
                /></div>
                <h1 className='text-3xl mb-5'>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => < input type="search"{...field} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" />}
                        />
                        {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.email.message}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <Controller
                            name='password'
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input type={showPassword ? 'search' : 'password'} {...field} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />}
                        />
                        {errors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.password.message}</p>}

                    </div>

                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="remember" onClick={() => setShowPassword(!showPassword)} type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show Password</label>
                    </div>
                    <button type="submit"
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    >Submit</button>
                    <p className='text-center my-[2vh]'>{"Don't"} Have Account?<Link href={"/Register"} className='hover:text-blue-500 active:bg-blue-500 ' > Sign Up</Link></p>
                </form>
            </section>
        </main >
    )

}

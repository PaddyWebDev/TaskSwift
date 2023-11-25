"use client"


import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
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
        reset,
        formState: { errors },
    } = useForm<LoginForm>({ resolver: zodResolver(schema) })


    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        try {
            const { email, password } = data;
            await axios.post("/api/User/login", { email, password })
            toast.success("Successfully Logged In", {
                duration: 2000
            })
            reset()
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
        <main className='min-h-screen background  flex items-center  '>
            <section className='LoginBG  p-5 xl:w-[30vw] lg:w-[35vw] md:w-[40vw] w-[80vw] mx-auto rounded-3xl'>

                <h1 className='text-3xl mb-2'>Login</h1>

                <p className='mb-6'>Login here using your username and password</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <div className="relative z-0">
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => < input type="search"{...field} autoComplete='off' id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />}
                            />
                            <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email address</label>

                        </div>

                        {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.email.message}</p>}
                    </div>


                    <div className='mb-6'>
                        <div className="relative z-0 ">
                            <Controller
                                name='password'
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input type={showPassword ? 'search' : 'password'} autoComplete='off' {...field} id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />}
                            />
                            <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
                        </div>
                        {errors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.password.message}</p>}
                    </div>

                    <div className="flex items-start mb-3">
                        <div className="flex items-center h-5">
                            <input id="remember" onClick={() => setShowPassword(!showPassword)} type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show Password</label>
                    </div>
                    <div className=' pr-7 flex items-center justify-end'>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
                    </div>

                    <p className='text-center my-[2vh]'>{"Don't"} Have Account?<Link href={"/Register"} className='hover:text-blue-500 active:bg-blue-500 ' > Sign Up</Link></p>
                </form>
            </section>
        </main >
    )

}

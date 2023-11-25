"use client"
import React, { Fragment, SVGProps, useCallback, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineLogout, HiOutlineCubeTransparent } from "react-icons/hi";
import { RxCaretDown } from "react-icons/rx";

interface UserData {
    id: string,
    name: string,
    email: string,
    iat: number,
    exp: number
}
const Navbar: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    const [User, SetUser] = useState<UserData>()
    const Router = useRouter();

    const getUser = useCallback(async () => {
        try {
            const res = await axios.get("/api/User/Session");
            SetUser(res.data?.UserData);
        } catch (error: any) {
            if (error.response.status === 404 || error.response.status === 500) {
                Router.push("/Login")
            }
        }
    }, [Router])

    useEffect(() => {

        if (!User)
            getUser(); // Call the function directly here

    }, [User, getUser]);





    async function Logout() {
        await axios.post("/api/User/logout")
        Router.push("/Login")
    }
    return (
        <header id="page-header" className="flex flex-none items-center bg-white shadow-sm z-1  dark:bg-gray-800">
            <div className="container xl:max-w-7xl mx-auto px-4 lg:px-8">
                <div className="flex justify-between py-4">
                    <div className="flex items-center">
                        <Link href="/" className="group inline-flex items-center space-x-2 font-bold text-lg tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300">
                            <HiOutlineCubeTransparent className="hi-mini hi-cube-transparent inline-block w-5 h-5 text-blue-600 transition group-hover:scale-110 dark:text-blue-400" />
                            <span>TaskSwift</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-2 lg:space-x-5">


                        <Menu as="div" className="relative inline-block">
                            <Menu.Button className="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-3 py-2 leading-5 text-sm border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700">
                                <span>{User ? User?.name : "User"}</span>
                                <RxCaretDown className="hi-mini hi-chevron-down inline-block w-5 h-5 opacity-40" />
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="opacity-0 scale-90"
                                enterTo="opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-90"
                            >
                                <Menu.Items className="absolute right-0 origin-top-right z-10 mt-2 w-48 shadow-xl rounded-lg dark:shadow-gray-900 focus:outline-none">
                                    <div className="bg-white ring-1 ring-black ring-opacity-5 rounded-lg divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-700 dark:ring-gray-700">

                                        <div className="p-2.5 space-y-1">

                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href={`/Dashboard`}
                                                        className={`group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent ${active ? "text-indigo-800 bg-indigo-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent" : "text-gray-700 hover:text-indigo-800 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700/75 dark:active:border-gray-600"
                                                            }`}
                                                    >

                                                        <MdOutlineSpaceDashboard className="flex-none hi-mini hi-user-circle inline-block w-5 h-5 opacity-25 group-hover:opacity-50" />
                                                        <span className="grow">Dashboard</span>
                                                    </Link>
                                                )}
                                            </Menu.Item>

                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href={`/Profile/${User?.id}`}
                                                        className={`group text-sm  font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent ${active ? "text-indigo-800 bg-indigo-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent" : "text-gray-700 hover:text-indigo-800 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700/75 dark:active:border-gray-600"
                                                            }`}
                                                    >
                                                        <FaRegCircleUser className="flex-none hi-mini hi-user-circle inline-block w-5 h-5 opacity-25 group-hover:opacity-50" />
                                                        <span className="grow">Account</span>
                                                    </Link>
                                                )}
                                            </Menu.Item>

                                        </div>
                                        <div className="p-2.5 space-y-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={Logout}
                                                        className={`group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent ${active ? "text-indigo-800 bg-indigo-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent" : "text-gray-700 hover:text-indigo-800 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700/75 dark:active:border-gray-600"
                                                            }`}
                                                    >
                                                        <HiOutlineLogout className="flex-none hi-mini hi-lock-closed inline-block w-5 h-5 opacity-25 group-hover:opacity-50" />
                                                        <span className="grow">Sign out</span>
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                    </div>
                </div>


            </div>
        </header>
    )
}

export default Navbar
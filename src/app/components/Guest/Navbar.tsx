
import React, { useState } from "react";

import Link from "next/link";

import { HiOutlineCubeTransparent } from "react-icons/hi";
import { Briefcase, Home, Menu, Users2 } from "lucide-react";



export default function Navbar() {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <>
            <header id="page-header" className="flex flex-none items-center bg-white shadow-sm z-1 dark:bg-gray-900">
                <div className="container xl:max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="flex justify-between py-4">
                        <div className="flex items-center">
                            <Link href={`/`} className="group inline-flex items-center space-x-2 font-bold text-lg tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300">
                                <HiOutlineCubeTransparent className="hi-mini hi-cube-transparent inline-block w-5 h-5 text-blue-600 transition group-hover:scale-110 dark:text-blue-400" />
                                <span>TaskSwift</span>
                            </Link>
                        </div>

                        <div className="flex items-center space-x-2 lg:space-x-5">
                            <nav className="hidden lg:flex items-center space-x-2">
                                <Link href="/" className="group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg text-indigo-600 border border-indigo-100 bg-indigo-50 dark:text-white dark:bg-gray-700 dark:border-transparent">
                                    <div className=" text-slate-500 ">
                                        <Home />
                                    </div>
                                    <span>Dashboard</span>
                                </Link>
                                <Link href="/About" className="group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-indigo-600 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700 dark:active:border-gray-600">
                                    <div className=" text-slate-500 ">
                                        <Users2 />
                                    </div>
                                    <span>Customers</span>
                                </Link>
                                <Link href="/Contact" className="group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-indigo-600 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700 dark:active:border-gray-600">
                                    <div className=" text-slate-500 ">
                                        <Briefcase />
                                    </div>
                                    <span>Contact</span>
                                </Link>

                            </nav>

                            <div className="lg:hidden">
                                <button
                                    onClick={() => setMobileNavOpen(!mobileNavOpen)}
                                    type="button"
                                    className="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-3 py-2 leading-5 text-sm border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                                >
                                    <Menu />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`lg:hidden ${mobileNavOpen ? "" : "hidden"
                            }`}
                    >
                        <nav className="flex flex-col space-y-2 py-4 border-t dark:border-gray-700">
                            <Link href="/" className="group text-sm font-semibold flex items-center space-x-2 px-3 py-2 rounded-lg text-indigo-600 border border-indigo-50 bg-indigo-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent">
                                <div className=" text-slate-500 ">
                                    <Home />
                                </div>
                                <span>Dashboard</span>
                            </Link>
                            <Link href="/About" className="group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-indigo-600 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700 dark:active:border-gray-600">
                                <div className=" text-slate-500 ">
                                    <Users2 />
                                </div>
                                <span>Customers</span>
                            </Link>
                            <Link href="/Contact" className="group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-indigo-600 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700 dark:active:border-gray-600">
                                <div className=" text-slate-500 ">
                                    <Briefcase />
                                </div>
                                <span>Projects</span>
                            </Link>

                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}


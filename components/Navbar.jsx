"use client"
import { AppContext } from "@/context/AppContext/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
const Navbar = () => {
    const { addToggle, setAddToggle, isUserLoggedIn, setIsUserLoggedIn, user, month, setMonth, year, setYear } = useContext(AppContext)

    const router = useRouter();

    const handleClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsUserLoggedIn(false);
        router.push("/login")
    }

    const handleSelectMChange = (e) => {
        setMonth(e.target.value)
    }

    const handleSelectYChange = (e) => {
        setYear(e.target.value)
    }

    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August']

    return (
        <>
            <div className="flex justify-center sm:py-8 pb-5 sticky sm:-top-8 top-0 z-50">
                <nav className="shadow-md shadow-gray-400 sm:w-fit w-screen rounded-xl max-sm:rounded-lg max-sm:shadow-sm bg-gradient-to-r from-emerald-400 to-green-200">
                    <div className="flex sm:px-12 py-4 px-8 items-center">
                        <Link href={user ? "/" : "/login"} className="sm:me-16 max-sm:flex-1 text-xl hover:shadow-sm">Budgetify</Link>
                        {isUserLoggedIn ?
                            <>
                                <ul className="max-sm:hidden flex gap-6  items-center">
                                    <li
                                        onClick={() => setAddToggle(!addToggle)}
                                        className="hover:cursor-pointer hover:scale-110 duration-150"
                                    ><span>Create Budget</span>
                                    </li>
                                    <select onChange={handleSelectMChange} value={month} className=" bg-transparent p-2 hover:cursor-pointer border-b border-black">
                                        <option value={1}>January</option>
                                        <option value={2}>February</option>
                                        <option value={3}>March</option>
                                        <option value={4}>April</option>
                                        <option value={5}>May</option>
                                        <option value={6}>June</option>
                                        <option value={7}>July</option>
                                        <option value={8}>August</option>
                                        <option value={9}>September</option>
                                        <option value={10}>October</option>
                                        <option value={11}>November</option>
                                        <option value={12}>December</option>
                                    </select>
                                    <select onChange={handleSelectYChange} value={year} className=" bg-transparent p-2 hover:cursor-pointer border-b border-black">
                                        <option value={2024}>2024</option>
                                    </select>
                                    <button
                                        type="button"
                                        className="relative rounded px-4 py-2 overflow-hidden group bg-gray-900 hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 text-white hover:ring-1 hover:ring-gray-800 transition-all ease-out duration-300"
                                        onClick={handleClick}
                                    >
                                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                        <span className="relative">Log Out</span>
                                    </button>

                                </ul>
                                <button
                                    type="button"
                                    className="sm:hidden relative rounded px-5 py-2.5 overflow-hidden group bg-gray-900 hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 text-white hover:ring-1 hover:ring-gray-800 transition-all ease-out duration-300"
                                    onClick={handleClick}
                                >
                                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                    <span className="relative">Log Out</span>
                                </button>

                            </>
                            :
                            <ul className="flex gap-3  items-center">
                                <Link
                                    href={"/login"}
                                    className="relative rounded px-4 py-2 overflow-hidden group bg-gray-900 hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 text-white hover:ring-1 hover:ring-gray-800 transition-all ease-out duration-300"
                                >
                                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                    <span className="relative">Sign In</span>
                                </Link>
                                <Link
                                    href={"/signup"}
                                    className="relative rounded px-4 py-2 overflow-hidden group bg-gray-900 hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 text-white hover:ring-1 hover:ring-gray-800 transition-all ease-out duration-300"
                                >
                                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                    <span className="relative">Sign Up</span>
                                </Link>
                            </ul>
                        }
                    </div>
                </nav>
            </div>
            {isUserLoggedIn&&<div className="sm:hidden flex justify-center py-6 px-2 fixed bottom-0 z-50 shadow-md shadow-gray-400 w-screen bg-gradient-to-r from-emerald-400 to-green-200">
                <div className=" flex gap-5 items-center">

                    <select onChange={handleSelectMChange} value={month} className=" bg-transparent p-2 hover:cursor-pointer border-b border-black">
                        <option value={1}>Jan</option>
                        <option value={2}>Feb</option>
                        <option value={3}>Mar</option>
                        <option value={4}>Apr</option>
                        <option value={5}>May</option>
                        <option value={6}>Jun</option>
                        <option value={7}>Jul</option>
                        <option value={8}>Aug</option>
                        <option value={9}>Sep</option>
                        <option value={10}>Oct</option>
                        <option value={11}>Nov</option>
                        <option value={12}>Dec</option>
                    </select>
                    <select onChange={handleSelectYChange} value={year} className=" bg-transparent p-2 hover:cursor-pointer border-b border-black">
                        <option value={2024}>2024</option>
                    </select>

                    <button
                        type="button"
                        className="sm:hidden relative rounded px-3 py-2 overflow-hidden group bg-gray-900 hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 text-white hover:ring-1 hover:ring-gray-800 transition-all ease-out duration-300"
                        onClick={() => setAddToggle(!addToggle)}
                    >
                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                        <span className="relative">Create Budget</span>
                    </button>
                </div>
            </div>}
        </>
    )
}

export default Navbar;
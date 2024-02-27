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
        <div className="flex justify-center py-8 sticky -top-8 z-50">
            <nav className="shadow-md shadow-gray-400 w-fit rounded-2xl bg-gradient-to-r from-emerald-400 to-green-200">
                <div className="flex px-12 py-4 items-center">
                    <Link href={user ? "/" : "/login"} className=" me-16 text-lg hover:shadow-sm">Budgetify</Link>
                    {isUserLoggedIn ?
                        <ul className="flex gap-6  items-center">
                            <li
                                onClick={() => setAddToggle(!addToggle)}
                                className="hover:cursor-pointer hover:scale-110 duration-150"
                            >Create Budget
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
    )
}

export default Navbar;
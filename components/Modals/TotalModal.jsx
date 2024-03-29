"use client"

import { AppContext } from "@/context/AppContext/page";
import ShowToast from "@/helper/page";
import { useContext, useEffect, useState } from "react";

const TotalModal = (props) => {
    const { totalToggle, setTotalToggle} = props;
    const { user, month, year, setCount, isAdding,setIsAdding } = useContext(AppContext)

    const [description, setDescription] = useState('')
    const [operation, setOperation] = useState('Credited')
    const [amount, setAmount] = useState('')

    const handleSelectChange = (e) => {
        setOperation(e.target.value)
    }

    const handleClick = async () => {
        setIsAdding(true);
        try {
            const res = await fetch('/api/updation', {
                method: 'POST',
                body: JSON.stringify({
                    creator: user,
                    description: description,
                    operation: operation,
                    maximum: amount,
                    month: month,
                    year: year
                })
            })

            if (res.ok) {
                // console.log('Updation added')

                const res1 = await fetch(`/api/totalexpense?user=${user}&month=${month}&year=${year}`)

                if (res1.ok) {
                    const response = await res1.json();
                    let updateMaxi=0;
                    if(operation === 'Credited'){
                        updateMaxi = response.maximum + +amount
                    }
                    else{
                        updateMaxi = response.maximum - amount
                    }
                    try {
                        const res2 = await fetch('/api/totalexpense', {
                            method: 'PATCH',
                            body: JSON.stringify({
                                creator:response.creator,
                                amount: response.amount,
                                maximum: updateMaxi,
                                month: response.month,
                                year: response.year
                            })
                        })
                        if(res2.ok){
                            setCount((count)=>count+1)
                            // console.log('Total expense limit updated')
                        }
                    } catch (error) {
                        // console.log(error)
                    }
                }
            }
            ShowToast(true, 'Maximum Limit updated!')
        } catch (error) {
            ShowToast(false, 'Cannot update your limit!')
            // console.log('Cannot add updation')
        }
        setDescription('')
        setAmount('')
        setTotalToggle((totalToggle) => !totalToggle)
        setIsAdding(false)
    }




    return (
        <div>
            {/* <!-- Main modal --> */}
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={`${!totalToggle && "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow light:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t light:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 light:text-white">
                                Adjust your maximum limit
                            </h3>
                            <button onClick={() => {
                                setDescription('')
                                setAmount('')
                                setTotalToggle((totalToggle) => !totalToggle)
                                }} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center light:hover:bg-gray-600 light:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-4 md:p-5">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="description" className="block mb-2 text-md font-medium text-gray-900 light:text-white">Description</label>
                                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-600 light:border-gray-500 light:placeholder-gray-400 light:text-white" required />
                                </div>
                                <div className="">
                                    <select onChange={handleSelectChange} className="mb-4 w-full bg-transparent p-2 hover:cursor-pointer border-b border-black">
                                        <option value={"Credited"}>Credit</option>
                                        <option value={"Debited"}>Debit</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="number" className="block mb-2 text-md font-medium text-gray-900 light:text-white">Amount</label>
                                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" name="number" id="number" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-600 light:border-gray-500 light:placeholder-gray-400 light:text-white" required />
                                </div>

                                <div className="flex justify-center pt-2 pb-1">
                                    <button disabled={isAdding} type='button' onClick={handleClick} className="relative px-5 py-3  overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group" >
                                        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                                        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                                        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                                        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Update</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TotalModal

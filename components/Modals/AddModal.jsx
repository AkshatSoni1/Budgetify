"use client"
import { AppContext } from '@/context/AppContext/page'
import { useContext, useState } from 'react'

const AddModal = () => {
    const { addToggle, setAddToggle, user, setCount } = useContext(AppContext);
    const [bName, setBName] = useState('')
    const [amount, setAmount] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const date = new Date();
            const month = date.getMonth()+1;
            const year = date.getFullYear();
            const res = await fetch('/api/budget',{
                method:"POST",
                body: JSON.stringify({
                    creator: user,
                    name: bName,
                    amount: 0,
                    month: month,
                    year: year
                })
            });

            setBName('')
            if(res.ok){
                setAddToggle((addToggle) => !addToggle)
                setCount((count)=>count+1)
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>

            {/* <!-- Main modal --> */}
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={`${!addToggle && "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow light:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t light:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 light:text-white">
                                Add a budget
                            </h3>
                            <button onClick={() => setAddToggle((addToggle) => !addToggle)} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center light:hover:bg-gray-600 light:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-4 md:p-5">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-md text-gray-900 light:text-white font-light">Specify the name of the budget</label>
                                    <input 
                                    value={bName}
                                    onChange={(e)=>{setBName(e.target.value)}}
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-600 light:border-gray-500 light:placeholder-gray-400 light:text-white" 
                                    required
                                    />
                                </div>
                                <div className="flex justify-center pt-2 pb-1">

                                    {/* <button type='submit' onClick={() => setAddToggle((addToggle) => !addToggle)} className="relative px-5 py-3  overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"> */}
                                    <button type='submit' className="relative px-5 py-3  overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
                                        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                                        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                                        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                                        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Add Budget</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddModal

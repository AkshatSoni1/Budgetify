"use client"

import { useContext, useState } from "react";
import ViewModalBody from "../ModalBodies/ViewModalBody";
import { AppContext } from "@/context/AppContext/page";
import ShowToast from "@/helper/page";

const ViewModal = (props) => {
    const { budgetID, budgetName, viewToggle, setViewToggle, setCount, setExpCount, user, month, year, currentMonth, currentYear,totalAmntForABudgetCard,setTotalAmntForABudgetCard } = useContext(AppContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { viewId,expensesList } = props;

    let responseAmount = 0;
    const handleDelete = async () => {
        setIsSubmitting(true)
        try {
            const res = await fetch(`/api/budget/${budgetID}`);
            if(res.ok){
                const response = await res.json();
                responseAmount = response.amount
            }
        } catch (error) {
            console.log(error)
        }
        try {
            const res = await fetch(`/api/budget/${budgetID}`, {
                method: "DELETE"
            })

            if (res.ok) {
                // setExpensesList([])
                // console.log("Budget deleted!")
                try {
                    const res2 = await fetch(`/api/totalexpense?user=${user}&month=${month}&year=${year}`);
                    if (res2.ok) {
                        const response = await res2.json();
                        console.log(response, "RES")
                        console.log(responseAmount, 'TAFBC')
                        try {
                            const res3 = await fetch('/api/totalexpense', {
                                method: 'PATCH',
                                body: JSON.stringify({
                                    creator:response.creator,
                                    amount: response.amount - responseAmount,
                                    maximum: response.maximum,
                                    month: response.month,
                                    year: response.year
                                })
                            })
                            if(res3.ok){
                                // console.log('Total expense limit updated')
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                } catch (error) {
                    console.log(error)
                }

                try {
                    const res1 = await fetch('/api/expense',{
                        method:'DELETE',
                        body: JSON.stringify({
                            budgetId:budgetID
                        })
                    })
        
                    if(res1.ok){
                        // console.log("All expenses deleted!")
                    }
                } catch (error) {
                    console.log(error)
                }

            }
            ShowToast(true, 'Budget deleted!')
        } catch (error) {
            ShowToast(false, 'Cannot delete budget!')
            console.log(error)
        }
        setIsSubmitting(false)
        setCount((count) => count + 1)
        setViewToggle((viewToggle) => !viewToggle)
        
    }
    return (
        <div>
            {/* <!-- Main modal --> */}
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={`${!viewToggle && "hidden"} ${(budgetID!==viewId) && "hidden"} fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow light:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-baseline justify-between p-4 md:p-5 border-b rounded-t light:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 light:text-white vmtext">
                                Expense - {budgetName}
                            </h3>

                            <button onClick={handleDelete} className={`relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-red-400 rounded-lg group bg-gradient-to-br from-red-600 to-red-400 group-hover:from-red-600 group-hover:to-red-500 hover:text-white light:text-white focus:ring-2 focus:outline-none focus:ring-red-200 light:focus:ring-blue-800 ${isSubmitting&&"cursor-not-allowed"}`}>
                                <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white light:bg-gray-900 rounded-md group-hover:bg-opacity-0 font-bold">
                                    Delete
                                </span>
                            </button>

                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-4 md:p-5">
                            <div className="space-y-4 overflow-y-auto overflow-x-hidden max-h-[60vh]">
                                {/* Expenses list */}
                                {
                                    expensesList.map((exp) => (
                                        <ViewModalBody
                                            key={exp._id}
                                            expId={exp._id}
                                            budgetID={budgetID}
                                            name={exp.name}
                                            amount={exp.amount}
                                            setExpCount={setExpCount}
                                            setCount={setCount}
                                            user={user}
                                            month={month}
                                            year={year}
                                            currentMonth={currentMonth}
                                            currentYear={currentYear}
                                        />
                                    ))
                                }


                                <div className="flex justify-center pt-2 pb-1">
                                    <button type='button' onClick={() => {
                                        // setExpensesList([])
                                        setExpCount(0)
                                        setViewToggle((viewToggle) => !viewToggle)
                                    }} className="relative px-5 py-3  overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group" >
                                        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                                        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                                        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                                        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Close</span>
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

export default ViewModal

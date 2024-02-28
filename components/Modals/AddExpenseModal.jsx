"use client"
import { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext/page";

const AddExpenseModal = () => {
  const { addExpenseToggle, setAddExpenseToggle, budgetName, budgetID, setCount, user, month, year } = useContext(AppContext);

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const res = await fetch('/api/expense',{
        method:'POST',
        body: JSON.stringify({
          budgetId : budgetID,
          name : description,
          amount : amount
        })
      })
      
      setDescription('')
      setAmount('')

      if(res.ok){

        try {
          const res1 = await fetch(`/api/budget/${budgetID}`);

          if(res1.ok){
            const response = await res1.json();
            // console.log("RES", response)

            try {
              // console.log("SB",response)
              const res2 = await fetch(`/api/budget/${budgetID}`,{
                method:'PATCH',
                body: JSON.stringify({
                  creator: response.creator,
                  name: response.name,
                  amount: response.amount + + amount,
                  month: response.month,
                  year: response.year,
                })
              })
    
              if(res2.ok){
                console.log("Updated")
              }
            } catch (error) {
              console.log(error)
            }
          }

          const res3 = await fetch(`/api/totalexpense?user=${user}&month=${month}&year=${year}`);

          if (res3.ok) {
            const response = await res3.json();
            try {
                const res4 = await fetch('/api/totalexpense', {
                    method: 'PATCH',
                    body: JSON.stringify({
                        creator:response.creator,
                        amount: response.amount + +amount,
                        maximum: response.maximum,
                        month: response.month,
                        year: response.year
                    })
                })
                if(res4.ok){
                    console.log('Total expense limit updated')
                }
            } catch (error) {
                console.log(error)
            }
        }
        } catch (error) {
          console.log(error)
        }
        setCount((count)=>count+1)
        console.log('Expense added!')
      }
    } 
    catch (error) {
      console.log(error)      
    }
    finally{
      setAddExpenseToggle((addExpenseToggle) => !addExpenseToggle)
    }
  }
  return (
    <div>
      {/* <!-- Main modal --> */}
      <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={`${!addExpenseToggle && "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow light:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t light:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 light:text-white vmtext">
                Add Expense - {budgetName}
              </h3>
              <button onClick={() => setAddExpenseToggle((addExpenseToggle) => !addExpenseToggle)} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center light:hover:bg-gray-600 light:hover:text-white" data-modal-hide="authentication-modal">
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
                  <label htmlFor="description" className="block mb-2 text-md font-medium text-gray-900 light:text-white">Description</label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    name="description"
                    id="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-600 light:border-gray-500 light:placeholder-gray-400 light:text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="number" className="block mb-2 text-md font-medium text-gray-900 light:text-white">Amount</label>
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    name="number"
                    id="number"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-600 light:border-gray-500 light:placeholder-gray-400 light:text-white"
                    required
                  />
                </div>
                <div className="flex justify-center pt-2 pb-1">
                  <button type='submit' className="relative px-5 py-3  overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group" >
                    <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                    <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                    <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                    <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                    <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                    <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Add</span>
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

export default AddExpenseModal

"use client"
import { useEffect, useState } from "react";
import { currencyFormatter } from "@/utils/currencyFormat"
import ViewModal from "./Modals/ViewModal";
import AddExpenseModal from "./Modals/AddExpenseModal";

const BudgetCard = (props) => {
  const { id, setAddExpenseToggle, name, amount, setViewToggle, setBudgetID, setBudgetName, expCount } = props;
  
  const [expensesList, setExpensesList] = useState([])

  const handleAddExpenseClick = () => {
    setBudgetName(name)
    setBudgetID(id)
    setAddExpenseToggle((addExpenseToggle) => !addExpenseToggle)
  }

  const fetchExpenses = async() => {
    try {
      const res = await fetch(`/api/expense?budgetId=${id}`)
      if(res.ok){
        const response = await res.json();
        setExpensesList(response);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [expCount])
  

  const handleViewClick = async () => {
    setBudgetName(name)
    setBudgetID(id)

    fetchExpenses()

    setViewToggle((viewToggle) => !viewToggle)
  }

  return (
    <>
      <ViewModal viewId={id} expensesList={expensesList}/>
      <AddExpenseModal />
      <div className={`  px-6 py-4 m-4 rounded-md bg-stone-200 border-gray-800 border-2 shadow-sm `}>
        <div className="flex justify-between py-2">
          <h1>{name}</h1>
          <h1 className="ps-12"><span className="font-semibold">{currencyFormatter.format(amount)}</span></h1>
        </div>
        <div className="flex gap-4 py-2">
          <button
            onClick={handleAddExpenseClick}
            className="relative rounded px-4 py-2 overflow-hidden group bg-gray-900 hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 text-white hover:ring-2 hover:ring-offset-1 hover:ring-gray-800 transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Add Expense</span>
          </button>
          <button
            onClick={handleViewClick}
            className="relative rounded px-4 py-2 overflow-hidden group bg-gray-900 hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 text-white hover:ring-2 hover:ring-offset-1 hover:ring-gray-800 transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">View Expense</span>
          </button>

        </div>
      </div>
    </>
  )
}

export default BudgetCard

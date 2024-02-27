"use client"

import BudgetCard from "@/components/BudgetCard";
import AddModal from "@/components/Modals/AddModal";
import TotalModal from "@/components/Modals/TotalModal";
import TotalViewModal from "@/components/Modals/TotalViewModal";
import TotalCard from "@/components/TotalCard";
import { AppContext } from "@/context/AppContext/page";
import { useContext, useState, useEffect } from "react";

const BudgetFeed = ({ data }) => {
  const { setAddExpenseToggle, setViewToggle, viewToggle, setBudgetID,setBudgetName } = useContext(AppContext)
  return (
    data.map((budget) => (
      <BudgetCard
        key={budget._id}
        id={budget._id}
        setAddExpenseToggle={setAddExpenseToggle}
        name={budget.name}
        amount={budget.amount}
        viewToggle={viewToggle}
        setViewToggle={setViewToggle}
        setBudgetID={setBudgetID}
        setBudgetName={setBudgetName}
      />
    ))
  )
}


const Home = () => {
  const { totalToggle, setTotalToggle, TViewToggle, setTViewToggle, user, count, month, year } = useContext(AppContext)
  const [allBudget, setAllBudget] = useState([])

  const fetchBudgets = async () => {
    const res = await fetch(`/api/budget?user=${user}&month=${month}&year=${year}`)

    if (res.ok) {
      const response = await res.json()
      setAllBudget(response)
    }
  }
  useEffect(() => {
    fetchBudgets()
  }, [user, count, month, year])

  // console.log(user)
  return (
    <>
      <div className={`flex items-center justify-center flex-col min-h-[70%] `}>
        {/* <div className={`flex items-center justify-center flex-col min-h-[70%] ${(addToggle) && "blur-sm"}`}> */}
        <AddModal />


        <div className="" >
          <TotalModal totalToggle={totalToggle} setTotalToggle={setTotalToggle} />
          <TotalViewModal TViewToggle={TViewToggle} setTViewToggle={setTViewToggle} />
          <TotalCard name={"[Jan] - Total Expenses"} amount={10000} max={10000} setTotalToggle={setTotalToggle} setTViewToggle={setTViewToggle} />
        </div>
        <div className="flex flex-wrap sm:max-w-[60%] lg:max-w-[70%] justify-center">
          {/* //map */}
          <BudgetFeed data={allBudget} />
        </div>

      </div>
    </>
  )
}

export default Home;
"use client"

import BudgetCard from "@/components/BudgetCard";
import AddModal from "@/components/Modals/AddModal";
import TotalModal from "@/components/Modals/TotalModal";
import TotalViewModal from "@/components/Modals/TotalViewModal";
import TotalCard from "@/components/TotalCard";
import { AppContext } from "@/context/AppContext/page";
import { useContext, useState, useEffect } from "react";

const BudgetFeed = ({ data }) => {
  const { setAddExpenseToggle, setViewToggle, setBudgetID, setBudgetName, expCount } = useContext(AppContext)
  return (
    data.map((budget) => (
      <BudgetCard
        key={budget._id}
        id={budget._id}
        setAddExpenseToggle={setAddExpenseToggle}
        name={budget.name}
        amount={budget.amount}
        setViewToggle={setViewToggle}
        setBudgetID={setBudgetID}
        setBudgetName={setBudgetName}
        expCount={expCount}
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
    if(user == null) return;
    fetchBudgets()
  }, [user, count, month, year])

  const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const createTotalExpenseIfNotPresent = async () => {
    try {
      const res = await fetch(`/api/totalexpense?user=${user}&month=${month}&year=${year}`);
      if (res.ok) {
        const response = await res.json();
        if(response == null){
          try {
            const res1 = await fetch('/api/totalexpense', {
              method: 'POST',
              body: JSON.stringify({
                creator: user,
                maximum: 0,
                month: month,
                year: year
              })
            })

            if (res1.ok) {
              console.log('Total expense for ', month, ' ', year, ' created')
            }
          } catch (error) {
            console.log(error)
          }
        }
        else{
          console.log('Already exists')
        }
        }
    } catch (error) {
      console.log(error)
    }
  }

  const date = new Date()
  const currentMonth = date.getMonth()+1
  const currentYear = date.getFullYear()
  useEffect(() => {
    if(user == null) return;
    if( month === currentMonth && year === currentYear){
      createTotalExpenseIfNotPresent();
    }
  }, [user,month,year])

  return (
    <>
      <div className={`flex items-center justify-center flex-col min-h-[70%] `}>
        {/* <div className={`flex items-center justify-center flex-col min-h-[70%] ${(addToggle) && "blur-sm"}`}> */}
        <AddModal />


        <div className="" >
          <TotalModal totalToggle={totalToggle} setTotalToggle={setTotalToggle} />
          
          <TotalCard name={`${monthList[month - 1]} - Total Expenses`} amount={0} max={0} setTotalToggle={setTotalToggle} setTViewToggle={setTViewToggle} />
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
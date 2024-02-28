"use client"

import BudgetCard from "@/components/BudgetCard";
import AddModal from "@/components/Modals/AddModal";
import TotalModal from "@/components/Modals/TotalModal";
import TotalCard from "@/components/TotalCard";
import { AppContext } from "@/context/AppContext/page";
import { currencyFormatter } from "@/utils/currencyFormat";
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
  const { totalToggle, setTotalToggle, isUserLoggedIn, setTViewToggle, user, count, month, year, setCount, setMaximum,setTotalAmount, addToggle } = useContext(AppContext)
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
                amount:0,
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
  const fetchTotalExpense = async()=>{
      try {
        const res = await fetch(`/api/totalexpense?user=${user}&month=${month}&year=${year}`);
        if(res.ok){
          let response = await res.json();
          if(response==null){ 
            console.log(response)
            setTotalAmount(0)
          setMaximum(0)
          }
          else{
            console.log(response)
            setTotalAmount(response.amount)
            setMaximum(response.maximum)
          }
        }
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(() => {
    if(user == null) return;
    fetchTotalExpense()
  }, [user,count,month,year])

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
      <div className={`flex items-center justify-center flex-col pb-24 ${isUserLoggedIn ? "min-h-[70%]" : "min-h-[80vh]"}`}>
        {/* <div className={`flex items-center justify-center flex-col min-h-[70%] ${(addToggle) && "blur-sm"}`}> */}
        {isUserLoggedIn ?
        <>
        <AddModal />

        <div className="" >
          <TotalModal totalToggle={totalToggle} setTotalToggle={setTotalToggle} setCount={setCount}/>          
          <TotalCard name={`${monthList[month - 1]}`} setTotalToggle={setTotalToggle} setTViewToggle={setTViewToggle} />
        </div>
        <div className="flex flex-wrap sm:max-w-[60%] lg:max-w-[70%] justify-center">
          {/* //map */}
          <BudgetFeed data={allBudget} />
        </div>
        </>
      :  
      <h1 className="animated-text md:text-3xl text-2xl p-5 text-center">Manage your expenses by Sign Up / Sign In</h1>
      }

      </div>
    </>
  )
}

export default Home;
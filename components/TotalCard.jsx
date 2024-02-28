'use client'
import { currencyFormatter } from "@/utils/currencyFormat"
import ProgressBar from "./ProgressBar";
import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext/page";
import TotalViewModal from "./Modals/TotalViewModal";

const TotalCard = (props) => {
  const { name, setTotalToggle, setTViewToggle } = props;
  const { user, month, year, TViewToggle,totalAmount, maximum} = useContext(AppContext)
  const [updationList, setUpdationList] = useState([])

  const amount = totalAmount | 0
  const max = maximum | 0

  const getProgressBarVarient = (amount, max) => {
    const ratio = amount / max;
    if (ratio < 0.5) return "primary"
    if (ratio < 0.75) return "warning"
    return "danger"
  }
  let percentage = ((amount / max)*100)
  
  if(isNaN(percentage)){
    percentage=0
  }

const fetchUpdations = async() => {
  try {
    const res = await fetch(`/api/updation?user=${user}&month=${month}&year=${year}`)
    if(res.ok){
      const response = await res.json();
      setUpdationList(response)
    }
  } catch (error) {
    console.log(error)
  }
}

const handleViewUpdation = async() => {
  fetchUpdations()
  setTViewToggle((TViewToggle)=>!TViewToggle)
}
  return (
    <>
    <TotalViewModal updationList={updationList} TViewToggle={TViewToggle} setTViewToggle={setTViewToggle} />
    <div className={`border  px-6 py-4 m-4 rounded-md ${percentage >= 75 ? "bg-red-200 border-red-400" : percentage<50 ? "bg-blue-200 border-blue-400" :"bg-yellow-200 border-yellow-400"} shadow-md shadow-gray-400 z-40`}>
      <div className="flex justify-between py-2">
        <h1 className="text-lg">{name}</h1>
        <h1 className="ps-12"><span className="font-semibold">{currencyFormatter.format(amount)}</span> / <span className=" text-sm text-gray-600 font-semibold">{currencyFormatter.format(max | 0)}</span></h1>
      </div>
      <div className="pt-2 pb-3">
        <ProgressBar
          percentage={percentage}
          min = {0}
          max={100}
          varient={getProgressBarVarient(amount, max)}
        />
      </div>
      <div className="flex gap-4 py-2 justify-center">
        <button
          onClick={()=>setTotalToggle((totalToggle)=>!totalToggle)} 
          className="relative rounded px-4 py-2 overflow-hidden group bg-gray-900 hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 text-white hover:ring-2 hover:ring-offset-1 hover:ring-gray-800 transition-all ease-out duration-300"
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">Update Limit</span>
        </button>
        <button
        onClick={handleViewUpdation} 
          className="relative rounded px-4 py-2 overflow-hidden group bg-gray-900 hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 text-white hover:ring-2 hover:ring-offset-1 hover:ring-gray-800 transition-all ease-out duration-300"
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">View Updations</span>
        </button>
{/* change according to month */}
      </div>
    </div>
    </>
  )
}

export default TotalCard

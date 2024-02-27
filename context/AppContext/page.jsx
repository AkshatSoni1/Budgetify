"use client"

import { createContext, useState, useEffect } from "react"

export const AppContext = createContext();

const AppState = (props) => {
  // modal's toggling
    const [addToggle, setAddToggle] = useState(false)
    const [addExpenseToggle, setAddExpenseToggle] = useState(false)
    const [totalToggle, setTotalToggle] = useState(false)
    const [viewToggle, setViewToggle] = useState(false)
    const [TViewToggle, setTViewToggle] = useState(false)

    const date = new Date()
    const mth = date.getMonth()+1;
    const [month, setMonth] = useState(mth)

    // year can be implemented
    const yr = date.getFullYear();
    const [year, setYear] = useState(yr);
    // user
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [count, setCount] = useState(0)
    const [mode, setMode] = useState('light')

    // budget
    const [budgetID, setBudgetID] = useState(null)
    const [budgetName, setBudgetName] = useState('')

    const checkIsLoggedIn = () => {
      let token = localStorage.getItem('token');
      if(token){
        setIsUserLoggedIn(true);
        let user = localStorage.getItem('user')
        setUser(user);
      }
      else{
        setIsUserLoggedIn(false);
        setUser(null)
      }
    }

    useEffect(() => {
      checkIsLoggedIn();
    }, []);
    
  return (
    <AppContext.Provider value={{
        addToggle,
        setAddToggle,
        addExpenseToggle,
        setAddExpenseToggle,
        viewToggle,
        setViewToggle,
        totalToggle,
        setTotalToggle,
        TViewToggle,
        setTViewToggle,
        user,
        setUser,
        isUserLoggedIn,
        setIsUserLoggedIn,
        count,
        setCount,
        month,
        setMonth,
        year,
        setYear,
        budgetID,
        setBudgetID,
        budgetName,
        setBudgetName,
        mode,
        setMode
    }}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppState

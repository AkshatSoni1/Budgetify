import { currencyFormatter } from "@/utils/currencyFormat";

const ViewModalBody = (props) => {
    const { expId, budgetID, name, amount, setExpCount, setCount, user,month,year } = props;

    const handleDelete = async() =>{
        try {
            const res = await fetch(`/api/expense/${expId}`,{
                method:'DELETE'
            })

            if(res.ok){
                try {
                    const res1 = await fetch(`/api/budget/${budgetID}`);
          
                    if(res1.ok){
                      const response = await res1.json();
                    //   console.log("RES", response)
          
                      try {
                        // console.log("SB",response)
                        const res2 = await fetch(`/api/budget/${budgetID}`,{
                          method:'PATCH',
                          body: JSON.stringify({
                            creator: response.creator,
                            name: response.name,
                            amount: response.amount - amount,
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

                      const res3 = await fetch(`/api/totalexpense?user=${user}&month=${month}&year=${year}`);

                      if (res3.ok) {
                        const response = await res3.json();
                        try {
                            const res4 = await fetch('/api/totalexpense', {
                                method: 'PATCH',
                                body: JSON.stringify({
                                    creator:response.creator,
                                    amount: response.amount - amount,
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
                    }
                  } catch (error) {
                    console.log(error)
                  }
                console.log("Expense deleted!")
                setExpCount((count)=> count+1)
                setCount((count)=> count+1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex items-center py-2">
            <div className="flex justify-between items-center w-full">
                <h1 className="vmtext">{name}</h1>
                {/* [ ] */}
                <h1 className='bg-green-200 px-2 py-1 rounded-md mx-4 shadow-sm'>{currencyFormatter.format(amount)}</h1>
            </div>
            {/* [ ] */}
            {/* onclick dekh */}
            <button onClick={handleDelete} type="button" className="shadow-sm border border-red-600 end-2.5 text-red-400 bg-transparent hover:bg-red-600 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center light:hover:bg-gray-600 light:hover:text-white hover:shadow-sm">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Delete Expense</span>
            </button>
        </div>
    )
}

export default ViewModalBody

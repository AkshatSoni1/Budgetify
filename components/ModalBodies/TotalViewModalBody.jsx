import { currencyFormatter } from "@/utils/currencyFormat";
const TotalViewModalBody = (props) => {
    const {description, operation, amount} = props;
    return (

        <div className="py-2">
            {/* Expenses list */}
            <div className="flex items-center">
                <h1 className="vmtext flex-1 ">{description}</h1>
                <h1 className={`border-b font-semibold ${operation === "Credited" ? "text-green-500" : "text-red-500"} mx-4`}>{operation}</h1>
                <h1 className="bg-yellow-200 px-2 py-1 rounded-md shadow-sm">{currencyFormatter.format(amount)}</h1>
            </div>

        </div>

    )
}

export default TotalViewModalBody

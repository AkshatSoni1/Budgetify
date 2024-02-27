import Expense from "@/models/expense";
import connectToDB from "@/utils/connectDB";

export const DELETE = async(req, {params}) => {
    try {
        await connectToDB();

        await Expense.findByIdAndDelete(params.id)

        return new Response("Expense deleted!", {status:200})

    } catch (error) {
        return new Response("Cannot delete expense!", {status:500})
    }
}
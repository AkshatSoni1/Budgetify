import Expense from "@/models/expense";
import connectToDB from "@/utils/connectDB";

export const POST = async (req) => {
    const { budgetId, name, amount } = await req.json();

    try {
        await connectToDB();

        const expense = new Expense({
            budgetId,
            name,
            amount
        })

        await expense.save();

        return new Response("Expense added successfully!", { status:200 })
    } catch (error) {
        return new Response("Cannot add expense!", { status:500 })
    }
}

export const GET = async (req) => {
    try {

        await connectToDB();

        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);
        const budgetId = searchParams.get("budgetId");

        const expenseList = await Expense.find({ budgetId:budgetId })

        return new Response(JSON.stringify(expenseList), { status:200 })

    } catch (error) {
        return new Response("Cannot fetch expenses!", { status:500 })
    }
}

export const DELETE = async(req) => {
    const { budgetId } = await req.json();

    try {
        await connectToDB();

        await Expense.findOneAndDelete({ budgetId:budgetId })

        return new Response("All expenses deleted!", { status:200 })
    } catch (error) {
        return new Response("Cannot delete expenses!", {status:500})
    }
}
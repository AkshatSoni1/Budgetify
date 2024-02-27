import Budget from "@/models/budget";
import connectToDB from "@/utils/connectDB"

export const POST = async (req) => {
    const { creator, name, amount, month, year } = await req.json()

    try {
        await connectToDB();

        const budget = new Budget({
            creator,
            name,
            amount,
            month,
            year
        })

        await budget.save();

        return new Response("Budget successfully created", { status: 200 })

    } catch (error) {
        return new Response("Budget cannot be created", { status: 500 })
    }
}

export const GET = async (req) => {
    try {
        await connectToDB();

        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);
        const user = searchParams.get("user");
        const mnth = searchParams.get("month");
        const yr = searchParams.get("year");
        const budgetList = await Budget.find({ creator:user, month:mnth, year:yr })

        return new Response(JSON.stringify(budgetList), {status:200})
    } 
    catch (error) {
        return new Response("Cannot fetch your data!", {status:500})
    }
}

import connectToDB from "@/utils/connectDB";
import Budget from "@/models/budget";

export const DELETE = async(req, {params}) => {
    try {
        await connectToDB();

        await Budget.findByIdAndDelete(params.id)

        return new Response("Budget Deleted", {status:200})

    } catch (error) {
        return new Response("Cannot Delete Budget", {status:400})
    }
}

export const PATCH = async(req, {params}) => {
    const {creator, name, amount, month, year} = await req.json();
    try {
        await connectToDB();

        const updatedBudget = await Budget.findByIdAndUpdate(params.id,{
            creator,
            name,
            amount,
            month,
            year
        })

        await updatedBudget.save();

        return new Response("Updated successfully",{status:200})
    } catch (error) {
        return new Response("Cannot update", {status:500})
    }
}

export const GET = async(req, {params}) => {
    try {
        await connectToDB();

        const singleBudget = await Budget.findOne({_id:params.id})

        return new Response(JSON.stringify(singleBudget), {status:200})
    } catch (error) {
        return new Response("Cannot fetch single Budget!", {status:500})
    }
}
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
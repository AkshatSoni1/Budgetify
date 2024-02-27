import TotalExpense from "@/models/totalexpense";
import connectToDB from "@/utils/connectDB";

export const POST = async(req)=> {
    const {creator,maximum, month, year} = await req.json();

    try {
        await connectToDB();

        const totexp = new TotalExpense({
            creator,
            maximum,
            month,
            year
        })

        await totexp.save();

        return new Response(JSON.stringify(totexp), {status:200})
    } catch (error) {
        return new Response("Cannot create total expense!", {status:500})
    }
}

export const GET = async(req) => {
    try {
        await connectToDB();

        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);
        const user = searchParams.get("user")
        const month = searchParams.get("month");
        const year = searchParams.get("year");

        const totexp = await TotalExpense.findOne({ creator:user,month:month, year:year })

        return new Response(JSON.stringify(totexp), {status:200})
    } catch (error) {
        return new Response("Cannot fetch total expense");
    }
}
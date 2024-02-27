import connectToDB from "@/utils/connectDB";
import UpdateLimit from "@/models/updations";

export const POST = async (res) => {
    const {creator,description, operation, maximum,month,year} = await res.json();

    try {
        await connectToDB();

        const newUpdate = new UpdateLimit({
            creator,
            description,
            operation,
            maximum,
            month,
            year
        })

        await newUpdate.save();

        return new Response("Updation added!", {status:200})
    } catch (error) {
        return new Response("Updation cannot be added!", {status:500})
    }
}

export const GET = async(res) => {
    try {
        await connectToDB();

        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);
        const user = searchParams.get("user");
        const month = searchParams.get("month");
        const year = searchParams.get("year");

        const updationList = await UpdateLimit.find({ creator:user, month:month, year: year })

        return new Response(JSON.stringify(updationList), {status:200})
    } catch (error) {
        return new Response("Cannot fetch updations!", {status:500})
    }
}